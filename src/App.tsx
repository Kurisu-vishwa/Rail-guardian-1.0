import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import UploadData from "./pages/UploadData";
import ScheduleOptimizer from "./pages/ScheduleOptimizer";
import ConflictAlerts from "./pages/ConflictAlerts";
import DelayPrediction from "./pages/DelayPrediction";
import Rerouting from "./pages/Rerouting";
import RunHistory from "./pages/RunHistory";
import AdminSettings from "./pages/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/upload" element={<UploadData />} />
            <Route path="/optimizer" element={<ScheduleOptimizer />} />
            <Route path="/conflicts" element={<ConflictAlerts />} />
            <Route path="/prediction" element={<DelayPrediction />} />
            <Route path="/rerouting" element={<Rerouting />} />
            <Route path="/history" element={<RunHistory />} />
            <Route path="/admin" element={<AdminSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
