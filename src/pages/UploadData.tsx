import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  FileText, 
  Database, 
  CheckCircle, 
  AlertCircle,
  Shuffle,
  Download,
  Play
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function UploadData() {
  const [uploadedData, setUploadedData] = useState<string>('');
  const [validationStatus, setValidationStatus] = useState<'none' | 'valid' | 'invalid'>('none');
  const [isDemoDataGenerated, setIsDemoDataGenerated] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setUploadedData(content);
        validateData(content);
      };
      reader.readAsText(file);
    }
  };

  const validateData = (data: string) => {
    // Simple validation logic
    try {
      if (data.includes('train_id') && data.includes('schedule') && data.includes('route')) {
        setValidationStatus('valid');
        toast({
          title: "Data Validated",
          description: "Upload successful! Data format is correct.",
        });
      } else {
        setValidationStatus('invalid');
        toast({
          title: "Validation Error",
          description: "Data format is incorrect. Please check the sample format.",
          variant: "destructive",
        });
      }
    } catch {
      setValidationStatus('invalid');
    }
  };

  const generateDemoData = () => {
    const demoData = `train_id,name,route,scheduled_departure,scheduled_arrival,platform,capacity
TR001,Express 12001,CS-NJ-ET,14:30,15:45,3,400
TR002,Local 22003,ET-SH-WG,14:45,16:20,1,250
TR003,Freight 35007,WG-CS-MJ,14:20,16:10,7,800
TR004,Metro 41002,NJ-MJ-CS,14:50,15:35,2,300
TR005,Express 15004,SH-ET-NJ,14:55,16:40,4,450

station_id,name,code,platforms,maintenance_window
ST001,Central Station,CS,8,02:00-04:00
ST002,North Junction,NJ,4,01:30-03:30
ST003,East Terminal,ET,6,03:00-05:00
ST004,South Hub,SH,5,02:30-04:30
ST005,West Gateway,WG,3,01:00-03:00

track_id,from_station,to_station,length_km,max_speed,status
TK001,CS,NJ,2.8,90,operational
TK002,NJ,ET,3.2,80,operational
TK003,CS,SH,2.1,85,operational
TK004,ET,SH,4.5,75,maintenance
TK005,WG,CS,1.8,95,operational`;

    setUploadedData(demoData);
    setValidationStatus('valid');
    setIsDemoDataGenerated(true);
    toast({
      title: "Demo Data Generated",
      description: "Sample railway data has been generated successfully!",
    });
  };

  const sampleFormat = `// CSV Format Example
train_id,name,route,scheduled_departure,scheduled_arrival,platform,capacity
TR001,Express 12001,CS-NJ-ET,14:30,15:45,3,400

// JSON Format Example
{
  "trains": [
    {
      "id": "TR001",
      "name": "Express 12001",
      "route": ["CS", "NJ", "ET"],
      "schedule": {
        "departure": "14:30",
        "arrival": "15:45"
      },
      "platform": 3,
      "capacity": 400
    }
  ],
  "stations": [...],
  "tracks": [...]
}`;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Data & Simulation</h1>
          <p className="text-muted-foreground mt-1">Import schedule data or generate demo scenarios</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">
            <Database className="h-4 w-4 mr-1" />
            Data Management
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Schedule Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drop your CSV or JSON files here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" asChild>
                    <span className="cursor-pointer">Choose Files</span>
                  </Button>
                </label>
              </div>

              {validationStatus !== 'none' && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  validationStatus === 'valid' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {validationStatus === 'valid' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium">
                    {validationStatus === 'valid' 
                      ? 'Data validation successful' 
                      : 'Data validation failed'}
                  </span>
                </div>
              )}

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Or Generate Demo Data</h4>
                <p className="text-sm text-muted-foreground">
                  Create a sample dataset with 6 stations, 12 trains, and realistic conflicts for testing.
                </p>
                <Button 
                  onClick={generateDemoData}
                  variant="outline" 
                  className="w-full"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Generate Demo Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Format Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Data Format Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Required Fields</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <code>train_id</code> - Unique identifier</li>
                    <li>• <code>route</code> - Station sequence</li>
                    <li>• <code>schedule</code> - Departure/arrival times</li>
                    <li>• <code>platform</code> - Platform assignments</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Supported Formats</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">CSV</Badge>
                    <Badge variant="outline">JSON</Badge>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Preview */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Data Preview
                {isDemoDataGenerated && (
                  <Badge variant="secondary" className="ml-2">Demo Data</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {uploadedData ? (
                <div className="space-y-4">
                  <Textarea
                    value={uploadedData}
                    onChange={(e) => setUploadedData(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                    placeholder="Your uploaded data will appear here..."
                  />
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => validateData(uploadedData)}
                      size="sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Validate Data
                    </Button>
                    
                    {validationStatus === 'valid' && (
                      <Button 
                        variant="default"
                        size="sm"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Load into System
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Upload a file or generate demo data to see preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sample Format */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Format</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {sampleFormat}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}