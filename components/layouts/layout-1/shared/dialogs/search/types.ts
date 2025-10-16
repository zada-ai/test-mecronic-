import { LucideIcon } from 'lucide-react';
import { Avatars } from '@/components/layouts/layout-1/shared/common/avatar-group';

export interface SearchDocsItem {
  image: string;
  desc: string;
  date: string;
}

export interface SearchSettingsItem {
  icon: LucideIcon;
  info: string;
}

export interface SearchSettingsGroup {
  title: string;
  children: SearchSettingsItem[];
}

export interface SearchIntegrationsIAvatar {
  filename?: string;
  fallback?: string;
  variant: string;
}

export interface SearchIntegrationsItem {
  logo: string;
  name: string;
  description: string;
  team: Avatars;
}

export interface SearchUsersItem {
  avatar: string;
  name: string;
  email: string;
  label: string;
  color:
    | 'success'
    | 'destructive'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'info'
    | null
    | undefined;
}
