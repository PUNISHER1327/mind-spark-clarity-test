
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Navbar } from "@/components/Navbar";

const Float = ({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) => {
  return (
    <span 
      className={`inline-block animate-float ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
};

const TextWithFloatingChars = ({ text }: { text: string }) => {
  return (
    <div className="relative">
      {text.split('').map((char, i) => (
        <Float key={i} delay={i * 120} className={`${char === ' ' ? 'px-1' : ''}`}>
          {char}
        </Float>
      ))}
    </div>
  );
};

const FloatingLetters = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split('');
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] -z-10">
      {Array.from({ length: 40 }).map((_, i) => {
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        const size = Math.random() * 40 + 10;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 10;
        
        return (
          <div
            key={i}
            className="absolute text-primary font-heading animate-float"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              fontSize: `${size}px`,
              opacity: 0.3,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {randomLetter}
          </div>
        );
      })}
    </div>
  );
};

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar />
      <FloatingLetters />
      
      <div className="absolute inset-0 -z-10 bg-grid"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <section className="container mx-auto pt-32 pb-20 px-4 md:pt-40 md:pb-32 relative z-0">
        <div className={`max-w-4xl mx-auto text-center space-y-6 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium mb-6">
            <TextWithFloatingChars text="Early Screening for Dyslexia" />
          </div>
          
          <AnimatedHeading delay={200} className="text-4xl md:text-6xl font-bold leading-tight">
            Understand Your Mind Better.
            <br />
            <span className="text-primary">Early Clarity on Dyslexia</span> Starts Here.
          </AnimatedHeading>
          
          <AnimatedHeading delay={400} className="text-xl md:text-2xl max-w-2xl mx-auto text-muted-foreground">
            Take short, guided tests that assess key reading, writing, and memory patterns.
          </AnimatedHeading>
          
          <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center items-center" style={{ transitionDelay: '600ms' }}>
            <Button size="lg" className="gap-2 rounded-full px-6 group" asChild>
              <Link to="/tests">
                Start Screening
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-6" asChild>
              <Link to="/about">Learn About Dyslexia</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="bg-card/40 backdrop-blur-sm border rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">1 in 5</h3>
              <p className="text-muted-foreground mt-2">People have signs of dyslexia</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">80%</h3>
              <p className="text-muted-foreground mt-2">Of dyslexics go undiagnosed</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-primary">5 min</h3>
              <p className="text-muted-foreground mt-2">To complete our screening</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
