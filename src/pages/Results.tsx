
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ArrowRight, Info, Check, AlertCircle } from "lucide-react";

interface TestResults {
  test: string;
  correctAnswers: number;
  totalQuestions: number;
  averageReadingTime: number;
}

const Results = () => {
  const [results, setResults] = useState<TestResults | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedResults = localStorage.getItem("testResults");
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
    
    setIsLoaded(true);
  }, []);

  // Calculate score percentage
  const scorePercentage = results ? (results.correctAnswers / results.totalQuestions) * 100 : 0;
  
  // Determine if reading time suggests potential dyslexia
  // (Note: This is simplified and not scientifically validated)
  const isReadingTimeSlow = results ? results.averageReadingTime > 8 : false;
  
  // Determine if score suggests potential dyslexia
  const isScoreLow = scorePercentage < 60;
  
  // Determine if results suggest potential signs of dyslexia
  const showsSignsOfDyslexia = isReadingTimeSlow || isScoreLow;

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <div className="absolute inset-0 -z-10 bg-grid"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      
      <div className="container mx-auto pt-32 pb-20 px-4 md:pt-40 relative z-0">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <AnimatedHeading delay={200} className="text-3xl md:text-4xl font-bold mb-4">
              Your Test Results
            </AnimatedHeading>
            {results && (
              <p className="text-lg text-muted-foreground">
                {results.test} Test Results
              </p>
            )}
          </div>
          
          {results ? (
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="glass overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-6">Test Performance</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Accuracy</span>
                          <span className="font-medium">
                            {results.correctAnswers} of {results.totalQuestions} correct
                          </span>
                        </div>
                        <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${scorePercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Reading Speed</span>
                          <span className="font-medium">
                            {results.averageReadingTime.toFixed(1)} seconds per question
                          </span>
                        </div>
                        <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${
                              isReadingTimeSlow ? "bg-amber-500" : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(100, (results.averageReadingTime / 15) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 border-t">
                    <h3 className="font-medium mb-2">Performance Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      {scorePercentage >= 80 ? (
                        "Your accuracy was excellent! You demonstrated strong reading comprehension skills."
                      ) : scorePercentage >= 60 ? (
                        "Your accuracy was good. You showed solid reading comprehension."
                      ) : (
                        "Your accuracy suggests some difficulty with reading comprehension, which is common in individuals with dyslexia."
                      )}
                    </p>
                    
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">
                        {!isReadingTimeSlow ? (
                          "Your reading speed was within the typical range."
                        ) : (
                          "Your reading speed was slower than typical, which can be associated with dyslexia."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-8">
                <Card className={`border-l-4 ${showsSignsOfDyslexia ? "border-l-amber-500" : "border-l-green-500"}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 rounded-full p-2 ${showsSignsOfDyslexia ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"}`}>
                        {showsSignsOfDyslexia ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : (
                          <Check className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {showsSignsOfDyslexia ? (
                            "Possible Signs of Dyslexia Detected"
                          ) : (
                            "No Strong Signs of Dyslexia Detected"
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {showsSignsOfDyslexia ? (
                            "Your test results suggest some patterns commonly associated with dyslexia. This is not a diagnosis, but you may want to consider a professional assessment."
                          ) : (
                            "Your test performance does not strongly indicate dyslexia. However, if you're experiencing persistent difficulties with reading or writing, consider consulting a specialist."
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 rounded-full p-2 bg-blue-100 text-blue-600">
                        <Info className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">What Next?</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Our screening tests provide initial insights but are not diagnostic. To get a comprehensive assessment:
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4 mb-4">
                          <li>Consult with an educational psychologist or dyslexia specialist</li>
                          <li>Discuss your results with a healthcare provider</li>
                          <li>Consider taking additional screening tests</li>
                        </ul>
                        <div className="flex gap-3 mt-4">
                          <Button size="sm" variant="outline" asChild>
                            <Link to="/about">Learn More</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link to="/tests">Try Another Test</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-lg">No test results found. Please take a test first.</p>
              <Button className="mt-6" asChild>
                <Link to="/tests">Go to Tests</Link>
              </Button>
            </Card>
          )}
          
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" className="gap-2 rounded-full px-6" asChild>
              <Link to="/">
                Back to Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
