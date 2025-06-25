import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, BookOpen, TrendingUp, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarInset } from "@/components/ui/sidebar";

export default async function AdminDashboard() {
  const session = (await getServerSession(authOptions)) as { user: { role: string } } | null;

  if (!session || session.user.role !== "admin") {
    redirect("/auth/login");
  }

  const stats = [
    {
      title: "Total Users",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Active VA trainees",
    },
    {
      title: "Active Sessions",
      value: "8",
      change: "+5%",
      trend: "up",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Currently training",
    },
    {
      title: "Training Scenarios",
      value: "156",
      change: "+23%",
      trend: "up",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Available scenarios",
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Average success rate",
    },
  ];

  const breadcrumbs = [{ label: "Admin", href: "/admin" }, { label: "Dashboard" }];

  return (
    <SidebarInset>
      <DashboardHeader title="Dashboard" breadcrumbs={breadcrumbs} />

      <div className="flex flex-1 flex-col gap-4 pt-0">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin</h2>
            <p className="text-gray-600">
              Here&apos;s what&apos;s happening with your VA training platform today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="card-hover border-0  bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <Card className="lg:col-span-1 border-0  bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                <CardDescription>Manage your platform efficiently</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New VA User
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create Scenario
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-2 border-0  bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                    <CardDescription>Latest platform updates and user actions</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      user: "Sarah Johnson",
                      action: "completed Advanced Customer Service scenario",
                      time: "2 minutes ago",
                      avatar: "SJ",
                    },
                    {
                      user: "Mike Chen",
                      action: "started Technical Support training",
                      time: "15 minutes ago",
                      avatar: "MC",
                    },
                    {
                      user: "Emma Davis",
                      action: "achieved 95% accuracy in Sales Call simulation",
                      time: "1 hour ago",
                      avatar: "ED",
                    },
                    {
                      user: "Alex Rodriguez",
                      action: "joined the platform",
                      time: "3 hours ago",
                      avatar: "AR",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {activity.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          <span className="font-semibold">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Features */}
          <Card className="mt-6 border-0  bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Advanced Analytics Dashboard</h3>
                  <p className="text-gray-600 text-sm">
                    Detailed performance metrics, progress tracking, and AI-powered insights coming in the
                    next milestone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
