"use client";

import { unstable_ViewTransition as ViewTransition } from "react";
import { ReactNode } from "react";

interface ViewTransitionProps {
  children: ReactNode;
  name?: string;
  className?: string;
}

export function AppViewTransition({
  children,
  name,
  className,
}: ViewTransitionProps) {
  return (
    <ViewTransition name={name}>
      <div className={className}>{children}</div>
    </ViewTransition>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>;
}

export function NavItemTransition({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return <ViewTransition>{children}</ViewTransition>;
}

export function BrandTransition({ children }: { children: ReactNode }) {
  return <ViewTransition name="brand">{children}</ViewTransition>;
}

export function ListItemTransition({
  children,
  id,
}: {
  children: ReactNode;
  id: string | number;
}) {
  return <ViewTransition name={`item-${id}`}>{children}</ViewTransition>;
}

export default AppViewTransition;
