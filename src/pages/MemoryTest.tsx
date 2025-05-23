
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ArrowRight, Clock } from "lucide-react";

interface Question {
  type: "sequence" | "recall";
  content: string[];
  recalled?: string[];
  correctAnswer?: string[];
  difficulty: "easy" | "medium" | "hard";
  instructions: string;
  duration: number; // seconds to memorize
}

interface TestResult {
  questionIndex: number;
  score: number; // 0-100 percentage correct
  timeSpent: number;
  difficulty: "easy" | "medium" | "hard";
}

const MemoryTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [phase, setPhase] = useState<"memorize" | "recall" | "answer">("memorize");
  const [memoryTimer, setMemoryTimer] = useState<number | null>(null);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Memory test questions
  const questions: Question[] = [
    {
      type: "sequence",
      instructions: "Memorize these numbers, then recall them in the same order:",
      content: ["3", "7", "2", "9", "4"],
      difficulty: "easy",
      duration: 5
    },
    {
      type: "sequence",
      instructions: "Memorize these letters, then recall them in the same order:",
      content: ["K", "L", "B", "R", "F", "Z"],
      difficulty: "medium",
      duration: 6
    },
    {
      type: "sequence",
      instructions: "Memorize these numbers, then recall them in reverse order:",
      content: ["5", "9", "3", "1", "6"],
      correctAnswer: ["6", "1", "3", "9", "5"],
      difficulty: "medium",
      duration: 6
    },
    {
      type: "recall",
      instructions: "Memorize these words, then recall as many as you can in any order:",
      content: ["house", "tree", "car", "dog", "book", "chair", "pen"],
      difficulty: "hard",
      duration: 8
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    startMemorizingPhase();
  }, []);
  
  useEffect(() => {
    if (phase === "memorize" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === "memorize" && timeLeft === 0) {
      setPhase("recall");
      setStartTime(new Date());
    }
  }, [phase, timeLeft]);

  const startMemorizingPhase = () => {
    setPhase("memorize");
    setUserInputs([]);
    setTimeLeft(questions[currentQuestionIndex].duration);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      setUserInputs([value]);
    } else {
      setUserInputs([]);
    }
  };

  const handleAddAnswer = () => {
    if (userInputs.length > 0 && userInputs[0]) {
      setUserInputs([...userInputs, ""]);
    }
  };

  const handleWordInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputs = [...userInputs];
    newInputs[index] = e.target.value;
    setUserInputs(newInputs);
  };

  const calculateScore = (question: Question, answers: string[]): number => {
    const cleanAnswers = answers.filter(a => a.trim() !== "");
    
    if (question.type === "sequence") {
      const correctAnswers = question.correctAnswer || question.content;
      let score = 0;
      const minLength = Math.min(correctAnswers.length, cleanAnswers.length);
      
      for (let i = 0; i < minLength; i++) {
        if (cleanAnswers[i].toLowerCase().trim() === correctAnswers[i].toLowerCase()) {
          score++;
        }
      }
      
      return (score / correctAnswers.length) * 100;
    } else if (question.type === "recall") {
      // For recall, check how many words were correctly remembered
      const correctContent = question.content.map(item => item.toLowerCase());
      let correctCount = 0;
      
      for (const answer of cleanAnswers) {
        if (correctContent.includes(answer.toLowerCase().trim())) {
          correctCount++;
        }
      }
      
      // Calculate score based on how many correct items were recalled
      // If got all, 100%. If got half, 50%.
      return Math.min((correctCount / question.content.length) * 100, 100);
    }
    
    return 0;
  };
  
  const handleCheck = () => {
    if (!startTime) return;
    
    // Calculate time spent on this question
    const endTime = new Date();
    const timeSpent = (endTime.getTime() - startTime.getTime()) / 1000;
    
    const question = questions[currentQuestionIndex];
    const score = calculateScore(question, userInputs);
    
    // Record result
    const result: TestResult = {
      questionIndex: currentQuestionIndex,
      score,
      timeSpent,
      difficulty: question.difficulty
    };
    
    const newResults = [...results, result];
    setResults(newResults);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      startMemorizingPhase();
    } else {
      setIsTestComplete(true);
      
      // Calculate comprehensive results
      const analysis = calculateDyslexiaRisk(newResults);
      
      const testResults = {
        test: "Working Memory",
        ...analysis,
        detailedResults: newResults,
        questions
      };
      
      localStorage.setItem("testResults", JSON.stringify(testResults));
    }
  };

  const calculateDyslexiaRisk = (results: TestResult[]) => {
    const totalQuestions = results.length;
    const averageScore = results.reduce((sum, r) => sum + r.score, 0) / totalQuestions;
    
    // Calculate average time
    const averageTime = results.reduce((sum, r) => sum + r.timeSpent, 0) / totalQuestions;
    
    // Dyslexia risk factors
    let riskFactors = [];
    let riskLevel = "Low";
    
    if (averageScore < 60) {
      riskFactors.push("Difficulty with working memory tasks");
    }
    
    if (averageTime > 30) {
      riskFactors.push("Slower processing in memory recall tasks");
    }
    
    // Calculate overall risk
    const sequenceTaskScores = results.filter((_, i) => 
      questions[i].type === "sequence"
    ).map(r => r.score);
    
    const averageSequenceScore = sequenceTaskScores.length > 0 ? 
      sequenceTaskScores.reduce((a, b) => a + b, 0) / sequenceTaskScores.length : 100;
    
    if (averageSequenceScore < 50) {
      riskFactors.push("Significant difficulty with sequential memory");
    }
    
    // Determine risk level
    if (riskFactors.length >= 2 || averageScore < 40) {
      riskLevel = "High";
    } else if (riskFactors.length >= 1 || averageScore < 60) {
      riskLevel = "Moderate";
    }
    
    return {
      averageScore,
      averageTime,
      riskFactors,
      riskLevel
    };
  };

  const handleViewResults = () => {
    navigate("/results");
  };

  const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  const renderMemorizePhase = () => (
    <Card className="glass mb-8">
      <CardContent className="p-6 md:p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <div className="mt-4 text-2xl font-bold">{timeLeft}</div>
          <div className="text-sm text-muted-foreground">seconds remaining</div>
        </div>
        
        <AnimatedHeading delay={200} className="text-xl md:text-2xl font-medium mb-6">
          {currentQuestion.instructions}
        </AnimatedHeading>
        
        <div className="flex flex-wrap justify-center gap-3 my-8">
          {currentQuestion.content.map((item, i) => (
            <div key={i} className="text-2xl md:text-3xl font-bold bg-card px-6 py-4 rounded-lg border">
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderRecallPhase = () => (
    <Card className="glass mb-8">
      <CardContent className="p-6 md:p-8">
        <AnimatedHeading delay={200} className="text-xl md:text-2xl font-medium mb-8">
          Now, recall what you memorized:
        </AnimatedHeading>
        
        <div className="space-y-4">
          {currentQuestion.type === "sequence" && (
            <div className="flex flex-col">
              <div className="mb-2 text-sm font-medium">Enter the items in the correct sequence:</div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: currentQuestion.content.length }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={2}
                    value={userInputs[i] || ""}
                    onChange={(e) => handleWordInput(e, i)}
                    className="w-14 h-14 text-center text-lg font-medium bg-card border rounded-md"
                    autoFocus={i === 0}
                  />
                ))}
              </div>
            </div>
          )}
          
          {currentQuestion.type === "recall" && (
            <div className="flex flex-col">
              <div className="mb-2 text-sm font-medium">Enter as many items as you can remember:</div>
              <div className="space-y-2">
                {userInputs.map((input, i) => (
                  <input
                    key={i}
                    type="text"
                    value={input}
                    onChange={(e) => handleWordInput(e, i)}
                    className="w-full p-2 text-md bg-card border rounded-md"
                    placeholder="Enter a word"
                    autoFocus={i === userInputs.length - 1}
                  />
                ))}
                <Button 
                  variant="outline" 
                  onClick={handleAddAnswer}
                  className="w-full mt-2"
                  disabled={!userInputs[userInputs.length - 1]?.trim()}
                >
                  + Add Another Word
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

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
                  <h2 className="text-lg font-medium">Working Memory Test</h2>
                  <div className="text-sm text-muted-foreground">
                    Task {currentQuestionIndex + 1} of {questions.length}
                  </div>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              {phase === "memorize" ? renderMemorizePhase() : renderRecallPhase()}
              
              <div className="flex justify-end">
                {phase === "recall" && (
                  <Button
                    onClick={handleCheck}
                    disabled={userInputs.length === 0 || (userInputs.length === 1 && !userInputs[0])}
                    className="gap-2"
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>
                        Next Task
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      "Complete Test"
                    )}
                  </Button>
                )}
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
                Thank you for completing the Working Memory test. Your detailed analysis is ready.
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

export default MemoryTest;
