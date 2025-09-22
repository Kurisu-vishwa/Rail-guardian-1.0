import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, 
  Database, 
  Shuffle, 
  Download,
  Upload,
  AlertTriangle,
  Zap,
  Save
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    autoOptimization: true,
    conflictDetection: true,
    realTimeUpdates: true,
    mlPredictions: true,
    alertThreshold: 15,
    optimizationInterval: 30,
    maxDelay: 60,
    systemRefreshRate: 5
  });

  const { toast } = useToast();

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System configuration has been updated successfully.",
    });
  };

  const generateDemoData = () => {
    toast({
      title: "Demo Data Generated",
      description: "New demo scenario with 12 trains and 6 stations has been created.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
          <p className="text-muted-foreground mt-1">System configuration and data management</p>
        </div>
        <Badge variant="secondary">
          <Settings className="h-4 w-4 mr-1" />
          Administrator Panel
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-optimization">Auto Optimization</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically run optimization when conflicts are detected
                  </p>
                </div>
                <Switch 
                  id="auto-optimization"
                  checked={settings.autoOptimization}
                  onCheckedChange={(checked) => setSettings({...settings, autoOptimization: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="conflict-detection">Real-time Conflict Detection</Label>
                  <p className="text-sm text-muted-foreground">
                    Monitor and detect conflicts in real-time
                  </p>
                </div>
                <Switch 
                  id="conflict-detection"
                  checked={settings.conflictDetection}
                  onCheckedChange={(checked) => setSettings({...settings, conflictDetection: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="realtime-updates">Real-time Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable live data streaming and updates
                  </p>
                </div>
                <Switch 
                  id="realtime-updates"
                  checked={settings.realTimeUpdates}
                  onCheckedChange={(checked) => setSettings({...settings, realTimeUpdates: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ml-predictions">ML Delay Predictions</Label>
                  <p className="text-sm text-muted-foreground">
                    Use AI models for delay prediction
                  </p>
                </div>
                <Switch 
                  id="ml-predictions"
                  checked={settings.mlPredictions}
                  onCheckedChange={(checked) => setSettings({...settings, mlPredictions: checked})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Performance Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Alert Threshold (minutes)</Label>
                <div className="px-3 mt-2">
                  <Slider
                    value={[settings.alertThreshold]}
                    onValueChange={(value) => setSettings({...settings, alertThreshold: value[0]})}
                    max={60}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Trigger alerts when delays exceed {settings.alertThreshold} minutes
                </p>
              </div>

              <div>
                <Label>Optimization Interval (minutes)</Label>
                <div className="px-3 mt-2">
                  <Slider
                    value={[settings.optimizationInterval]}
                    onValueChange={(value) => setSettings({...settings, optimizationInterval: value[0]})}
                    max={120}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Run automatic optimization every {settings.optimizationInterval} minutes
                </p>
              </div>

              <div>
                <Label>Maximum Acceptable Delay (minutes)</Label>
                <div className="px-3 mt-2">
                  <Slider
                    value={[settings.maxDelay]}
                    onValueChange={(value) => setSettings({...settings, maxDelay: value[0]})}
                    max={180}
                    min={30}
                    step={15}
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Consider delays over {settings.maxDelay} minutes as critical
                </p>
              </div>

              <div>
                <Label>System Refresh Rate (seconds)</Label>
                <div className="px-3 mt-2">
                  <Slider
                    value={[settings.systemRefreshRate]}
                    onValueChange={(value) => setSettings({...settings, systemRefreshRate: value[0]})}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Update dashboard every {settings.systemRefreshRate} seconds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={generateDemoData}>
                <Shuffle className="h-4 w-4 mr-2" />
                Generate Demo Data
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Backup Data
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
              <Button variant="outline">
                <Database className="h-4 w-4 mr-2" />
                Clear Cache
              </Button>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div>
                <Label htmlFor="db-host">Database Host</Label>
                <Input id="db-host" placeholder="localhost:5432" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input id="api-endpoint" placeholder="http://localhost:8000" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div>
                  <p className="font-medium text-success">Database Connection</p>
                  <p className="text-sm text-muted-foreground">PostgreSQL connected</p>
                </div>
                <Badge className="bg-success/10 text-success">Online</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div>
                  <p className="font-medium text-success">OR-Tools Engine</p>
                  <p className="text-sm text-muted-foreground">Optimization engine ready</p>
                </div>
                <Badge className="bg-success/10 text-success">Ready</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <div>
                  <p className="font-medium text-warning">ML Model</p>
                  <p className="text-sm text-muted-foreground">Last trained 2 days ago</p>
                </div>
                <Badge className="bg-warning/10 text-warning">Update Available</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div>
                  <p className="font-medium text-success">WebSocket Connection</p>
                  <p className="text-sm text-muted-foreground">Real-time updates active</p>
                </div>
                <Badge className="bg-success/10 text-success">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Changes will be applied immediately and stored in the database.
            </p>
            <Button onClick={saveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}