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

    const { name, email, password } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // try Prisma first (primary path)
    try {
      // check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // create new user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // don't return the password hash to the client
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _p, ...safeUser } = user as any;

      return NextResponse.json({ message: 'User created successfully', user: safeUser }, { status: 201 });
    } catch (prismaErr: any) {
      // If Prisma failed because the DB isn't reachable, fall back to Supabase REST (HTTPS)
      const prismaErrMsg = String(prismaErr?.message || prismaErr);
      const isConnectionError = prismaErrMsg.includes("Can't reach database server") || prismaErrMsg.includes('P1001');

      if (!isConnectionError) {
        // Some other Prisma error (like unique constraint), return generic error
        console.error('Prisma error:', prismaErr);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }

      // REST fallback: insert into Supabase via REST API using service role key
      const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        return NextResponse.json({ error: 'Server misconfiguration: Supabase keys missing' }, { status: 500 });
      }

      // Safe debug: log masked service role key info (first/last 6 chars and length) so we can
      // confirm the server loaded the expected key without printing the secret.
      try {
        const k = String(SUPABASE_SERVICE_ROLE_KEY);
        const head = k.slice(0, 6);
        const tail = k.slice(-6);
        console.log(`Supabase service key loaded: head=${head} tail=${tail} len=${k.length}`);
      } catch (e) {
        console.log('Supabase service key present but could not be inspected');
      }

      try {
        // First check if user exists via REST
        const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            // use anon key for apikey header and service role key for Authorization
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            Accept: 'application/json',
          },
        });

        if (!checkRes.ok) {
          const t = await checkRes.text();
          console.error('Supabase check error:', checkRes.status, t);
          return NextResponse.json({ error: 'Supabase check failed' }, { status: 502 });
        }

        const existing = await checkRes.json();
        if (Array.isArray(existing) && existing.length > 0) {
          return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert via Supabase REST
        const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
          method: 'POST',
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: JSON.stringify({ name, email, password: hashedPassword }),
        });

        if (!insertRes.ok) {
          const txt = await insertRes.text();
          console.error('Supabase insert failed:', insertRes.status, txt);
          return NextResponse.json({ error: 'Supabase insert failed', details: txt }, { status: 502 });
        }

        const [created] = await insertRes.json();
        // map created fields to safeUser shape
        const safeUser = { id: created.id ?? null, name: created.name, email: created.email, createdAt: created.created_at ?? new Date().toISOString() };
        return NextResponse.json({ message: 'User created successfully (Supabase REST)', user: safeUser }, { status: 201 });
      } catch (restErr) {
        console.error('Supabase REST fallback error:', restErr);
        return NextResponse.json({ error: 'Fallback to Supabase failed' }, { status: 502 });
      }
    }

    // don't return the password hash to the client
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _p, ...safeUser } = user as any;

    return NextResponse.json({ message: 'User created successfully', user: safeUser }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
