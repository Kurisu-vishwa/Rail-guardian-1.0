import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Train,
  Zap,
  Settings,
  BarChart3,
  Clock
} from "lucide-react";
import { useState } from "react";
import { mockTrains } from "@/lib/mockData";

interface DelayPrediction {
  trainId: string;
  trainName: string;
  currentDelay: number;
  predictedDelay: number;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: string[];
}

export default function DelayPrediction() {
  const [mlEnabled, setMlEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock ML predictions
  const delayPredictions: DelayPrediction[] = mockTrains.map((train, index) => {
    const predictions = [
      { predictedDelay: 8, confidence: 85, riskLevel: 'medium', factors: ['Weather conditions', 'Track congestion'] },
      { predictedDelay: 2, confidence: 92, riskLevel: 'low', factors: ['Normal operations'] },
      { predictedDelay: 35, confidence: 78, riskLevel: 'critical', factors: ['Equipment failure', 'Cascade delays'] },
      { predictedDelay: 12, confidence: 88, riskLevel: 'medium', factors: ['Platform occupancy', 'Peak hour traffic'] },
      { predictedDelay: 6, confidence: 91, riskLevel: 'low', factors: ['Minor signal delays'] }
    ];

    return {
      trainId: train.id,
      trainName: train.name,
      currentDelay: train.delay,
      ...predictions[index]
    } as DelayPrediction;
  });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'high': return 'bg-warning/10 text-warning border-warning/20';
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const modelMetrics = {
    accuracy: 87.3,
    precision: 84.7,
    recall: 91.2,
    f1Score: 87.8,
    lastTrained: '2024-01-14T22:30:00Z',
    trainingSize: 45000
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Delay Prediction</h1>
          <p className="text-muted-foreground mt-1">AI-powered delay forecasting and risk assessment</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={mlEnabled ? "default" : "secondary"}>
            <Brain className="h-4 w-4 mr-1" />
            ML {mlEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
          <Badge variant="outline">
            <Zap className="h-4 w-4 mr-1" />
            Real-time
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Model Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">ML Predictions</label>
                <Switch checked={mlEnabled} onCheckedChange={setMlEnabled} />
              </div>
              <p className="text-xs text-muted-foreground">
                Enable AI-powered delay predictions
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Auto Refresh</label>
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>
              <p className="text-xs text-muted-foreground">
                Automatically update predictions every 30 seconds
              </p>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Model Performance</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">{modelMetrics.accuracy}%</span>
                  </div>
                  <Progress value={modelMetrics.accuracy} className="mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Precision</span>
                    <span className="font-medium">{modelMetrics.precision}%</span>
                  </div>
                  <Progress value={modelMetrics.precision} className="mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Recall</span>
                    <span className="font-medium">{modelMetrics.recall}%</span>
                  </div>
                  <Progress value={modelMetrics.recall} className="mt-1" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline" size="sm" className="w-full">
                Retrain Model
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Predictions */}
        <div className="lg:col-span-3 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <div>
                    <p className="text-2xl font-bold">
                      {delayPredictions.filter(p => p.riskLevel === 'critical').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Critical Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <div>
                    <p className="text-2xl font-bold">
                      {delayPredictions.filter(p => p.riskLevel === 'high' || p.riskLevel === 'medium').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Medium-High Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <div>
                    <p className="text-2xl font-bold">
                      {delayPredictions.filter(p => p.riskLevel === 'low').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Low Risk</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.round(delayPredictions.reduce((sum, p) => sum + p.confidence, 0) / delayPredictions.length)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Avg Confidence</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Predictions Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Delay Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {delayPredictions.map((prediction) => (
                  <div key={prediction.trainId} className="p-4 rounded-lg border hover:bg-accent/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Train className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-semibold">{prediction.trainName}</h4>
                          <p className="text-sm text-muted-foreground">ID: {prediction.trainId}</p>
                        </div>
                      </div>
                      <Badge className={getRiskBadgeColor(prediction.riskLevel)}>
                        {prediction.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Delay</p>
                        <p className="font-semibold flex items-center gap-1">
                          {prediction.currentDelay > 0 ? (
                            <>
                              <TrendingUp className="h-4 w-4 text-warning" />
                              +{prediction.currentDelay} min
                            </>
                          ) : prediction.currentDelay < 0 ? (
                            <>
                              <TrendingDown className="h-4 w-4 text-success" />
                              {prediction.currentDelay} min
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              On time
                            </>
                          )}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Predicted Delay</p>
                        <p className={`font-semibold ${getRiskColor(prediction.riskLevel)}`}>
                          +{prediction.predictedDelay} min
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Confidence</p>
                        <div className="flex items-center gap-2">
                          <Progress value={prediction.confidence} className="flex-1" />
                          <span className="text-sm font-medium">{prediction.confidence}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Change</p>
                        <p className={`font-semibold ${
                          prediction.predictedDelay > prediction.currentDelay ? 'text-warning' : 'text-success'
                        }`}>
                          {prediction.predictedDelay > prediction.currentDelay ? '+' : ''}
                          {prediction.predictedDelay - prediction.currentDelay} min
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Risk Factors:</p>
                      <div className="flex flex-wrap gap-1">
                        {prediction.factors.map((factor, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Model Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Model Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Training Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Model trained on {modelMetrics.trainingSize.toLocaleString()} historical records
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last trained: {new Date(modelMetrics.lastTrained).toLocaleDateString()}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Features Used</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Weather conditions</li>
                    <li>• Track occupancy</li>
                    <li>• Historical patterns</li>
                    <li>• Train characteristics</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Algorithm</h4>
                  <p className="text-sm text-muted-foreground">
                    Gradient Boosting Classifier with time-series features and ensemble methods
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}