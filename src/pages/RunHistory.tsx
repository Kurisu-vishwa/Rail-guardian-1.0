import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Download, Eye, TrendingUp, BarChart3, FileText } from "lucide-react";
import { mockOptimizationRuns } from "@/lib/mockData";

export default function RunHistory() {
  const allRuns = [
    ...mockOptimizationRuns,
    {
      id: 'OR003',
      name: 'Weekend Schedule Optimization',
      timestamp: '2024-01-14T14:00:00Z',
      status: 'completed' as const,
      parameters: { horizon: 180, headway: 4, objective: 'minimize_conflicts' },
      results: { totalDelayBefore: 28, totalDelayAfter: 15, improvement: 46.4, throughputBefore: 8, throughputAfter: 11 }
    },
    {
      id: 'OR004', 
      name: 'Emergency Rescheduling',
      timestamp: '2024-01-13T16:30:00Z',
      status: 'completed' as const,
      parameters: { horizon: 60, headway: 2, objective: 'minimize_total_delay' },
      results: { totalDelayBefore: 67, totalDelayAfter: 42, improvement: 37.3, throughputBefore: 15, throughputAfter: 18 }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Run History & Reports</h1>
          <p className="text-muted-foreground mt-1">Historical optimization results and performance analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Badge variant="secondary">
            <History className="h-4 w-4 mr-1" />
            {allRuns.length} Runs
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">42.1%</p>
                <p className="text-sm text-muted-foreground">Avg Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">13.5</p>
                <p className="text-sm text-muted-foreground">Avg Throughput</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">2.4s</p>
                <p className="text-sm text-muted-foreground">Avg Runtime</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Reports Generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Optimization Run History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allRuns.map((run) => (
              <div key={run.id} className="p-4 border rounded-lg hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{run.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(run.timestamp).toLocaleString()} • Run ID: {run.id}
                    </p>
                  </div>
                  <Badge className={
                    run.status === 'completed' ? 'bg-success/10 text-success' :
                    run.status === 'running' ? 'bg-warning/10 text-warning' :
                    'bg-destructive/10 text-destructive'
                  }>
                    {run.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Improvement</p>
                    <p className="font-semibold text-success">+{run.results.improvement}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Delay Reduction</p>
                    <p className="font-semibold">
                      {run.results.totalDelayBefore} → {run.results.totalDelayAfter} min
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Throughput</p>
                    <p className="font-semibold">
                      {run.results.throughputBefore} → {run.results.throughputAfter}/hr
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Objective</p>
                    <p className="font-semibold text-xs">{run.parameters.objective.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horizon</p>
                    <p className="font-semibold">{run.parameters.horizon} min</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}