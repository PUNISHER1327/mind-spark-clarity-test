import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings, Volume2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type AccessibilitySettings = {
  dyslexicFont: boolean;
  largeText: boolean;
  lineSpacing: boolean;
  backgroundTheme: "default" | "sepia" | "soft-blue" | "soft-gray";
  disableAnimations: boolean;
  readingRuler: boolean;
  textToSpeech: boolean;
};

const defaultSettings: AccessibilitySettings = {
  dyslexicFont: false,
  largeText: false,
  lineSpacing: false,
  backgroundTheme: "default",
  disableAnimations: false,
  readingRuler: false,
  textToSpeech: false,
};

export const AccessibilityContext = React.createContext<{
  settings: AccessibilitySettings;
  updateSettings: (settings: Partial<AccessibilitySettings>) => void;
  readText: (text: string) => void;
  stopReading: () => void;
  rulerHeight: number;
  updateRulerHeight: (height: number) => void;
  isReading: boolean;
  readTextUnderRuler: () => void;
}>({
  settings: defaultSettings,
  updateSettings: () => {},
  readText: () => {},
  stopReading: () => {},
  rulerHeight: 60,
  updateRulerHeight: () => {},
  isReading: false,
  readTextUnderRuler: () => {},
});

export const useAccessibility = () => React.useContext(AccessibilityContext);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [rulerHeight, setRulerHeight] = useState(60);
  const [isReading, setIsReading] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [rulerPosition, setRulerPosition] = useState(300);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibilitySettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const savedRulerHeight = localStorage.getItem("rulerHeight");
    if (savedRulerHeight) {
      setRulerHeight(parseInt(savedRulerHeight, 10));
    }

    // Initialize Web Speech API
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }

    // Apply initial settings to document
    applySettingsToDocument(savedSettings ? JSON.parse(savedSettings) : defaultSettings);
  }, []);

  // Save settings to localStorage and apply to document on change
  useEffect(() => {
    localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
    applySettingsToDocument(settings);
  }, [settings]);

  // Save ruler height to localStorage
  useEffect(() => {
    localStorage.setItem("rulerHeight", rulerHeight.toString());
  }, [rulerHeight]);

  // Apply settings to document
  const applySettingsToDocument = (currentSettings: AccessibilitySettings) => {
    const root = document.documentElement;

    // Font family
    if (currentSettings.dyslexicFont) {
      root.style.setProperty("--font-sans", "'OpenDyslexic', sans-serif");
    } else {
      root.style.setProperty("--font-sans", "'Inter', sans-serif");
    }

    // Background theme
    const body = document.body;
    body.classList.remove("bg-sepia", "bg-soft-blue", "bg-soft-gray");
    switch (currentSettings.backgroundTheme) {
      case "sepia":
        body.classList.add("bg-sepia");
        break;
      case "soft-blue":
        body.classList.add("bg-soft-blue");
        break;
      case "soft-gray":
        body.classList.add("bg-soft-gray");
        break;
      default:
        // Use default theme
        break;
    }

    // Text size
    if (currentSettings.largeText) {
      root.classList.add("large-text");
    } else {
      root.classList.remove("large-text");
    }

    // Line spacing
    if (currentSettings.lineSpacing) {
      root.classList.add("increased-line-spacing");
    } else {
      root.classList.remove("increased-line-spacing");
    }
  };

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateRulerHeight = (height: number) => {
    setRulerHeight(height);
  };

  const readText = (text: string) => {
    if (speechSynthesis && settings.textToSpeech) {
      // Stop any current reading
      stopReading();
      
      // Create new utterance
      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.rate = 0.8; // Slower rate for dyslexic users
      newUtterance.pitch = 1;
      newUtterance.volume = 1;
      
      setUtterance(newUtterance);
      setIsReading(true);
      
      // Set up event handlers
      newUtterance.onend = () => {
        setIsReading(false);
      };
      
      newUtterance.onerror = () => {
        setIsReading(false);
        console.error("Speech synthesis error");
      };
      
      // Start speaking
      speechSynthesis.speak(newUtterance);
    }
  };

  const stopReading = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  const readTextUnderRuler = () => {
    if (!settings.textToSpeech || !settings.readingRuler) return;

    // Get all text elements at the ruler position
    const elements = document.elementsFromPoint(window.innerWidth / 2, rulerPosition);
    let textToRead = "";

    for (const element of elements) {
      if (element.textContent && element.textContent.trim()) {
        // Extract text from the line under the ruler
        const rect = element.getBoundingClientRect();
        if (rect.top <= rulerPosition && rect.bottom >= rulerPosition) {
          textToRead = element.textContent.trim();
          break;
        }
      }
    }

    if (textToRead) {
      readText(textToRead);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSettings,
        readText,
        stopReading,
        rulerHeight,
        updateRulerHeight,
        isReading,
        readTextUnderRuler,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const AccessibilitySettings = () => {
  const { settings, updateSettings, rulerHeight, updateRulerHeight } = useAccessibility();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed right-4 bottom-4 z-50 rounded-full h-10 w-10"
          aria-label="Accessibility settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Accessibility Settings</DrawerTitle>
            <DrawerDescription>
              Customize your reading experience to match your needs.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dyslexic-font">Dyslexia-friendly font</Label>
                    <p className="text-sm text-muted-foreground">
                      Use OpenDyslexic font
                    </p>
                  </div>
                  <Switch
                    id="dyslexic-font"
                    checked={settings.dyslexicFont}
                    onCheckedChange={(checked) =>
                      updateSettings({ dyslexicFont: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="large-text">Larger text size</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase the base font size
                    </p>
                  </div>
                  <Switch
                    id="large-text"
                    checked={settings.largeText}
                    onCheckedChange={(checked) =>
                      updateSettings({ largeText: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="line-spacing">Increased line spacing</Label>
                    <p className="text-sm text-muted-foreground">
                      Add more space between lines
                    </p>
                  </div>
                  <Switch
                    id="line-spacing"
                    checked={settings.lineSpacing}
                    onCheckedChange={(checked) =>
                      updateSettings({ lineSpacing: checked })
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Background theme</Label>
                  <ToggleGroup
                    type="single"
                    value={settings.backgroundTheme}
                    onValueChange={(value) =>
                      updateSettings({ backgroundTheme: value as AccessibilitySettings["backgroundTheme"] })
                    }
                    className="justify-between"
                  >
                    <ToggleGroupItem value="default" aria-label="Default background">
                      <div className="h-6 w-6 rounded-full bg-background border"></div>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="sepia" aria-label="Sepia background">
                      <div className="h-6 w-6 rounded-full bg-[#fcefc7]"></div>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="soft-blue" aria-label="Soft blue background">
                      <div className="h-6 w-6 rounded-full bg-[#d3e4fd]"></div>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="soft-gray" aria-label="Soft gray background">
                      <div className="h-6 w-6 rounded-full bg-[#f1f0fb]"></div>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="disable-animations">Disable animations</Label>
                    <p className="text-sm text-muted-foreground">
                      For motion sensitivity
                    </p>
                  </div>
                  <Switch
                    id="disable-animations"
                    checked={settings.disableAnimations}
                    onCheckedChange={(checked) =>
                      updateSettings({ disableAnimations: checked })
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reading-ruler">Reading ruler</Label>
                    <p className="text-sm text-muted-foreground">
                      Highlight the line you're reading
                    </p>
                  </div>
                  <Switch
                    id="reading-ruler"
                    checked={settings.readingRuler}
                    onCheckedChange={(checked) =>
                      updateSettings({ readingRuler: checked })
                    }
                  />
                </div>
                
                {settings.readingRuler && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="ruler-height">Ruler height</Label>
                      <span className="text-sm text-muted-foreground">
                        {rulerHeight}px
                      </span>
                    </div>
                    <Slider
                      id="ruler-height"
                      min={20}
                      max={100}
                      step={5}
                      value={[rulerHeight]}
                      onValueChange={(values) => updateRulerHeight(values[0])}
                      className="w-full"
                    />
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="text-to-speech">Text to speech</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable reading content aloud
                    </p>
                  </div>
                  <Switch
                    id="text-to-speech"
                    checked={settings.textToSpeech}
                    onCheckedChange={(checked) =>
                      updateSettings({ textToSpeech: checked })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const ReadingRuler = () => {
  const { settings, rulerHeight, readTextUnderRuler } = useAccessibility();
  const [position, setPosition] = useState(300);

  useEffect(() => {
    if (!settings.readingRuler) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition(e.clientY);
    };

    const handleClick = () => {
      if (settings.textToSpeech) {
        readTextUnderRuler();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [settings.readingRuler, settings.textToSpeech, readTextUnderRuler]);

  if (!settings.readingRuler) return null;

  return (
    <motion.div
      className="fixed left-0 w-full z-40 pointer-events-none bg-primary/10 cursor-pointer"
      style={{
        height: rulerHeight,
        top: position - rulerHeight / 2,
      }}
      animate={{
        top: position - rulerHeight / 2,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    />
  );
};

export const ReadTextButton: React.FC<{ text: string; className?: string }> = ({ 
  text, 
  className
}) => {
  const { settings, readText, stopReading, isReading } = useAccessibility();
  
  if (!settings.textToSpeech) return null;
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("text-muted-foreground hover:text-foreground", className, {
        "animate-pulse": isReading,
      })}
      onClick={() => {
        if (isReading) {
          stopReading();
        } else {
          readText(text);
        }
      }}
      aria-label={isReading ? "Stop reading" : "Read text aloud"}
    >
      <Volume2 className="h-4 w-4" />
    </Button>
  );
};
