"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { VASimulatorChat } from "@/components/va-simulator-chat";

export default function VASimulator() {
  const breadcrumbs = [{ label: "VA Training", href: "/va" }, { label: "Simulator" }];

  const handleSessionStart = () => {
    // Session started
  };

  const handleSessionEnd = () => {
    // Session ended
  };

  return (
    <SidebarInset>
      <DashboardHeader title="AI Call Simulation" breadcrumbs={breadcrumbs} />

      <div className="flex flex-1 flex-col gap-4 pt-0">
        <div className="min-h-[100vh] flex-1 p-4 rounded-xl bg-muted/50 md:min-h-min">
          <Card className="border-0 bg-white h-[calc(100vh-200px)]">
            <CardContent className="p-0 h-full">
              <VASimulatorChat onSessionStart={handleSessionStart} onSessionEnd={handleSessionEnd} />
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
