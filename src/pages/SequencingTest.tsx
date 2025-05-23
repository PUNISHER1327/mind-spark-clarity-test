
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { AnimatedHeading } from "@/components/AnimatedHeading";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface Question {
  text: string;
  options: string[];
  correctOrder: number[];
  difficulty: "easy" | "medium" | "hard";
}

interface TestResult {
  questionIndex: number;
  score: number; // 0-100 percentage
  timeSpent: number;
  difficulty: "easy" | "medium" | "hard";
}

const SequencingTest = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  // Sequencing test questions
  const questions: Question[] = [
    {
      text: "Arrange these numbers in ascending order (smallest to largest):",
      options: ["7", "2", "9", "4", "1"],
      correctOrder: [4, 1, 3, 0, 2], // indices of the correct order: 1,2,4,7,9
      difficulty: "easy"
    },
    {
      text: "Arrange these months in calendar order:",
      options: ["June", "January", "October", "March", "August"],
      correctOrder: [1, 3, 0, 4, 2], // indices in correct order
      difficulty: "medium"
    },
    {
      text: "Arrange these events in historical order (earliest to latest):",
      options: [
        "World War II", 
        "First Moon Landing", 
        "Declaration of Independence", 
        "Fall of the Berlin Wall",
        "Industrial Revolution"
      ],
      correctOrder: [2, 4, 0, 1, 3], // indices in correct order
      difficulty: "hard"
    },
    {
      text: "Arrange these steps for making a sandwich in the correct order:",
      options: [
        "Add toppings", 
        "Cut the sandwich", 
        "Take out bread", 
        "Spread butter or sauce",
        "Place the second slice on top"
      ],
      correctOrder: [2, 3, 0, 4, 1], // indices in correct order
      difficulty: "medium"
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    setStartTime(new Date());
    if (questions[currentQuestionIndex]) {
      setItems([...questions[currentQuestionIndex].options]);
    }
  }, [currentQuestionIndex]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const reordered = Array.from(items);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    
    setItems(reordered);
  };

  const calculateScore = (userOrder: string[], question: Question): number => {
    const correctOrder = question.correctOrder.map(idx => question.options[idx]);
    let score = 0;
    
    // Check each position
    for (let i = 0; i < userOrder.length; i++) {
      if (userOrder[i] === correctOrder[i]) {
        score++;
      }
    }
    
    return (score / userOrder.length) * 100;
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
      riskFactors.push("Difficulty with sequencing tasks");
    }
    
    if (averageTime > 45) {
      riskFactors.push("Slower processing in sequencing tasks");
    }
    
    // Calculate performance on easy vs. difficult tasks
    const easyTasks = results.filter(r => r.difficulty === "easy");
    const hardTasks = results.filter(r => r.difficulty === "hard" || r.difficulty === "medium");
    
    const avgEasyScore = easyTasks.length > 0 ? 
      easyTasks.reduce((sum, r) => sum + r.score, 0) / easyTasks.length : 100;
    
    const avgHardScore = hardTasks.length > 0 ? 
      hardTasks.reduce((sum, r) => sum + r.score, 0) / hardTasks.length : 100;
    
    if (avgEasyScore < 75) {
      riskFactors.push("Difficulty with even simple sequencing");
    }
    
    if (avgHardScore < 40) {
      riskFactors.push("Significant difficulty with complex sequencing");
    }
    
    // Determine risk level
    if (riskFactors.length >= 3 || averageScore < 40) {
      riskLevel = "High";
    } else if (riskFactors.length >= 2 || averageScore < 60) {
      riskLevel = "Moderate";
    }
    
    return {
      averageScore,
      averageTime,
      riskFactors,
      riskLevel
    };
  };

  const handleCheck = () => {
    if (!startTime) return;
    
    // Calculate time spent on this question
    const endTime = new Date();
    const timeSpent = (endTime.getTime() - startTime.getTime()) / 1000;
    
    const question = questions[currentQuestionIndex];
    const score = calculateScore(items, question);
    
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
      setStartTime(new Date());
    } else {
      setIsTestComplete(true);
      
      // Calculate comprehensive results
      const analysis = calculateDyslexiaRisk(newResults);
      
      const testResults = {
        test: "Sequencing",
        ...analysis,
        detailedResults: newResults,
        questions
      };
      
      localStorage.setItem("testResults", JSON.stringify(testResults));
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
                  <h2 className="text-lg font-medium">Sequencing Test</h2>
                  <div className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <Card className="glass mb-8">
                <CardContent className="p-6 md:p-8">
                  <AnimatedHeading delay={200} className="text-xl md:text-2xl font-medium mb-8">
                    {questions[currentQuestionIndex]?.text}
                  </AnimatedHeading>
                  
                  <div className="space-y-3 mt-6">
                    <div className="text-sm text-muted-foreground mb-4">
                      Drag and drop the items to arrange them in the correct order:
                    </div>
                    
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="sequencing-items">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-2"
                          >
                            {items.map((item, index) => (
                              <Draggable key={item} draggableId={item} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-card border p-4 rounded-lg flex items-center gap-3 cursor-move"
                                  >
                                    <div className="w-8 h-8 bg-muted flex items-center justify-center rounded-full text-sm font-medium">
                                      {index + 1}
                                    </div>
                                    <div>{item}</div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button
                  onClick={handleCheck}
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
                Thank you for completing the Sequencing test. Your detailed analysis is ready.
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

export default SequencingTest;
