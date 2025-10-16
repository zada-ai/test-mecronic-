import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/lib/db';

export async function POST(req: Request) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json({ error: 'Invalid or empty JSON body' }, { status: 400 });
    }

    const { email, password } = body || {};
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Try Prisma first
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const { password: _p, ...safeUser } = user as any;
      return NextResponse.json({ message: 'Signed in', user: safeUser }, { status: 200 });
    } catch (prismaErr: any) {
      const prismaErrMsg = String(prismaErr?.message || prismaErr);
      const isConnectionError = prismaErrMsg.includes("Can't reach database server") || prismaErrMsg.includes('P1001');
      if (!isConnectionError) {
        console.error('Prisma signin error:', prismaErr);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }
      // Fall back to Supabase REST
      const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        return NextResponse.json({ error: 'Server misconfiguration: Supabase keys missing' }, { status: 500 });
      }

      try {
        const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            apikey: SUPABASE_ANON || SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            Accept: 'application/json',
          },
        });

        if (!checkRes.ok) {
          const t = await checkRes.text();
          console.error('Supabase signin check error:', checkRes.status, t);
          return NextResponse.json({ error: 'Supabase check failed' }, { status: 502 });
        }

        const rows = await checkRes.json();
        if (!Array.isArray(rows) || rows.length === 0) {
          return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const user = rows[0];
        const hashed = user.password;
        const match = await bcrypt.compare(password, hashed);
        if (!match) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        const safeUser = { id: user.id ?? null, name: user.name, email: user.email, createdAt: user.created_at ?? new Date().toISOString() };
        return NextResponse.json({ message: 'Signed in (Supabase REST)', user: safeUser }, { status: 200 });
      } catch (restErr) {
        console.error('Supabase REST signin error:', restErr);
        return NextResponse.json({ error: 'Fallback to Supabase failed' }, { status: 502 });
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
