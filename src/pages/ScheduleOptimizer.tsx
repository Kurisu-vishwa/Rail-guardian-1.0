import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings, 
  Play, 
  Clock, 
  TrendingUp, 
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockOptimizationRuns } from "@/lib/mockData";

interface OptimizationParams {
  horizon: number;
  headway: number;
  objective: string;
  priority: string;
}

export default function ScheduleOptimizer() {
  const [params, setParams] = useState<OptimizationParams>({
    horizon: 120,
    headway: 3,
    objective: 'minimize_total_delay',
    priority: 'passenger'
  });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const runOptimization = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
    setResults(null);

    // Simulate optimization progress
    const progressInterval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    // Simulate optimization completion
    setTimeout(() => {
      clearInterval(progressInterval);
      setOptimizationProgress(100);
      
      // Mock results
      const mockResults = {
        runId: 'OR' + Date.now(),
        status: 'completed',
        totalDelayBefore: 45,
        totalDelayAfter: 28,
        improvement: 37.8,
        throughputBefore: 12,
        throughputAfter: 15,
        conflictsResolved: 3,
        executionTime: 2.3
      };
      
      setResults(mockResults);
      setIsOptimizing(false);
      
      toast({
        title: "Optimization Complete",
        description: `Schedule optimized with ${mockResults.improvement}% improvement!`,
      });
    }, 3000);
  };

  const beforeAfterData = [
    { metric: 'Total Delay (min)', before: 45, after: 28, improvement: 37.8 },
    { metric: 'Throughput (trains/hr)', before: 12, after: 15, improvement: 25.0 },
    { metric: 'Platform Utilization (%)', before: 68, after: 82, improvement: 20.6 },
    { metric: 'Average Speed (km/h)', before: 72, after: 78, improvement: 8.3 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule Optimizer</h1>
          <p className="text-muted-foreground mt-1">AI-powered train schedule optimization using OR-Tools</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">
            <Zap className="h-4 w-4 mr-1" />
            OR-Tools Engine
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Optimization Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Optimization Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Time Horizon */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Time Horizon (minutes)</label>
              <div className="px-3">
                <Slider
                  value={[params.horizon]}
                  onValueChange={(value) => setParams({...params, horizon: value[0]})}
                  max={240}
                  min={60}
                  step={30}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {params.horizon} minutes
              </div>
            </div>

            {/* Minimum Headway */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Minimum Headway (minutes)</label>
              <div className="px-3">
                <Slider
                  value={[params.headway]}
                  onValueChange={(value) => setParams({...params, headway: value[0]})}
                  max={10}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {params.headway} minutes
              </div>
            </div>

            {/* Objective Function */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Optimization Objective</label>
              <Select 
                value={params.objective} 
                onValueChange={(value) => setParams({...params, objective: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimize_total_delay">Minimize Total Delay</SelectItem>
                  <SelectItem value="maximize_throughput">Maximize Throughput</SelectItem>
                  <SelectItem value="minimize_conflicts">Minimize Conflicts</SelectItem>
                  <SelectItem value="optimize_energy">Optimize Energy Usage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority Weights */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Priority Type</label>
              <Select 
                value={params.priority} 
                onValueChange={(value) => setParams({...params, priority: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passenger">Passenger Priority</SelectItem>
                  <SelectItem value="freight">Freight Priority</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="express">Express Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Run Optimization */}
            <Button 
              onClick={runOptimization}
              disabled={isOptimizing}
              className="w-full"
              size="lg"
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Optimization
                </>
              )}
            </Button>

            {/* Progress */}
            {isOptimizing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(optimizationProgress)}%</span>
                </div>
                <Progress value={optimizationProgress} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  Running CP-SAT solver on railway network...
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Results */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Optimization Results
                  <Badge variant="secondary">Run {results.runId}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">
                      {results.improvement}%
                    </div>
                    <div className="text-sm text-muted-foreground">Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {results.conflictsResolved}
                    </div>
                    <div className="text-sm text-muted-foreground">Conflicts Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {results.executionTime}s
                    </div>
                    <div className="text-sm text-muted-foreground">Execution Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {results.throughputAfter}
                    </div>
                    <div className="text-sm text-muted-foreground">Trains/Hour</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Apply Schedule
                  </Button>
                  <Button variant="outline" size="sm">
                    Export Results
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Before/After Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Before vs After Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  {beforeAfterData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.metric}</span>
                        <Badge variant="secondary" className="text-success">
                          +{item.improvement}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Before</div>
                          <div className="text-lg font-semibold">{item.before}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">After</div>
                          <div className="text-lg font-semibold text-success">{item.after}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Run optimization to see before/after comparison
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Runs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Optimization Runs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockOptimizationRuns.map((run) => (
                  <div key={run.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        run.status === 'completed' ? 'bg-success' : 
                        run.status === 'running' ? 'bg-warning' : 'bg-destructive'
                      }`}></div>
                      <div>
                        <p className="font-medium">{run.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(run.timestamp).toLocaleDateString()} • {run.parameters.objective}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-success">
                          +{run.results.improvement}%
                        </p>
                        <p className="text-xs text-muted-foreground">improvement</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}