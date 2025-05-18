
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ArrowRight } from "lucide-react";

interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

const ReadingTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeStarted, setTimeStarted] = useState<Date | null>(null);
  const [readingTimes, setReadingTimes] = useState<number[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample questions for the reading test
  const questions: Question[] = [
    {
      text: "The cat sat on the mat. The dog barked at the cat. The cat jumped off the mat and ran away. Where did the cat sit?",
      options: ["On the chair", "On the mat", "On the floor", "On the table"],
      correctAnswer: 1
    },
    {
      text: "Tom likes to play soccer. He plays every Saturday with his friends. They meet at the park at 2:00 PM. What sport does Tom play?",
      options: ["Basketball", "Tennis", "Soccer", "Baseball"],
      correctAnswer: 2
    },
    {
      text: "Sarah went to the store. She bought milk, bread, and eggs. She forgot to buy cheese. What did Sarah forget to buy?",
      options: ["Milk", "Bread", "Eggs", "Cheese"],
      correctAnswer: 3
    },
    {
      text: "The red car stopped at the traffic light. The light turned green. The car moved forward. What color was the car?",
      options: ["Blue", "Green", "Red", "Yellow"],
      correctAnswer: 2
    },
    {
      text: "John has three apples. He gave one apple to his friend. How many apples does John have now?",
      options: ["One", "Two", "Three", "Four"],
      correctAnswer: 1
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    setTimeStarted(new Date());
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // Calculate reading time
    if (timeStarted) {
      const now = new Date();
      const readingTime = (now.getTime() - timeStarted.getTime()) / 1000;
      setReadingTimes([...readingTimes, readingTime]);
    }

    // Check if answer is correct
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setTimeStarted(new Date());
    } else {
      setIsTestComplete(true);
      
      // Store results in localStorage for the results page
      const results = {
        test: "Reading Fluency",
        correctAnswers,
        totalQuestions: questions.length,
        averageReadingTime: readingTimes.reduce((a, b) => a + b, 0) / readingTimes.length
      };
      localStorage.setItem("testResults", JSON.stringify(results));
    }
  };

  const handleViewResults = () => {
    navigate("/results");
  };

  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      
      <div className="absolute inset-0 -z-10 bg-grid"></div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <div className="container mx-auto pt-32 pb-20 px-4 md:pt-40 relative z-0">
        <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {!isTestComplete ? (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-medium">Reading Fluency Test</h2>
                  <div className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <Card className="glass mb-8">
                <CardContent className="p-6 md:p-8">
                  <AnimatedHeading delay={200} className="text-xl md:text-2xl font-medium mb-8">
                    Read the following text and answer the question:
                  </AnimatedHeading>
                  
                  <div className="space-y-10">
                    <div className="text-lg leading-relaxed bg-card p-6 rounded-lg">
                      {questions[currentQuestionIndex].text}
                    </div>
                    
                    <div className="space-y-3">
                      {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className={`w-full p-4 text-left rounded-lg border transition-all ${
                            selectedOption === optionIndex
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-card hover:border-primary/50"
                          }`}
                          onClick={() => handleOptionSelect(optionIndex)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  className="gap-2"
                >
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    "Complete Test"
                  )}
                </Button>
              </div>
            </>
          ) : (
            <Card className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Test Completed!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for completing the Reading Fluency test.
              </p>
              
              <Button onClick={handleViewResults} className="gap-2">
                View Your Results
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingTest;
