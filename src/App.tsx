
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Tests from "./pages/Tests";
import ReadingTest from "./pages/ReadingTest";
import PhonologicalTest from "./pages/PhonologicalTest";
import MemoryTest from "./pages/MemoryTest";
import SequencingTest from "./pages/SequencingTest";
import SpellingTest from "./pages/SpellingTest";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import SupportResourcesPage from "./pages/SupportResourcesPage";
import ImproveDyslexiaPage from "./pages/ImproveDyslexiaPage";
import { 
  AccessibilityProvider, 
  AccessibilitySettings
} from "./components/AccessibilitySettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AccessibilitySettings />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/reading-test" element={<ReadingTest />} />
            <Route path="/phonological-test" element={<PhonologicalTest />} />
            <Route path="/memory-test" element={<MemoryTest />} />
            <Route path="/sequencing-test" element={<SequencingTest />} />
            <Route path="/spelling-test" element={<SpellingTest />} />
            <Route path="/results" element={<Results />} />
            <Route path="/support" element={<SupportResourcesPage />} />
            <Route path="/improve" element={<ImproveDyslexiaPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
