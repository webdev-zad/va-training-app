import { LogoutButton } from "@/components/logout-button"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  title: string
  userEmail: string
  userRole: string
}

export function DashboardHeader({ title, userEmail, userRole }: DashboardHeaderProps) {
  const roleColors = {
    admin: "bg-purple-100 text-purple-800 border-purple-200",
    va: "bg-blue-100 text-blue-800 border-blue-200",
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{userEmail}</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${roleColors[userRole as keyof typeof roleColors]}`}
                >
                  {userRole.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-gray-200 mx-2"></div>
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
