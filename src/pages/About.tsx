
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Book, Clock, Search } from "lucide-react";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = (offset: number) => {
    return {
      transform: `translateY(${scrollY * offset}px)`,
    };
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-16 px-4 relative z-0">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedHeading delay={100} className="text-4xl md:text-5xl font-bold mb-6">
              Understanding <span className="text-primary">Dyslexia</span>
            </AnimatedHeading>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dyslexia is a learning difference that primarily affects reading, writing, and spelling skills.
              It's not related to intelligence and can appear alongside many strengths.
            </p>
          </div>
          
          <div className="grid gap-12 md:gap-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <AnimatedHeading delay={200} showOnScroll>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">What is Dyslexia?</h2>
                </AnimatedHeading>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Dyslexia is a learning difference that affects how the brain processes written and sometimes spoken language. 
                    It's not caused by vision problems or lack of intelligence. In fact, many people with dyslexia have average or above-average intelligence.
                  </p>
                  <p>
                    People with dyslexia often have difficulty with phonological awareness (the ability to recognize and work with the sounds of speech), 
                    which affects how they learn to read and spell.
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2" style={parallaxOffset(0.05)}>
                <Card className="glass overflow-hidden border-0 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-30"></div>
                  <CardHeader>
                    <CardTitle>Common Signs</CardTitle>
                    <CardDescription>Signs that might indicate dyslexia</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="bg-background/40 p-3 rounded-md">
                      Difficulty sounding out words
                    </div>
                    <div className="bg-background/40 p-3 rounded-md">
                      Trouble with reading comprehension
                    </div>
                    <div className="bg-background/40 p-3 rounded-md">
                      Spelling inconsistencies
                    </div>
                    <div className="bg-background/40 p-3 rounded-md">
                      Delayed speech development
                    </div>
                    <div className="bg-background/40 p-3 rounded-md">
                      Difficulty with sequences
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div style={parallaxOffset(0.03)}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/5 rounded-2xl -z-10"></div>
                  <div className="grid grid-cols-2 gap-4">
                    {["Reading", "Memory", "Processing", "Focus"].map((item, i) => (
                      <div key={i} className="bg-card p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center min-h-[120px]">
                        <div className="text-lg font-semibold mb-1">{item}</div>
                        <div className="text-sm text-muted-foreground">
                          Affected Area
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <AnimatedHeading delay={200} showOnScroll>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Dyslexia Affects</h2>
                </AnimatedHeading>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Dyslexia primarily affects reading fluency and comprehension. People with dyslexia may read 
                    slowly or need to re-read material multiple times to understand it.
                  </p>
                  <p>
                    It can also impact working memory, making it difficult to follow multi-step instructions or remember 
                    sequences like the months of the year or the alphabet.
                  </p>
                  <p>
                    While dyslexia creates challenges, many individuals develop strong problem-solving skills and creative thinking abilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <AnimatedHeading delay={100} className="text-2xl md:text-3xl font-bold mb-6">
              Helpful Resources
            </AnimatedHeading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <ResourceCard 
                title="International Dyslexia Association"
                description="Research-based information and support"
                icon={<BookOpen className="h-5 w-5" />}
                link="https://dyslexiaida.org/"
              />
              <ResourceCard 
                title="Understood.org"
                description="Resources for learning differences"
                icon={<Book className="h-5 w-5" />}
                link="https://www.understood.org/"
              />
              <ResourceCard 
                title="Yale Center for Dyslexia"
                description="Latest research and interventions"
                icon={<Search className="h-5 w-5" />}
                link="https://dyslexia.yale.edu/"
              />
              <ResourceCard 
                title="Made By Dyslexia"
                description="Changing perceptions of dyslexia"
                icon={<Clock className="h-5 w-5" />}
                link="https://www.madebydyslexia.org/"
              />
            </div>
          </div>
          
          <div className="mt-20 bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take a Screening Test?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Our screening tests can help identify if you or someone you know might have traits associated with dyslexia.
            </p>
            <Button size="lg" className="gap-2 rounded-full px-6" asChild>
              <Link to="/tests">
                Start Screening
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({ title, description, icon, link }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  link: string;
}) => {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noreferrer" 
      className="group"
    >
      <Card className="card-hover h-full">
        <CardHeader className="pb-2">
          <div className="bg-primary/10 text-primary rounded-full p-2 w-8 h-8 flex items-center justify-center">
            {icon}
          </div>
          <CardTitle className="text-base mt-2">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className="text-xs font-medium text-primary flex items-center gap-1">
            Visit Website
            <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
          </span>
        </CardContent>
      </Card>
    </a>
  );
};

export default About;
