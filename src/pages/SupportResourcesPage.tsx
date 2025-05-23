
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Phone, Mail, ExternalLink, Heart, Brain, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const SupportResourcesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const resources = [
    {
      title: "Educational Resources",
      icon: BookOpen,
      items: [
        "Understanding Dyslexia: Complete Guide",
        "Teaching Strategies for Dyslexic Students",
        "Assistive Technology Tools",
        "Reading Comprehension Techniques"
      ]
    },
    {
      title: "Support Communities",
      icon: Users,
      items: [
        "Dyslexia Support Groups",
        "Parent Networks",
        "Student Forums",
        "Professional Educator Communities"
      ]
    },
    {
      title: "Professional Help",
      icon: Brain,
      items: [
        "Find Educational Psychologists",
        "Specialized Tutors Directory",
        "Speech Therapy Services",
        "Learning Disability Assessment Centers"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <div className="absolute inset-0 -z-10 bg-grid"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      
      <div className="container mx-auto pt-32 pb-20 px-4 md:pt-40 relative z-0">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <AnimatedHeading delay={200} className="text-4xl md:text-5xl font-bold mb-6">
              Support & Resources
            </AnimatedHeading>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find comprehensive support, educational resources, and professional help for dyslexia management and improvement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {resources.map((resource, index) => (
              <Card key={index} className="glass">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <resource.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{resource.title}</h3>
                  <ul className="space-y-2">
                    {resource.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 rounded-full p-2 bg-blue-100 text-blue-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">24/7 Support Hotline</h3>
                    <p className="text-muted-foreground mb-4">
                      Get immediate support and guidance from trained professionals.
                    </p>
                    <p className="font-medium">1-800-DYSLEXIA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 rounded-full p-2 bg-green-100 text-green-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email Support</h3>
                    <p className="text-muted-foreground mb-4">
                      Reach out with questions or concerns via email.
                    </p>
                    <p className="font-medium">support@dyslexiatest.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="gap-2 rounded-full px-6" asChild>
              <Link to="/improve">
                Start Improvement Activities
                <Lightbulb className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportResourcesPage;
