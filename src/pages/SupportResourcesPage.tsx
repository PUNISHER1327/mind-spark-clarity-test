
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Phone, Mail, ExternalLink, Heart, Brain, Lightbulb, Download, Globe, Smartphone, Headphones, MonitorSpeaker, Calculator, PenTool, Video } from "lucide-react";

const SupportResourcesPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const assistiveTechTools = [
    {
      title: "Text-to-Speech Software",
      items: [
        "NaturalReader - Free and premium versions",
        "Voice Dream Reader - Mobile app",
        "Read&Write by Texthelp",
        "Kurzweil 3000 - Comprehensive reading support"
      ],
      icon: Headphones
    },
    {
      title: "Reading & Writing Apps",
      items: [
        "Ginger Software - Grammar and spell checker",
        "Grammarly - Writing assistant",
        "Dragon NaturallySpeaking - Speech recognition",
        "Co:Writer - Word prediction software"
      ],
      icon: PenTool
    },
    {
      title: "Learning Platforms",
      items: [
        "Nessy - Dyslexia learning program",
        "Reading Eggs - Interactive reading lessons",
        "Lexia Core5 Reading - Evidence-based program",
        "Wilson Reading System - Structured literacy"
      ],
      icon: MonitorSpeaker
    }
  ];

  const educationalResources = [
    {
      title: "Online Learning",
      items: [
        "Khan Academy - Free educational videos",
        "Coursera - University courses with accessibility",
        "Udemy - Practical skill courses",
        "EdX - Academic courses from top universities"
      ],
      icon: Video
    },
    {
      title: "Research & Information",
      items: [
        "International Dyslexia Association (IDA)",
        "British Dyslexia Association",
        "Dyslexia Research Institute",
        "Yale Center for Dyslexia & Creativity"
      ],
      icon: BookOpen
    },
    {
      title: "Mobile Apps",
      items: [
        "ModMath - Graph paper for math",
        "Prizmo 4 - OCR text recognition",
        "Voice Recorder & Audio Editor",
        "Mind Mapping apps (SimpleMind, MindMeister)"
      ],
      icon: Smartphone
    }
  ];

  const supportCommunities = [
    {
      title: "Online Communities",
      items: [
        "Reddit r/Dyslexia community",
        "Facebook Dyslexia Support Groups",
        "Dyslexia Parents & Students Facebook Group",
        "LinkedIn Dyslexia Professional Network"
      ],
      icon: Users
    },
    {
      title: "Local Organizations",
      items: [
        "Learning Disabilities Association",
        "Decoding Dyslexia chapters",
        "Local library literacy programs",
        "University disability services"
      ],
      icon: Heart
    },
    {
      title: "Professional Networks",
      items: [
        "International Dyslexia Association chapters",
        "Academic Language Therapy Association",
        "Wilson Language Training",
        "Orton-Gillingham practitioner networks"
      ],
      icon: Brain
    }
  ];

  const accommodationResources = [
    {
      title: "Workplace Accommodations",
      description: "Know your rights and available accommodations in the workplace",
      items: [
        "Extended time for tasks and deadlines",
        "Alternative formats for documents",
        "Assistive technology provision",
        "Flexible work arrangements",
        "Written instructions instead of verbal",
        "Noise-cancelling headphones"
      ]
    },
    {
      title: "Educational Accommodations",
      description: "Accommodations available in schools and universities",
      items: [
        "Extended time on tests and exams",
        "Alternative testing formats",
        "Note-taking assistance",
        "Audio versions of textbooks",
        "Use of spell-checkers and calculators",
        "Preferential seating arrangements"
      ]
    }
  ];

  const helplines = [
    {
      title: "24/7 Dyslexia Support Hotline",
      phone: "1-800-DYSLEXIA",
      description: "Get immediate support and guidance from trained professionals",
      icon: Phone,
      color: "blue"
    },
    {
      title: "Educational Advocacy Line",
      phone: "1-855-323-4636",
      description: "Help with school accommodations and IEP/504 plans",
      icon: BookOpen,
      color: "green"
    },
    {
      title: "Crisis Support Line",
      phone: "988",
      description: "Mental health support for learning challenges",
      icon: Heart,
      color: "red"
    }
  ];

  const downloadableResources = [
    "Dyslexia Accommodation Request Letter Template",
    "IEP/504 Plan Checklist for Parents",
    "Workplace Rights and Accommodations Guide",
    "College Application Disclosure Guide",
    "Study Strategies for Dyslexic Students",
    "Technology Setup Guide for Reading Support"
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <div className="absolute inset-0 -z-10 bg-grid"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      
      <div className="container mx-auto pt-32 pb-20 px-4 md:pt-40 relative z-0">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <AnimatedHeading delay={200} className="text-4xl md:text-5xl font-bold mb-6">
              Dyslexia Support & Resources
            </AnimatedHeading>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive resources, tools, and support networks to help individuals with dyslexia thrive in education, work, and daily life.
            </p>
          </div>

          {/* Emergency Helplines */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {helplines.map((helpline, index) => (
              <Card key={index} className={`border-l-4 border-l-${helpline.color}-500`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 rounded-full p-2 bg-${helpline.color}-100 text-${helpline.color}-600`}>
                      <helpline.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{helpline.title}</h3>
                      <p className="text-2xl font-bold mb-2">{helpline.phone}</p>
                      <p className="text-sm text-muted-foreground">
                        {helpline.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Assistive Technology Tools */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Assistive Technology Tools</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {assistiveTechTools.map((category, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Educational Resources */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Educational Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {educationalResources.map((resource, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{resource.title}</h3>
                    <ul className="space-y-2">
                      {resource.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Support Communities */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Support Communities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {supportCommunities.map((community, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <community.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{community.title}</h3>
                    <ul className="space-y-2">
                      {community.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Accommodations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Accommodation Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {accommodationResources.map((accommodation, index) => (
                <Card key={index} className="glass">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{accommodation.title}</h3>
                    <p className="text-muted-foreground mb-4">{accommodation.description}</p>
                    <ul className="space-y-2">
                      {accommodation.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Downloadable Resources */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Downloadable Resources</h3>
                  <p className="text-muted-foreground">Free templates and guides to help you navigate dyslexia support</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {downloadableResources.map((resource, index) => (
                  <Button key={index} variant="outline" className="h-auto p-4 text-left justify-start gap-2">
                    <Download className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{resource}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Important Websites */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Essential Websites</h3>
                  <p className="text-muted-foreground">Key online resources for dyslexia information and support</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "International Dyslexia Association - dyslexiaida.org",
                  "British Dyslexia Association - bdadyslexia.org.uk",
                  "Understood.org - For learning and thinking differences",
                  "Learning Disabilities Association - ldaamerica.org",
                  "Dyslexia Help at University of Michigan - dyslexiahelp.umich.edu",
                  "Yale Center for Dyslexia & Creativity - dyslexia.yale.edu"
                ].map((website, index) => (
                  <Button key={index} variant="outline" className="h-auto p-4 text-left justify-start gap-2">
                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{website}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Card className="inline-block">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Need More Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Can't find what you're looking for? Contact our support team for personalized assistance.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email Support
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportResourcesPage;
