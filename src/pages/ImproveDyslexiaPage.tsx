
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { DyslexiaLevelSelector } from "@/components/dyslexia-improvement/DyslexiaLevelSelector";
import { LevelInstructionCard } from "@/components/dyslexia-improvement/LevelInstructionCard";
import { ImprovementActivities } from "@/components/dyslexia-improvement/ImprovementActivities";
import { ReadTextButton, useAccessibility } from "@/components/AccessibilitySettings";

export type DyslexiaLevel = "mild" | "moderate" | "severe" | null;

const ImproveDyslexiaPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<DyslexiaLevel>(null);
  const { settings } = useAccessibility();
  const animationsDisabled = settings.disableAnimations;

  // Load selected level from localStorage on mount
  useEffect(() => {
    const savedLevel = localStorage.getItem("dyslexiaLevel");
    if (savedLevel && ["mild", "moderate", "severe"].includes(savedLevel)) {
      setSelectedLevel(savedLevel as DyslexiaLevel);
    }
  }, []);

  // Save selected level to localStorage when it changes
  useEffect(() => {
    if (selectedLevel) {
      localStorage.setItem("dyslexiaLevel", selectedLevel);
    }
  }, [selectedLevel]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center mb-2">
        <AnimatedHeading className="text-4xl md:text-5xl font-bold">
          Improve Your Dyslexia
        </AnimatedHeading>
        <ReadTextButton text="Improve Your Dyslexia" className="ml-2" />
      </div>
      
      <p className="text-lg text-muted-foreground mb-8">
        Personalized strategies and activities to help you manage dyslexia challenges.
      </p>

      <motion.div 
        className="space-y-10"
        variants={containerVariants}
        initial={animationsDisabled ? "visible" : "hidden"}
        animate="visible"
      >
        {/* Level Instructions */}
        <motion.section variants={animationsDisabled ? {} : itemVariants}>
          <LevelInstructionCard />
        </motion.section>

        {/* Level Selector */}
        <motion.section variants={animationsDisabled ? {} : itemVariants}>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            Select Your Level
            <ReadTextButton text="Select Your Level" className="ml-2" />
          </h2>
          <DyslexiaLevelSelector 
            selectedLevel={selectedLevel} 
            onSelectLevel={setSelectedLevel} 
          />
        </motion.section>

        {/* Improvement Activities */}
        {selectedLevel && (
          <motion.section
            variants={animationsDisabled ? {} : itemVariants}
            initial={animationsDisabled ? "visible" : "hidden"}
            animate="visible"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                Personalized Activities
                <ReadTextButton text="Personalized Activities" className="ml-2" />
              </h2>
              <button 
                onClick={() => setSelectedLevel(null)}
                className="text-sm font-medium text-primary underline hover:text-primary/80"
              >
                Change Level
              </button>
            </div>
            <ImprovementActivities level={selectedLevel} />
          </motion.section>
        )}
      </motion.div>
    </div>
  );
};

export default ImproveDyslexiaPage;
