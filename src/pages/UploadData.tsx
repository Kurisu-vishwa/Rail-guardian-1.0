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
  Download
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function UploadData() {
  const [uploadedData, setUploadedData] = useState<string>('');
  const [validationStatus, setValidationStatus] = useState<'none' | 'valid' | 'invalid'>('none');
  const [isDemoDataGenerated, setIsDemoDataGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ------------------- Validation -------------------
  const validateData = (data: string) => {
    try {
      const lines = data.split("\n").filter(Boolean);
      const header = lines[0].split(",").map(h => h.trim());

      const requiredFields = [
        "train_name",
        "station_code",
        "platform",
        "scheduled_arrival",
        "scheduled_departure"
      ];

      const allFieldsPresent = requiredFields.every(f => header.includes(f));

      if (allFieldsPresent) {
        setValidationStatus("valid");
        toast({
          title: "Data Validated",
          description: "Format is correct!",
        });
      } else {
        setValidationStatus("invalid");
        toast({
          title: "Validation Error",
          description: `Missing fields: ${requiredFields.filter(f => !header.includes(f)).join(", ")}`,
          variant: "destructive",
        });
      }
    } catch {
      setValidationStatus("invalid");
      toast({
        title: "Validation Error",
        description: "Could not parse file",
        variant: "destructive",
      });
    }
  };

  // ------------------- File Upload -------------------
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setUploadedData(content);
      validateData(content);
    };
    reader.readAsText(file);
  };

  // ------------------- Load into System -------------------
  const loadIntoSystem = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://localhost:8000/api/schedules/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.status === "success") {
        toast({
          title: "Schedules Loaded",
          description: `File '${selectedFile.name}' uploaded successfully!`,
        });
      } else {
        toast({
          title: "Upload Failed",
          description: data.detail || "An error occurred during upload",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Upload Failed",
        description: err.message || "Unexpected error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ------------------- Demo Data -------------------
  const generateDemoData = () => {
    const demoData = `train_name,station_code,platform,scheduled_arrival,scheduled_departure,actual_arrival,actual_departure,delay_arrival_min,delay_departure_min
Express 101,CEN,1,14:00,14:05,14:02,14:06,2,1
Local 202,NTH,2,14:15,14:20,14:18,14:22,3,2
Superfast 303,STH,1,14:30,14:35,14:31,14:36,1,1`;
    const blob = new Blob([demoData], { type: "text/csv" });
    const file = new File([blob], "demo_schedule.csv", { type: "text/csv" });

    setUploadedData(demoData);
    setValidationStatus("valid");
    setIsDemoDataGenerated(true);
    setSelectedFile(file);

    toast({
      title: "Demo Data Generated",
      description: "Sample schedule data ready!",
    });
  };

  // ------------------- Download Sample -------------------
  const downloadSample = () => {
    const sampleData = `train_name,station_code,platform,scheduled_arrival,scheduled_departure
Express 101,CEN,1,14:00,14:05
Local 202,NTH,2,14:15,14:20
Superfast 303,STH,1,14:30,14:35`;
    const blob = new Blob([sampleData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "sample_schedule.csv";
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Data & Simulation</h1>
          <p className="text-muted-foreground mt-1">Import schedule data or generate demo scenarios</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Database className="h-4 w-4" /> Data Management
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" /> Upload Schedule Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={loading}
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" asChild disabled={loading}>
                    <span className="cursor-pointer">{loading ? "Uploading..." : "Choose Files"}</span>
                  </Button>
                </label>
              </div>

              {/* Validation Status */}
              {validationStatus !== 'none' && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  validationStatus === 'valid' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                }`}>
                  {validationStatus === 'valid' ? <CheckCircle className="h-4 w-4"/> : <AlertCircle className="h-4 w-4"/>}
                  <span className="text-sm font-medium">
                    {validationStatus === 'valid' ? 'Data format is valid' : 'Data format is invalid'}
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={generateDemoData} disabled={loading}>
                  <Shuffle className="h-4 w-4 mr-2" /> Generate Demo Data
                </Button>
                
               
              </div>
            </CardContent>
          </Card>

          {/* Data Format Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Data Format Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">Required Fields</p>
              <ul className="list-disc list-inside">
                <li>train_name - Name of train (must exist in DB)</li>
                <li>station_code - Station code (must exist in DB)</li>
                <li>platform - Platform assignment</li>
                <li>scheduled_arrival - HH:MM</li>
                <li>scheduled_departure - HH:MM</li>
              </ul>
              <p className="font-medium mt-2">Supported Formats</p>
              <ul className="list-disc list-inside">
                <li>CSV</li>
                <li>JSON</li>
              </ul>
              <Button variant="outline" onClick={downloadSample} disabled={loading}>
                  <Download className="h-4 w-4 mr-0" /> Download Sample Template
                </Button>
            </CardContent>
            
          </Card>
        </div>

        {/* Data Preview */}
<div className="space-y-6">
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText className="h-5 w-5" /> Data Preview
        {isDemoDataGenerated && <Badge variant="secondary" className="ml-2">Demo Data</Badge>}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Textarea
        value={uploadedData}
        onChange={(e) => {
          setUploadedData(e.target.value);
          validateData(e.target.value);
        }}
        className="min-h-[300px] font-mono text-sm"
        placeholder="Your uploaded data will appear here..."
      />
    </CardContent>
     {/* Load into System Button Below Preview */}
  <div className="flex justify-end mt-2 mr-8">
    <Button
      className="bg-blue-600 text-white hover:bg-blue-700"
      onClick={loadIntoSystem}
      disabled={validationStatus !== 'valid' || !selectedFile || loading}
    >
      <Database className="h-4 w-4 mr-2" /> Load into System
    </Button>
  </div>
  </Card>

 
</div>
      </div>
    </div>
  );
}
