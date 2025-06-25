"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/login" })
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </Button>
  )
}
