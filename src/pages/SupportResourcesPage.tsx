
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ReadTextButton, useAccessibility } from "@/components/AccessibilitySettings";
import { Button } from "@/components/ui/button";

const SupportResourcesPage: React.FC = () => {
  const { settings } = useAccessibility();
  const animationsDisabled = settings.disableAnimations;

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
      <div className="flex items-center mb-8">
        <AnimatedHeading className="text-4xl md:text-5xl font-bold mb-2">
          Dyslexia Support Resources
        </AnimatedHeading>
        <ReadTextButton text="Dyslexia Support Resources" className="ml-2" />
      </div>
      
      <p className="text-lg text-muted-foreground mb-8">
        Resources, tools, and techniques to help with dyslexia challenges.
      </p>

      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial={animationsDisabled ? "visible" : "hidden"}
        animate="visible"
      >
        {/* Learning Techniques Section */}
        <motion.section variants={animationsDisabled ? {} : itemVariants}>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            Effective Learning Techniques
            <ReadTextButton text="Effective Learning Techniques" className="ml-2" />
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="multisensory">
              <AccordionTrigger>Multisensory Learning</AccordionTrigger>
              <AccordionContent>
                <p>Engage multiple senses simultaneously while learning. Combine visual, auditory, and kinesthetic approaches by reading aloud, using colored markers, tracing letters with your finger, or using tactile materials.</p>
                <ReadTextButton 
                  text="Engage multiple senses simultaneously while learning. Combine visual, auditory, and kinesthetic approaches by reading aloud, using colored markers, tracing letters with your finger, or using tactile materials."
                  className="mt-2" 
                />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="chunking">
              <AccordionTrigger>Chunking Information</AccordionTrigger>
              <AccordionContent>
                <p>Break down complex information into smaller, manageable chunks. Focus on learning and mastering one section before moving to the next. Use bulleted lists and mind maps to organize information visually.</p>
                <ReadTextButton 
                  text="Break down complex information into smaller, manageable chunks. Focus on learning and mastering one section before moving to the next. Use bulleted lists and mind maps to organize information visually."
                  className="mt-2" 
                />
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="overlearning">
              <AccordionTrigger>Overlearning Technique</AccordionTrigger>
              <AccordionContent>
                <p>Practice beyond the point of initial mastery. Repetition strengthens neural pathways and improves retention. Continue practicing even after you think you've learned the material to make recall more automatic.</p>
                <ReadTextButton 
                  text="Practice beyond the point of initial mastery. Repetition strengthens neural pathways and improves retention. Continue practicing even after you think you've learned the material to make recall more automatic."
                  className="mt-2" 
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.section>
        
        {/* Helpful Apps Section */}
        <motion.section variants={animationsDisabled ? {} : itemVariants}>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            Recommended Tools & Apps
            <ReadTextButton text="Recommended Tools and Apps" className="ml-2" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Grammarly",
                description: "AI-powered writing assistant that helps catch spelling and grammar errors.",
                link: "https://www.grammarly.com"
              },
              {
                title: "Voice Dream Reader",
                description: "Text-to-speech app that reads documents, articles, and books aloud.",
                link: "https://www.voicedream.com"
              },
              {
                title: "Speechify",
                description: "Turns any text into natural-sounding speech, works across devices.",
                link: "https://speechify.com"
              },
              {
                title: "Microsoft Immersive Reader",
                description: "Improves reading comprehension with features like line focus and syllable highlighting.",
                link: "https://www.microsoft.com/en-us/education/products/learning-tools"
              }
            ].map((tool, index) => (
              <Card key={index} className="h-full hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Visit <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.section>
        
        {/* Professional Resources Section */}
        <motion.section variants={animationsDisabled ? {} : itemVariants}>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            Professional Resources
            <ReadTextButton text="Professional Resources" className="ml-2" />
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "International Dyslexia Association (IDA)",
                description: "Provides resources, advocacy, and research on dyslexia.",
                link: "https://dyslexiaida.org"
              },
              {
                title: "British Dyslexia Association (BDA)",
                description: "Support, assessment information, and resources for dyslexic individuals.",
                link: "https://www.bdadyslexia.org.uk"
              },
              {
                title: "Reddit - r/Dyslexia",
                description: "Online community for dyslexic individuals to share experiences and advice.",
                link: "https://www.reddit.com/r/Dyslexia/"
              },
              {
                title: "Understood.org",
                description: "Information and resources for learning differences and attention issues.",
                link: "https://www.understood.org"
              }
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-all">
                <CardHeader>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Visit Resource <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </motion.section>
        
        {/* Emotional Support Tips */}
        <motion.section variants={animationsDisabled ? {} : itemVariants}>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            Emotional Support Tips
            <ReadTextButton text="Emotional Support Tips" className="ml-2" />
          </h2>
          
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Remember that dyslexia affects how you process information, not your intelligence</p>
                    <p className="text-muted-foreground mt-1">Many brilliant and successful people have dyslexia. It's just a different way your brain works.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Connect with others who have dyslexia</p>
                    <p className="text-muted-foreground mt-1">Joining support groups or online communities can provide emotional support and practical advice.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Focus on your strengths</p>
                    <p className="text-muted-foreground mt-1">People with dyslexia often excel in creative thinking, problem-solving, and visual-spatial skills.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/20 p-2 rounded-full mr-3 mt-1">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Be patient with yourself</p>
                    <p className="text-muted-foreground mt-1">Learning may take more time and effort, but with the right strategies, you can achieve your goals.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default SupportResourcesPage;
