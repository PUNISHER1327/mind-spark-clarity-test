
import React from "react";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ReadTextButton, useAccessibility } from "@/components/AccessibilitySettings";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, BookOpen, MessageSquare, HeartHandshake, Lightbulb, BookText, School, Globe } from "lucide-react";

const SupportResourcesPage: React.FC = () => {
  const { settings } = useAccessibility();
  const animationsDisabled = settings.disableAnimations;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Resource card component
  const ResourceCard = ({ 
    title, 
    description, 
    icon: Icon, 
    links 
  }: { 
    title: string; 
    description: string; 
    icon: any; 
    links: { text: string; url: string }[] 
  }) => (
    <motion.div variants={animationsDisabled ? {} : itemVariants}>
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-start">
            <div className="bg-primary/10 p-2 rounded-full mr-4">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="mt-2">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {links.map((link, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="w-full justify-between"
                asChild
              >
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <span>{link.text}</span>
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <AnimatedHeading className="text-4xl font-bold mb-4">
          Dyslexia Support Resources
        </AnimatedHeading>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We've gathered helpful resources to support your journey with dyslexia. 
          Whether you're looking for information, tools, or community support, 
          you'll find valuable guidance here.
        </p>
      </div>

      <Tabs defaultValue="educational" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="educational">Educational</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="tools">Tools & Apps</TabsTrigger>
          <TabsTrigger value="professional">Professional Help</TabsTrigger>
        </TabsList>

        <TabsContent value="educational">
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial={animationsDisabled ? "visible" : "hidden"}
            animate="visible"
          >
            <ResourceCard
              title="Understanding Dyslexia"
              description="Comprehensive guides to help you understand dyslexia and how it affects learning."
              icon={BookOpen}
              links={[
                { text: "International Dyslexia Association", url: "https://dyslexiaida.org/" },
                { text: "Yale Center for Dyslexia", url: "https://dyslexia.yale.edu/" },
                { text: "Understood.org's Dyslexia Guide", url: "https://www.understood.org/en/learning-thinking-differences/child-learning-disabilities/dyslexia/understanding-dyslexia" }
              ]}
            />

            <ResourceCard
              title="Educational Strategies"
              description="Evidence-based approaches to support learning for people with dyslexia."
              icon={School}
              links={[
                { text: "Orton-Gillingham Approach", url: "https://www.ortonacademy.org/resources/what-is-the-orton-gillingham-approach/" },
                { text: "Reading Rockets Dyslexia Resources", url: "https://www.readingrockets.org/reading-topics/dyslexia" },
                { text: "Structured Literacy Explained", url: "https://dyslexiaida.org/what-is-structured-literacy/" }
              ]}
            />

            <ResourceCard
              title="Research & Articles"
              description="Stay updated with the latest research and findings in dyslexia studies."
              icon={BookText}
              links={[
                { text: "Dyslexia Research Institute", url: "https://www.dyslexia-research-institute.org/" },
                { text: "Science Daily: Dyslexia News", url: "https://www.sciencedaily.com/news/mind_brain/dyslexia/" },
                { text: "Journal of Learning Disabilities", url: "https://journals.sagepub.com/home/ldx" }
              ]}
            />

            <ResourceCard
              title="Success Stories"
              description="Inspirational stories of well-known individuals who have thrived with dyslexia."
              icon={Lightbulb}
              links={[
                { text: "Made By Dyslexia", url: "https://www.madebydyslexia.org/" },
                { text: "Famous People with Dyslexia", url: "https://dyslexia.yale.edu/dyslexia/famous-people-with-dyslexia/" },
                { text: "Dyslexic Advantage Profiles", url: "https://www.dyslexicadvantage.org/category/dyslexic-profiles/" }
              ]}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="communities">
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial={animationsDisabled ? "visible" : "hidden"}
            animate="visible"
          >
            <ResourceCard
              title="Online Forums & Groups"
              description="Connect with others who understand dyslexia through shared experiences."
              icon={MessageSquare}
              links={[
                { text: "Reddit r/Dyslexia Community", url: "https://www.reddit.com/r/Dyslexia/" },
                { text: "Dyslexia Support Group on Facebook", url: "https://www.facebook.com/groups/dyslexiasupportgroup/" },
                { text: "Understood.org Community", url: "https://www.understood.org/community" }
              ]}
            />

            <ResourceCard
              title="Support Organizations"
              description="Organizations dedicated to helping people with dyslexia and their families."
              icon={HeartHandshake}
              links={[
                { text: "National Center for Learning Disabilities", url: "https://www.ncld.org/" },
                { text: "Dyslexia Action", url: "https://www.dyslexiaaction.org.uk/" },
                { text: "British Dyslexia Association", url: "https://www.bdadyslexia.org.uk/" }
              ]}
            />

            <ResourceCard
              title="Parent Resources"
              description="Special resources for parents of children with dyslexia."
              icon={HeartHandshake}
              links={[
                { text: "Parents' Guide to Dyslexia", url: "https://www.readingrockets.org/reading-topics/dyslexia/parents" },
                { text: "Decoding Dyslexia", url: "https://decodingdyslexia.net/" },
                { text: "Parent Toolkit by Understood", url: "https://www.understood.org/en/learning-thinking-differences/child-learning-disabilities/dyslexia/dyslexia-resources" }
              ]}
            />

            <ResourceCard
              title="Global Support Networks"
              description="International organizations and resources for dyslexia support."
              icon={Globe}
              links={[
                { text: "European Dyslexia Association", url: "https://www.eda-info.eu/" },
                { text: "Australian Dyslexia Association", url: "https://dyslexiaassociation.org.au/" },
                { text: "Dyslexia Canada", url: "https://www.dyslexiacanada.org/" }
              ]}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="tools">
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial={animationsDisabled ? "visible" : "hidden"}
            animate="visible"
          >
            <ResourceCard
              title="Reading Assistance"
              description="Tools that help make reading easier for people with dyslexia."
              icon={BookOpen}
              links={[
                { text: "OpenDyslexic Font", url: "https://opendyslexic.org/" },
                { text: "Readability - Text to Speech", url: "https://www.readabilityapp.com/" },
                { text: "Natural Reader", url: "https://www.naturalreaders.com/" }
              ]}
            />

            <ResourceCard
              title="Writing Support"
              description="Applications that assist with writing challenges associated with dyslexia."
              icon={Lightbulb}
              links={[
                { text: "Grammarly", url: "https://www.grammarly.com/" },
                { text: "Co:Writer", url: "https://cowriter.com/" },
                { text: "Speechify", url: "https://speechify.com/" }
              ]}
            />

            <ResourceCard
              title="Learning Apps"
              description="Interactive applications designed specifically for dyslexic learners."
              icon={School}
              links={[
                { text: "Nessy Learning", url: "https://www.nessy.com/" },
                { text: "Dyslexia Quest", url: "https://www.nessy.com/us/apps/dyslexia-quest/" },
                { text: "GraphoGame", url: "https://graphogame.com/" }
              ]}
            />

            <ResourceCard
              title="Productivity Tools"
              description="General tools that can be particularly helpful for people with dyslexia."
              icon={Lightbulb}
              links={[
                { text: "Microsoft Learning Tools", url: "https://www.microsoft.com/en-us/education/products/learning-tools" },
                { text: "HelperBird", url: "https://www.helperbird.com/" },
                { text: "Notability", url: "https://notability.com/" }
              ]}
            />
          </motion.div>
        </TabsContent>

        <TabsContent value="professional">
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial={animationsDisabled ? "visible" : "hidden"}
            animate="visible"
          >
            <ResourceCard
              title="Finding Specialists"
              description="How to find qualified professionals who can help with dyslexia."
              icon={HeartHandshake}
              links={[
                { text: "IDA Provider Directory", url: "https://dyslexiaida.org/provider-directories/" },
                { text: "Learning Disability Specialists", url: "https://www.psychologytoday.com/us/therapists/learning-disabilities" },
                { text: "Educational Psychologists", url: "https://www.nasponline.org/research-and-policy/advocacy/find-a-state-association" }
              ]}
            />

            <ResourceCard
              title="Educational Advocacy"
              description="Resources for advocating for appropriate educational support."
              icon={School}
              links={[
                { text: "Wrightslaw Special Education Law", url: "https://www.wrightslaw.com/" },
                { text: "Understood's IEP Guide", url: "https://www.understood.org/en/school-learning/special-services/ieps/understanding-individualized-education-programs" },
                { text: "LD Online Advocacy Resources", url: "https://www.ldonline.org/ld-topics/advocacy" }
              ]}
            />

            <ResourceCard
              title="Therapeutic Approaches"
              description="Information on different therapy and intervention methods for dyslexia."
              icon={HeartHandshake}
              links={[
                { text: "Orton-Gillingham Practitioners", url: "https://www.ortonacademy.org/accreditation/aogpe-members/" },
                { text: "Wilson Reading System", url: "https://www.wilsonlanguage.com/programs/wilson-reading-system/" },
                { text: "Davis Dyslexia Methods", url: "https://www.dyslexia.com/" }
              ]}
            />

            <ResourceCard
              title="Assessment Information"
              description="Understanding professional dyslexia assessment and diagnosis."
              icon={BookOpen}
              links={[
                { text: "Understanding Dyslexia Evaluation", url: "https://www.understood.org/en/school-learning/evaluations/evaluation-basics/dyslexia-evaluations-what-you-need-to-know" },
                { text: "Types of Reading Assessments", url: "https://www.readingrockets.org/teaching/reading-basics/assessment" },
                { text: "What to Expect in Testing", url: "https://dyslexiaida.org/testing-and-evaluation/" }
              ]}
            />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportResourcesPage;
