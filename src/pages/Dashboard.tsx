import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Train, 
  Clock, 
  AlertTriangle, 
  TrendingUp,
  Activity,
  Users,
  Zap,
  MapPin
} from "lucide-react";
import { calculateKPIs, mockTrains, mockConflicts, getTrainStatusColor } from "@/lib/mockData";
import { useMemo } from "react";

export default function Dashboard() {
  const kpis = useMemo(() => calculateKPIs(), []);

  const recentActivity = [
    { id: 1, type: 'train_departure', message: 'Express 12001 departed from Central Station', time: '2 min ago', status: 'success' },
    { id: 2, type: 'conflict_resolved', message: 'Platform conflict at East Terminal resolved', time: '5 min ago', status: 'warning' },
    { id: 3, type: 'delay_detected', message: 'Freight 35007 delayed by 22 minutes', time: '8 min ago', status: 'error' },
    { id: 4, type: 'optimization_complete', message: 'Schedule optimization completed - 18% improvement', time: '12 min ago', status: 'success' },
    { id: 5, type: 'train_arrival', message: 'Local 22003 arrived at East Terminal', time: '15 min ago', status: 'success' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Control Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time railway traffic monitoring and control</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="railway-gradient text-white">
            <Activity className="h-4 w-4 mr-1" />
            Live System
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="control-panel-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Train className="h-4 w-4" />
              Active Trains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpis.activeTrains}</div>
            <p className="text-sm text-success mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="control-panel-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Average Delay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpis.avgDelay} min</div>
            <p className="text-sm text-success mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              18% improvement
            </p>
          </CardContent>
        </Card>

        <Card className="control-panel-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Active Conflicts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpis.activeConflicts}</div>
            <p className="text-sm text-warning mt-1">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card className="control-panel-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4" />
              System Throughput
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpis.systemThroughput}%</div>
            <Progress value={kpis.systemThroughput} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Trains */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Train className="h-5 w-5" />
              Active Trains
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTrains.slice(0, 5).map((train) => (
                <div key={train.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full train-glow bg-primary"></div>
                    <div>
                      <p className="font-medium">{train.name}</p>
                      <p className="text-sm text-muted-foreground">{train.route}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{train.speed} km/h</p>
                      <p className="text-xs text-muted-foreground">
                        {train.delay > 0 ? `+${train.delay}min` : train.delay < 0 ? `${train.delay}min` : 'On time'}
                      </p>
                    </div>
                    <Badge className={getTrainStatusColor(train.status)}>
                      {train.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.status === 'success' ? 'bg-success' : 
                    activity.status === 'warning' ? 'bg-warning' : 'bg-destructive'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Conflicts */}
      {mockConflicts.filter(c => c.status === 'active').length > 0 && (
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Active Conflicts Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockConflicts.filter(c => c.status === 'active').map((conflict) => (
                <div key={conflict.id} className="flex items-center justify-between p-3 rounded-lg bg-background border">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <div>
                      <p className="font-medium">{conflict.description}</p>
                      <p className="text-sm text-muted-foreground">
                        Predicted at {conflict.predictedTime} • Severity: {conflict.severity}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">View Details</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}