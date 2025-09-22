import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Eye,
  Filter,
  Zap,
  Route,
  Pause
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { mockConflicts, getConflictSeverityColor } from "@/lib/mockData";

export default function ConflictAlerts() {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('severity');
  const { toast } = useToast();

  const applyResolution = (conflictId: string, resolution: string) => {
    toast({
      title: "Resolution Applied",
      description: `${resolution} has been applied successfully.`,
    });
  };

  const filteredConflicts = mockConflicts.filter(conflict => {
    if (filter === 'all') return true;
    return conflict.status === filter;
  });

  const getTimeUntilConflict = (predictedTime: string) => {
    const now = new Date();
    const conflictTime = new Date();
    const [hours, minutes] = predictedTime.split(':').map(Number);
    conflictTime.setHours(hours, minutes, 0, 0);
    
    const diff = conflictTime.getTime() - now.getTime();
    const minutesDiff = Math.floor(diff / (1000 * 60));
    
    if (minutesDiff < 0) return 'Overdue';
    if (minutesDiff < 60) return `${minutesDiff} min`;
    return `${Math.floor(minutesDiff / 60)}h ${minutesDiff % 60}m`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Conflict Alerts</h1>
          <p className="text-muted-foreground mt-1">Monitor and resolve railway traffic conflicts</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="destructive">
            <AlertTriangle className="h-4 w-4 mr-1" />
            {filteredConflicts.filter(c => c.status === 'active').length} Active
          </Badge>
          <Badge variant="secondary">
            <CheckCircle className="h-4 w-4 mr-1" />
            {filteredConflicts.filter(c => c.status === 'resolved').length} Resolved
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter by Status:</span>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conflicts</SelectItem>
                <SelectItem value="active">Active Only</SelectItem>
                <SelectItem value="resolved">Resolved Only</SelectItem>
                <SelectItem value="monitoring">Monitoring Only</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm font-medium">Sort by:</span>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="severity">Severity</SelectItem>
                <SelectItem value="time">Time to Impact</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Conflict List */}
      <div className="space-y-4">
        {filteredConflicts.map((conflict) => (
          <Card key={conflict.id} className={`
            ${conflict.severity === 'critical' ? 'border-destructive/50 bg-destructive/5' : 
              conflict.severity === 'high' ? 'border-warning/50 bg-warning/5' : ''}
          `}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    conflict.severity === 'critical' ? 'text-destructive' :
                    conflict.severity === 'high' ? 'text-warning' :
                    conflict.severity === 'medium' ? 'text-warning' :
                    'text-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{conflict.description}</CardTitle>
                      <Badge className={getConflictSeverityColor(conflict.severity)}>
                        {conflict.severity.toUpperCase()}
                      </Badge>
                      <Badge variant={
                        conflict.status === 'active' ? 'destructive' :
                        conflict.status === 'resolved' ? 'secondary' :
                        'outline'
                      }>
                        {conflict.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong>Affected Trains:</strong> {conflict.affectedTrains.join(', ')}
                      </p>
                      <p>
                        <strong>Predicted Time:</strong> {conflict.predictedTime} ({getTimeUntilConflict(conflict.predictedTime)})
                      </p>
                      <p>
                        <strong>Type:</strong> {conflict.type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Suggested Resolution */}
                <div className="p-3 bg-accent/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Suggested Resolution:</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {conflict.suggestedResolution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {conflict.status === 'active' && (
                    <>
                      <Button 
                        size="sm"
                        onClick={() => applyResolution(conflict.id, conflict.suggestedResolution)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Apply Resolution
                      </Button>
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4 mr-2" />
                        Hold Train
                      </Button>
                      <Button variant="outline" size="sm">
                        <Route className="h-4 w-4 mr-2" />
                        Reroute
                      </Button>
                    </>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  
                  <div className="ml-auto text-xs text-muted-foreground">
                    Detected: {new Date(conflict.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConflicts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <CheckCircle className="h-12 w-12 mx-auto text-success mb-4" />
            <h3 className="text-lg font-semibold mb-2">No conflicts found</h3>
            <p className="text-muted-foreground">
              {filter === 'all' ? 'All systems are running smoothly!' : `No ${filter} conflicts at this time.`}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">{mockConflicts.filter(c => c.severity === 'critical').length}</p>
                <p className="text-sm text-muted-foreground">Critical</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">{mockConflicts.filter(c => c.severity === 'high').length}</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">{mockConflicts.filter(c => c.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">{mockConflicts.filter(c => c.status === 'resolved').length}</p>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}