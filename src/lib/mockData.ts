export interface Train {
  id: string;
  name: string;
  route: string;
  status: 'active' | 'delayed' | 'on_time' | 'stopped';
  speed: number; // km/h
  currentStation: string;
  nextStation: string;
  scheduledTime: string;
  actualTime: string;
  delay: number; // minutes
  position: { lat: number; lng: number };
  occupancy: number; // percentage
  direction: 'north' | 'south' | 'east' | 'west';
}

export interface Station {
  id: string;
  name: string;
  code: string;
  position: { lat: number; lng: number };
  platforms: number;
  status: 'operational' | 'maintenance' | 'congested';
}

export interface Track {
  id: string;
  from: string;
  to: string;
  length: number; // km
  status: 'clear' | 'occupied' | 'maintenance';
  maxSpeed: number; // km/h
  coordinates: { lat: number; lng: number }[];
}

export interface Conflict {
  id: string;
  type: 'collision_risk' | 'platform_conflict' | 'scheduling_conflict';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedTrains: string[];
  predictedTime: string;
  suggestedResolution: string;
  status: 'active' | 'resolved' | 'monitoring';
  timestamp: string;
}

export interface OptimizationRun {
  id: string;
  name: string;
  timestamp: string;
  status: 'running' | 'completed' | 'failed';
  parameters: {
    horizon: number;
    headway: number;
    objective: string;
  };
  results: {
    totalDelayBefore: number;
    totalDelayAfter: number;
    improvement: number;
    throughputBefore: number;
    throughputAfter: number;
  };
}

// Mock data
export const mockStations: Station[] = [
  { id: 'ST001', name: 'Central Station', code: 'CS', position: { lat: 28.6139, lng: 77.209 }, platforms: 8, status: 'operational' },
  { id: 'ST002', name: 'North Junction', code: 'NJ', position: { lat: 28.6339, lng: 77.229 }, platforms: 4, status: 'operational' },
  { id: 'ST003', name: 'East Terminal', code: 'ET', position: { lat: 28.6239, lng: 77.249 }, platforms: 6, status: 'congested' },
  { id: 'ST004', name: 'South Hub', code: 'SH', position: { lat: 28.5939, lng: 77.189 }, platforms: 5, status: 'operational' },
  { id: 'ST005', name: 'West Gateway', code: 'WG', position: { lat: 28.6039, lng: 77.169 }, platforms: 3, status: 'maintenance' },
  { id: 'ST006', name: 'Metro Junction', code: 'MJ', position: { lat: 28.6439, lng: 77.199 }, platforms: 4, status: 'operational' }
];

export const mockTrains: Train[] = [
  {
    id: 'TR001',
    name: 'Express 12001',
    route: 'CS-NJ-ET',
    status: 'active',
    speed: 85,
    currentStation: 'Central Station',
    nextStation: 'North Junction',
    scheduledTime: '14:30',
    actualTime: '14:35',
    delay: 5,
    position: { lat: 28.6189, lng: 77.215 },
    occupancy: 78,
    direction: 'north'
  },
  {
    id: 'TR002',
    name: 'Local 22003',
    route: 'ET-SH-WG',
    status: 'on_time',
    speed: 60,
    currentStation: 'East Terminal',
    nextStation: 'South Hub',
    scheduledTime: '14:45',
    actualTime: '14:45',
    delay: 0,
    position: { lat: 28.6139, lng: 77.235 },
    occupancy: 45,
    direction: 'south'
  },
  {
    id: 'TR003',
    name: 'Freight 35007',
    route: 'WG-CS-MJ',
    status: 'delayed',
    speed: 35,
    currentStation: 'West Gateway',
    nextStation: 'Central Station',
    scheduledTime: '14:20',
    actualTime: '14:42',
    delay: 22,
    position: { lat: 28.6039, lng: 77.175 },
    occupancy: 95,
    direction: 'east'
  },
  {
    id: 'TR004',
    name: 'Metro 41002',
    route: 'NJ-MJ-CS',
    status: 'active',
    speed: 72,
    currentStation: 'North Junction',
    nextStation: 'Metro Junction',
    scheduledTime: '14:50',
    actualTime: '14:48',
    delay: -2,
    position: { lat: 28.6339, lng: 77.215 },
    occupancy: 62,
    direction: 'west'
  },
  {
    id: 'TR005',
    name: 'Express 15004',
    route: 'SH-ET-NJ',
    status: 'stopped',
    speed: 0,
    currentStation: 'South Hub',
    nextStation: 'East Terminal',
    scheduledTime: '14:55',
    actualTime: '14:58',
    delay: 3,
    position: { lat: 28.5939, lng: 77.189 },
    occupancy: 88,
    direction: 'north'
  }
];

export const mockTracks: Track[] = [
  {
    id: 'TK001',
    from: 'CS',
    to: 'NJ',
    length: 2.8,
    status: 'occupied',
    maxSpeed: 90,
    coordinates: [
      { lat: 28.6139, lng: 77.209 },
      { lat: 28.6239, lng: 77.219 },
      { lat: 28.6339, lng: 77.229 }
    ]
  },
  {
    id: 'TK002',
    from: 'NJ',
    to: 'ET',
    length: 3.2,
    status: 'clear',
    maxSpeed: 80,
    coordinates: [
      { lat: 28.6339, lng: 77.229 },
      { lat: 28.6289, lng: 77.239 },
      { lat: 28.6239, lng: 77.249 }
    ]
  },
  {
    id: 'TK003',
    from: 'CS',
    to: 'SH',
    length: 2.1,
    status: 'clear',
    maxSpeed: 85,
    coordinates: [
      { lat: 28.6139, lng: 77.209 },
      { lat: 28.6039, lng: 77.199 },
      { lat: 28.5939, lng: 77.189 }
    ]
  }
];

export const mockConflicts: Conflict[] = [
  {
    id: 'CF001',
    type: 'collision_risk',
    severity: 'high',
    description: 'Express 12001 and Freight 35007 approaching same junction',
    affectedTrains: ['TR001', 'TR003'],
    predictedTime: '14:52',
    suggestedResolution: 'Hold TR003 at WG for 3 minutes',
    status: 'active',
    timestamp: '2024-01-15T14:45:00Z'
  },
  {
    id: 'CF002',
    type: 'platform_conflict',
    severity: 'medium',
    description: 'Platform 3 at East Terminal double-booked',
    affectedTrains: ['TR002', 'TR005'],
    predictedTime: '15:05',
    suggestedResolution: 'Reroute TR005 to Platform 4',
    status: 'monitoring',
    timestamp: '2024-01-15T14:40:00Z'
  },
  {
    id: 'CF003',
    type: 'scheduling_conflict',
    severity: 'low',
    description: 'Minor delay propagation from TR003',
    affectedTrains: ['TR003', 'TR004'],
    predictedTime: '15:15',
    suggestedResolution: 'Adjust TR004 departure by 5 minutes',
    status: 'resolved',
    timestamp: '2024-01-15T14:30:00Z'
  }
];

export const mockOptimizationRuns: OptimizationRun[] = [
  {
    id: 'OR001',
    name: 'Morning Rush Optimization',
    timestamp: '2024-01-15T08:00:00Z',
    status: 'completed',
    parameters: {
      horizon: 120,
      headway: 3,
      objective: 'minimize_total_delay'
    },
    results: {
      totalDelayBefore: 45,
      totalDelayAfter: 28,
      improvement: 37.8,
      throughputBefore: 12,
      throughputAfter: 15
    }
  },
  {
    id: 'OR002',
    name: 'Evening Peak Analysis',
    timestamp: '2024-01-15T18:00:00Z',
    status: 'completed',
    parameters: {
      horizon: 90,
      headway: 2,
      objective: 'maximize_throughput'
    },
    results: {
      totalDelayBefore: 32,
      totalDelayAfter: 18,
      improvement: 43.8,
      throughputBefore: 14,
      throughputAfter: 18
    }
  }
];

// Helper functions
export const getTrainStatusColor = (status: Train['status']) => {
  switch (status) {
    case 'active': return 'bg-success text-success-foreground';
    case 'on_time': return 'bg-primary text-primary-foreground';
    case 'delayed': return 'bg-warning text-warning-foreground';
    case 'stopped': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const getConflictSeverityColor = (severity: Conflict['severity']) => {
  switch (severity) {
    case 'low': return 'bg-muted text-muted-foreground';
    case 'medium': return 'bg-warning text-warning-foreground';
    case 'high': return 'bg-warning text-warning-foreground';
    case 'critical': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

export const calculateKPIs = () => {
  const activeTrains = mockTrains.filter(t => t.status === 'active' || t.status === 'on_time').length;
  const avgDelay = mockTrains.reduce((sum, train) => sum + train.delay, 0) / mockTrains.length;
  const activeConflicts = mockConflicts.filter(c => c.status === 'active').length;
  const systemThroughput = mockTrains.reduce((sum, train) => sum + train.occupancy, 0) / mockTrains.length;

  return {
    activeTrains,
    avgDelay: Math.round(avgDelay * 10) / 10,
    activeConflicts,
    systemThroughput: Math.round(systemThroughput)
  };
};