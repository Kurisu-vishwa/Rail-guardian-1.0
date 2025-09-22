import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Map as MapIcon, 
  Train, 
  MapPin, 
  Clock, 
  Gauge,
  Users,
  X,
  Navigation
} from "lucide-react";
import { mockTrains, mockStations, mockTracks, getTrainStatusColor } from "@/lib/mockData";
import { useState } from "react";

export default function MapView() {
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [mapView, setMapView] = useState<'schematic' | 'geographic'>('schematic');

  const selectedTrainData = selectedTrain ? mockTrains.find(t => t.id === selectedTrain) : null;

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Train Monitor</h1>
          <p className="text-muted-foreground mt-1">Real-time train tracking and route visualization</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant={mapView === 'schematic' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setMapView('schematic')}
          >
            Schematic View
          </Button>
          <Button 
            variant={mapView === 'geographic' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setMapView('geographic')}
          >
            Geographic View
          </Button>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 flex gap-6">
        {/* Map Container */}
        <div className="flex-1">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="h-5 w-5" />
                Railway Network - {mapView === 'schematic' ? 'Schematic' : 'Geographic'} View
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full pb-6">
              {/* Mock Railway Schematic */}
              <div className="relative h-full bg-muted/20 rounded-lg border-2 border-dashed border-muted overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `
                    linear-gradient(0deg, hsl(var(--border)) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}></div>

                {/* Railway Tracks */}
                <svg className="absolute inset-0 w-full h-full">
                  {/* Horizontal Main Line */}
                  <line x1="10%" y1="40%" x2="90%" y2="40%" stroke="hsl(var(--primary))" strokeWidth="3" className="track-animated" />
                  <line x1="10%" y1="60%" x2="90%" y2="60%" stroke="hsl(var(--primary))" strokeWidth="3" className="track-animated" />
                  
                  {/* Vertical Connections */}
                  <line x1="30%" y1="20%" x2="30%" y2="80%" stroke="hsl(var(--primary))" strokeWidth="3" />
                  <line x1="70%" y1="20%" x2="70%" y2="80%" stroke="hsl(var(--primary))" strokeWidth="3" />
                  
                  {/* Junction Lines */}
                  <line x1="30%" y1="40%" x2="50%" y2="30%" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <line x1="50%" y1="30%" x2="70%" y2="40%" stroke="hsl(var(--primary))" strokeWidth="2" />
                </svg>

                {/* Stations */}
                {mockStations.map((station, index) => {
                  const positions = [
                    { x: '15%', y: '40%' }, // Central Station
                    { x: '30%', y: '25%' }, // North Junction
                    { x: '70%', y: '25%' }, // East Terminal
                    { x: '85%', y: '60%' }, // South Hub
                    { x: '15%', y: '75%' }, // West Gateway
                    { x: '50%', y: '15%' }  // Metro Junction
                  ];
                  
                  return (
                    <div
                      key={station.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: positions[index]?.x, top: positions[index]?.y }}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`
                          w-4 h-4 rounded-full border-2 border-white shadow-lg
                          ${station.status === 'operational' ? 'bg-success' : 
                            station.status === 'congested' ? 'bg-warning' : 'bg-destructive'}
                        `}></div>
                        <div className="text-xs font-medium mt-1 bg-background px-2 py-1 rounded shadow-sm">
                          {station.code}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Trains */}
                {mockTrains.map((train, index) => {
                  const positions = [
                    { x: '25%', y: '38%' }, // Express 12001
                    { x: '75%', y: '28%' }, // Local 22003
                    { x: '18%', y: '72%' }, // Freight 35007
                    { x: '45%', y: '20%' }, // Metro 41002
                    { x: '82%', y: '58%' }  // Express 15004
                  ];

                  return (
                    <div
                      key={train.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ left: positions[index]?.x, top: positions[index]?.y }}
                      onClick={() => setSelectedTrain(train.id)}
                    >
                      <div className={`
                        w-6 h-6 rounded-lg shadow-lg border-2 border-white train-glow transition-all duration-300
                        ${selectedTrain === train.id ? 'scale-125' : 'hover:scale-110'}
                        ${getTrainStatusColor(train.status).replace('text-', 'bg-').replace('-foreground', '')}
                      `}>
                        <Train className="h-3 w-3 text-white m-auto mt-1" />
                      </div>
                      <div className="text-xs font-bold mt-1 text-center bg-background px-1 rounded">
                        {train.name.split(' ')[1]}
                      </div>
                    </div>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border">
                  <div className="text-xs font-semibold mb-2">Legend</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span>Operational</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span>Congested</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-destructive rounded-full"></div>
                      <span>Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Train Detail Panel */}
        {selectedTrainData && (
          <div className="w-80 flex-shrink-0">
            <Card className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Train className="h-5 w-5" />
                    Train Details
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedTrain(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Train Basic Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedTrainData.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTrainData.route}</p>
                  </div>
                  
                  <Badge className={getTrainStatusColor(selectedTrainData.status)}>
                    {selectedTrainData.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>

                {/* Current Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Gauge className="h-4 w-4" />
                      Speed
                    </div>
                    <div className="font-semibold">{selectedTrainData.speed} km/h</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Occupancy
                    </div>
                    <div className="font-semibold">{selectedTrainData.occupancy}%</div>
                  </div>
                </div>

                {/* Location Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4" />
                    Current Location
                  </div>
                  
                  <div className="pl-6 space-y-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Station</div>
                      <div className="font-medium">{selectedTrainData.currentStation}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Next Station</div>
                      <div className="font-medium">{selectedTrainData.nextStation}</div>
                    </div>
                  </div>
                </div>

                {/* Schedule Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock className="h-4 w-4" />
                    Schedule
                  </div>
                  
                  <div className="pl-6 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Scheduled</span>
                      <span className="font-medium">{selectedTrainData.scheduledTime}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Actual</span>
                      <span className="font-medium">{selectedTrainData.actualTime}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Delay</span>
                      <span className={`font-medium ${
                        selectedTrainData.delay > 0 ? 'text-warning' : 
                        selectedTrainData.delay < 0 ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {selectedTrainData.delay > 0 ? `+${selectedTrainData.delay}` : selectedTrainData.delay} min
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Navigation className="h-4 w-4 mr-2" />
                    Track Route
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}