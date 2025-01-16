import { Icons } from '@/components/icons';
export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isResource?: boolean;
  children?: NavItem[]
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface Cluster {
  endpoint: string
  token: string
}

export interface ServiceRaw {
  metadata:any 
  spec: any 
  status: any
}

export interface ResourceItems {
  metadata:any 
  spec: any 
  status: any
}

export interface Service {
  name: string 
  type: string
  namespace: string
  ports: string[]
  clusterIP: string 
}

export interface ResourceDetails {
  resource_type: string 
  namespace: string 
  resource_name: string
}


export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

