
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { TestCard } from "@/components/TestCard";
import { BookOpen, Eye, Clock, List, Search } from "lucide-react";

const Tests = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tests = [
    {
      title: "Reading Fluency",
      description: "Assess how quickly and accurately you can read text passages",
      icon: <BookOpen className="h-5 w-5" />,
      link: "/reading-test"
    },
    {
      title: "Phonological Awareness",
      description: "Test your ability to identify and manipulate sounds in words",
      icon: <Eye className="h-5 w-5" />,
      link: "/phonological-test"
    },
    {
      title: "Working Memory",
      description: "Measure your capacity to hold and manipulate information",
      icon: <Clock className="h-5 w-5" />,
      link: "/memory-test"
    },
    {
      title: "Sequencing",
      description: "Evaluate your ability to arrange items in the correct order",
      icon: <List className="h-5 w-5" />,
      link: "/sequencing-test"
    },
    {
      title: "Spelling & Writing",
      description: "Check your spelling skills and writing abilities",
      icon: <Search className="h-5 w-5" />,
      link: "/spelling-test"
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <div className="absolute inset-0 -z-10 bg-grid"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      
      <div className="container mx-auto pt-40 pb-20 px-4 md:pt-48 relative z-0">
        <div className={`max-w-5xl mx-auto text-center space-y-6 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <AnimatedHeading delay={200} className="text-4xl md:text-5xl font-bold mb-8">
            Dyslexia Screening Tests
          </AnimatedHeading>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Select one of our screening tests below. Each test takes approximately 3-5 minutes to complete and provides immediate feedback.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test, i) => (
              <div 
                key={i} 
                className="opacity-0 animate-fade-in"
                style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: 'forwards' }}
              >
                <TestCard
                  title={test.title}
                  description={test.description}
                  icon={test.icon}
                  link={test.link}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-16 p-6 md:p-8 bg-card rounded-xl border shadow-sm">
            <div className="grid md:grid-cols-[1fr_2fr] gap-6">
              <div className="flex items-center justify-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">How these tests work</h3>
                <p className="text-muted-foreground">
                  Our screening tests are designed to identify potential signs of dyslexia by measuring key 
                  skills like reading fluency, phonological awareness, and working memory. These tests are not 
                  diagnostic but can help you understand if you might benefit from a professional assessment.
                </p>
                <div className="mt-4 text-sm text-muted-foreground/80">
                  <strong>Note:</strong> These screenings are not a substitute for a formal evaluation by a qualified professional.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tests;
