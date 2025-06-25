"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

export function ConditionalSidebar() {
  const { status } = useSession();
  const pathname = usePathname();

  // Don't show sidebar on auth pages or when not authenticated
  const isAuthPage = pathname?.startsWith("/auth");
  const isAuthenticated = status === "authenticated";

  if (isAuthPage || !isAuthenticated) {
    return null;
  }

  return <AppSidebar />;
}
