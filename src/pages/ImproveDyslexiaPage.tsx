
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, BookOpen, Headphones, Target, Play, CheckCircle } from "lucide-react";

const ImproveDyslexiaPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<"mild" | "moderate" | "severe" | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const levelInfo = {
    mild: {
      title: "Mild Dyslexia Activities",
      description: "Gentle exercises to improve reading fluency and comprehension",
      activities: [
        {
          title: "Daily Reading Practice",
          description: "Read 15-20 minutes daily with tracking tools",
          icon: BookOpen
        },
        {
          title: "Letter Recognition Games",
          description: "Practice distinguishing between similar letters",
          icon: Target
        },
        {
          title: "Word Building Exercises",
          description: "Build vocabulary through interactive word games",
          icon: Brain
        }
      ]
    },
    moderate: {
      title: "Moderate Dyslexia Activities", 
      description: "Structured exercises for more focused improvement",
      activities: [
        {
          title: "Phoneme Awareness Training",
          description: "Break down words into component sounds",
          icon: Headphones
        },
        {
          title: "Guided Reading Sessions",
          description: "Structured reading with immediate feedback",
          icon: BookOpen
        },
        {
          title: "Memory Enhancement Games",
          description: "Improve working memory through targeted exercises",
          icon: Brain
        }
      ]
    },
    severe: {
      title: "Severe Dyslexia Activities",
      description: "Intensive multi-sensory learning approaches",
      activities: [
        {
          title: "Multi-Sensory Reading",
          description: "Combine sight, sound, and touch for learning",
          icon: Target
        },
        {
          title: "Audio-First Learning",
          description: "Listen first, then read with text-to-speech support",
          icon: Headphones
        },
        {
          title: "Systematic Phonics Program",
          description: "Structured approach to letter-sound relationships",
          icon: Brain
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <div className="absolute inset-0 -z-10 bg-grid"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      
      <div className="container mx-auto pt-32 pb-20 px-4 md:pt-40 relative z-0">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <AnimatedHeading delay={200} className="text-4xl md:text-5xl font-bold mb-6">
              Improve Your Dyslexia
            </AnimatedHeading>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your level and start with personalized activities designed to help you overcome dyslexia challenges.
            </p>
          </div>

          {!selectedLevel ? (
            <>
              <Card className="mb-8 bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Choose Your Dyslexia Level</h3>
                  <p className="text-muted-foreground mb-4">
                    Everyone experiences dyslexia differently. Select the level that best describes your challenges:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Mild:</strong> You read slowly, mix up letters occasionally, or struggle with spelling — but you manage.</li>
                    <li><strong>Moderate:</strong> You find reading and writing difficult and often avoid reading aloud. Mistakes are frequent.</li>
                    <li><strong>Severe:</strong> Reading feels overwhelming. You often guess words, skip lines, and struggle with basic fluency.</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Not sure? Start with Mild. You can always adjust later.
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {(["mild", "moderate", "severe"] as const).map((level) => (
                  <Card key={level} className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setSelectedLevel(level)}>
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2 capitalize">{level} Dyslexia</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {levelInfo[level].description}
                      </p>
                      <Button className="w-full">Select Level</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold">{levelInfo[selectedLevel].title}</h2>
                  <p className="text-muted-foreground">{levelInfo[selectedLevel].description}</p>
                </div>
                <Button variant="outline" onClick={() => setSelectedLevel(null)}>
                  Change Level
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levelInfo[selectedLevel].activities.map((activity, index) => (
                  <Card key={index} className="glass">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <activity.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{activity.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{activity.description}</p>
                      <Button size="sm" className="gap-2">
                        <Play className="h-4 w-4" />
                        Start Activity
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 rounded-full p-2 bg-green-100 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Daily Practice Tips</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Practice for 10-15 minutes daily rather than long sessions</li>
                        <li>• Use multiple senses - see, hear, and feel the words</li>
                        <li>• Take breaks when you feel frustrated</li>
                        <li>• Celebrate small improvements and progress</li>
                        <li>• Be patient with yourself - improvement takes time</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImproveDyslexiaPage;
