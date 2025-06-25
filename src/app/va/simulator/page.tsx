import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, BarChart3, Clock, Award, Headphones, MessageSquare, Phone, Star } from "lucide-react";
import { SidebarInset } from "@/components/ui/sidebar";

export default async function VASimulator() {
  const session = (await getServerSession(authOptions)) as { user: { role: string } } | null;

  if (!session || session.user.role !== "va") {
    redirect("/auth/login");
  }

  const scenarios = [
    {
      title: "Customer Service Excellence",
      description: "Handle customer complaints and inquiries with professionalism",
      difficulty: "Beginner",
      duration: "15 min",
      icon: Headphones,
      color: "bg-blue-50 text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Technical Support",
      description: "Troubleshoot technical issues and provide solutions",
      difficulty: "Intermediate",
      duration: "20 min",
      icon: MessageSquare,
      color: "bg-green-50 text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Sales Call Mastery",
      description: "Convert leads into customers through effective communication",
      difficulty: "Advanced",
      duration: "25 min",
      icon: Phone,
      color: "bg-purple-50 text-purple-600",
      borderColor: "border-purple-200",
    },
  ];

  const stats = [
    { label: "Sessions Completed", value: "12", icon: Play, color: "text-blue-600" },
    { label: "Average Score", value: "87%", icon: Star, color: "text-yellow-600" },
    { label: "Time Practiced", value: "4.2h", icon: Clock, color: "text-green-600" },
    { label: "Rank", value: "#3", icon: Award, color: "text-purple-600" },
  ];

  const breadcrumbs = [{ label: "VA Training", href: "/va" }, { label: "Simulator" }];

  return (
    <SidebarInset>
      <DashboardHeader title="Call Simulator" breadcrumbs={breadcrumbs} />

      <div className="flex flex-1 flex-col gap-4 pt-0">
        <div className="min-h-[100vh] flex-1 p-4 rounded-xl bg-muted/50 md:min-h-min ">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Ready to practice?</h2>
            <p className="text-gray-600">
              Enhance your virtual assistant skills with AI-powered realistic call scenarios.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0  bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Training Scenarios */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Scenarios</h3>
                <div className="space-y-4">
                  {scenarios.map((scenario, index) => (
                    <Card
                      key={index}
                      className={`card-hover border-0  bg-white ${scenario.borderColor} border-l-4`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`p-3 rounded-xl ${scenario.color}`}>
                              <scenario.icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">{scenario.title}</h4>
                              <p className="text-gray-600 text-sm mb-3">{scenario.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="bg-gray-100 px-2 py-1 rounded-full">
                                  {scenario.difficulty}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {scenario.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Coming Soon */}
              <Card className="border-0  bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">AI-Powered Scenarios</h3>
                      <p className="text-gray-600 text-sm">
                        Dynamic, personalized training scenarios with real-time feedback coming soon.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress & Quick Actions */}
            <div className="space-y-6">
              {/* Progress Card */}
              <Card className="border-0  bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">Your Progress</CardTitle>
                  <CardDescription>Track your improvement over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Customer Service</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Technical Support</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sales Calls</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0  bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    View Achievements
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 border-gray-200 hover:bg-gray-50"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Practice History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
