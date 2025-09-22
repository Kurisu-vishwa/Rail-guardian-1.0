import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Route, MapPin, Clock, AlertTriangle, CheckCircle, Navigation } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Rerouting() {
  const [selectedTrain, setSelectedTrain] = useState<string>('TR001');
  const { toast } = useToast();

  const reroutingOptions = [
    {
      id: 'route1',
      name: 'Primary Alternative',
      route: 'CS → WG → SH → ET',
      additionalTime: 8,
      additionalDistance: 2.3,
      cost: 'Low',
      impact: 'Minimal delay to other trains',
      feasibility: 95
    },
    {
      id: 'route2', 
      name: 'Express Route',
      route: 'CS → MJ → ET',
      additionalTime: -3,
      additionalDistance: 1.1,
      cost: 'Medium',
      impact: 'May affect Metro 41002 schedule',
      feasibility: 78
    },
    {
      id: 'route3',
      name: 'Freight Bypass',
      route: 'CS → NJ → MJ → ET',
      additionalTime: 12,
      additionalDistance: 4.2,
      cost: 'High',
      impact: 'Requires coordination with freight traffic',
      feasibility: 65
    }
  ];

  const applyReroute = (routeId: string, routeName: string) => {
    toast({
      title: "Reroute Applied",
      description: `${routeName} has been successfully applied to train ${selectedTrain}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rerouting Recommendations</h1>
          <p className="text-muted-foreground mt-1">Alternate route analysis and implementation</p>
        </div>
        <Badge variant="secondary">
          <Route className="h-4 w-4 mr-1" />
          Route Optimization
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="h-5 w-5" />
              Alternative Routes for {selectedTrain}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reroutingOptions.map((option) => (
              <div key={option.id} className="p-4 border rounded-lg hover:bg-accent/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{option.name}</h4>
                    <p className="text-sm text-muted-foreground">{option.route}</p>
                  </div>
                  <Badge className={`
                    ${option.feasibility >= 90 ? 'bg-success/10 text-success' : 
                      option.feasibility >= 70 ? 'bg-warning/10 text-warning' : 
                      'bg-destructive/10 text-destructive'}
                  `}>
                    {option.feasibility}% Feasible
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Time Impact</p>
                    <p className={`font-semibold ${
                      option.additionalTime > 0 ? 'text-warning' : 'text-success'
                    }`}>
                      {option.additionalTime > 0 ? '+' : ''}{option.additionalTime} min
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-semibold">+{option.additionalDistance} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cost</p>
                    <p className="font-semibold">{option.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Feasibility</p>
                    <p className="font-semibold">{option.feasibility}%</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Impact Assessment:</p>
                  <p className="text-sm">{option.impact}</p>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => applyReroute(option.id, option.name)}
                    disabled={option.feasibility < 70}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Apply Route
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Preview on Map
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-primary mb-2">Current Route</h4>
                  <p className="text-sm">CS → NJ → ET</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Scheduled time: 75 minutes<br/>
                    Current delay: +5 minutes
                  </p>
                </div>
                
                <div className="p-3 bg-success/5 rounded-lg border border-success/20">
                  <h4 className="font-medium text-success mb-2">Recommended</h4>
                  <p className="text-sm">CS → WG → SH → ET</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estimated time: 83 minutes<br/>
                    Expected delay: +0 minutes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reroutes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { train: 'TR003', route: 'Freight Bypass', time: '12 min ago', status: 'success' },
                  { train: 'TR002', route: 'Express Route', time: '25 min ago', status: 'success' },
                  { train: 'TR004', route: 'Primary Alternative', time: '1 hr ago', status: 'success' }
                ].map((reroute, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{reroute.train}</p>
                      <p className="text-xs text-muted-foreground">{reroute.route}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{reroute.time}</span>
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