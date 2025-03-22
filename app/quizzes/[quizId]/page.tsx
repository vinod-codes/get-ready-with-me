"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, Clock, HelpCircle, X } from "lucide-react"
import { getCurrentUser } from "@/app/actions/auth-actions"
import DashboardHeader from "@/app/dashboard/dashboard-header"

type User = {
  id: string
  name: string
  email: string
  image: string
}

type Question = {
  id: string
  type: "multiple-choice" | "single-choice" | "true-false" | "fill-blank" | "code"
  question: string
  code?: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  userAnswer?: string | string[]
  isCorrect?: boolean
}

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getCurrentUser()
        if (!userData) {
          router.push("/auth/login")
          return
        }
        setUser(userData as User)
      } catch (error) {
        console.error("Failed to load user data", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [router])

  useEffect(() => {
    // Load quiz questions based on quizId
    let quizQuestions: Question[] = []

    if (params.quizId === "javascript-basics") {
      quizQuestions = [
        {
          id: "q1",
          type: "single-choice",
          question: "Which of the following is NOT a JavaScript data type?",
          options: ["String", "Boolean", "Float", "Object"],
          correctAnswer: "Float",
          explanation:
            "JavaScript has the following primitive data types: String, Number, Boolean, Undefined, Null, Symbol, and BigInt. It also has Object as a non-primitive data type. Float is not a distinct data type in JavaScript; it falls under the Number type.",
        },
        {
          id: "q2",
          type: "multiple-choice",
          question: "Which of the following are valid ways to declare a variable in JavaScript?",
          options: ["var x = 5;", "let y = 10;", "const z = 15;", "int a = 20;"],
          correctAnswer: ["var x = 5;", "let y = 10;", "const z = 15;"],
          explanation:
            "In JavaScript, variables can be declared using var, let, or const. The 'int' keyword is not used in JavaScript for variable declaration; it's used in languages like C, C++, and Java.",
        },
        {
          id: "q3",
          type: "true-false",
          question: "In JavaScript, '==' and '===' operators perform the same comparison.",
          options: ["True", "False"],
          correctAnswer: "False",
          explanation:
            "The '==' operator performs type coercion, which means it converts the operands to the same type before making the comparison. The '===' operator, on the other hand, does not perform type coercion and returns true only if both the value and the type are the same.",
        },
        {
          id: "q4",
          type: "fill-blank",
          question: "To convert a string to a number in JavaScript, you can use the ________ function.",
          correctAnswer: "parseInt",
          explanation:
            "The parseInt() function parses a string and returns an integer. You can also use Number() or the unary plus operator (+) to convert strings to numbers.",
        },
        {
          id: "q5",
          type: "code",
          question: "What will be the output of the following code?",
          code: `
function example() {
  var x = 10;
  if (true) {
    var x = 20;
    console.log(x); // A
  }
  console.log(x); // B
}
example();
          `,
          options: ["A: 20, B: 10", "A: 20, B: 20", "A: 10, B: 10", "A: 10, B: 20"],
          correctAnswer: "A: 20, B: 20",
          explanation:
            "Variables declared with 'var' have function scope, not block scope. When 'var x = 20' is declared inside the if block, it's actually reassigning the same variable that was declared at the function level. Therefore, both console.log statements will output 20.",
        },
      ]
    } else if (params.quizId === "html-basics") {
      quizQuestions = [
        {
          id: "q1",
          type: "single-choice",
          question: "Which HTML tag is used to define an unordered list?",
          options: ["<ol>", "<ul>", "<li>", "<list>"],
          correctAnswer: "<ul>",
          explanation:
            "The <ul> tag defines an unordered (bulleted) list. The <ol> tag is used for ordered lists, <li> for list items, and <list> is not a standard HTML tag.",
        },
        {
          id: "q2",
          type: "true-false",
          question: "The <br> tag is used to create a line break in HTML.",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation:
            "The <br> tag inserts a single line break. It is an empty element, which means it doesn't have a closing tag.",
        },
        {
          id: "q3",
          type: "multiple-choice",
          question: "Which of the following are valid HTML5 semantic elements?",
          options: ["<header>", "<section>", "<content>", "<footer>"],
          correctAnswer: ["<header>", "<section>", "<footer>"],
          explanation:
            "HTML5 introduced several semantic elements including <header>, <section>, <article>, <footer>, <nav>, <aside>, and more. <content> is not a standard HTML5 semantic element.",
        },
      ]
    } else {
      // Default questions for other quizzes
      quizQuestions = [
        {
          id: "q1",
          type: "single-choice",
          question: "Sample question 1?",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctAnswer: "Option A",
          explanation: "This is the explanation for the correct answer.",
        },
        {
          id: "q2",
          type: "true-false",
          question: "Sample question 2?",
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: "This is the explanation for the correct answer.",
        },
      ]
    }

    setQuestions(quizQuestions)
    setTimeRemaining(quizQuestions.length * 60) // 1 minute per question
  }, [params.quizId])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0 && quizStarted && !quizCompleted) {
      handleQuizSubmit()
    }

    return () => clearInterval(timer)
  }, [quizStarted, quizCompleted, timeRemaining])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  // Get quiz details based on quizId
  const quiz = {
    id: params.quizId,
    title:
      params.quizId === "javascript-basics"
        ? "JavaScript Basics"
        : params.quizId === "html-basics"
          ? "HTML Basics"
          : "Quiz",
    description:
      params.quizId === "javascript-basics"
        ? "Test your knowledge of JavaScript fundamentals"
        : params.quizId === "html-basics"
          ? "Test your knowledge of HTML fundamentals"
          : "Test your knowledge",
    category: params.quizId.includes("javascript")
      ? "JavaScript"
      : params.quizId.includes("html")
        ? "HTML"
        : params.quizId.includes("css")
          ? "CSS"
          : "React",
    level: params.quizId.includes("basics") ? "Beginner" : "Intermediate",
    questions: questions.length,
    duration: `${Math.ceil(questions.length / 2) * 5} min`,
  }

  function handleStartQuiz() {
    setQuizStarted(true)
  }

  function handleAnswerChange(questionId: string, answer: string | string[]) {
    setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === questionId ? { ...q, userAnswer: answer } : q)))
  }

  function handleNextQuestion() {
    setShowExplanation(false)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  function handlePrevQuestion() {
    setShowExplanation(false)
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  function handleQuizSubmit() {
    // Calculate score
    let correctCount = 0
    const gradedQuestions = questions.map((question) => {
      let isCorrect = false

      if (question.type === "multiple-choice") {
        const correctAnswers = question.correctAnswer as string[]
        const userAnswers = (question.userAnswer as string[]) || []
        isCorrect =
          correctAnswers.length === userAnswers.length && correctAnswers.every((answer) => userAnswers.includes(answer))
      } else {
        isCorrect = question.userAnswer === question.correctAnswer
      }

      if (isCorrect) correctCount++

      return {
        ...question,
        isCorrect,
      }
    })

    setQuestions(gradedQuestions)
    setScore({
      correct: correctCount,
      total: questions.length,
    })
    setQuizCompleted(true)
  }

  function renderQuestion(question: Question) {
    switch (question.type) {
      case "single-choice":
        return (
          <RadioGroup
            value={(question.userAnswer as string) || ""}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            disabled={quizCompleted}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={option} id={`${question.id}-option-${index}`} disabled={quizCompleted} />
                <Label
                  htmlFor={`${question.id}-option-${index}`}
                  className={
                    quizCompleted
                      ? option === question.correctAnswer
                        ? "text-green-500 font-medium"
                        : question.userAnswer === option
                          ? "text-red-500 line-through"
                          : ""
                      : ""
                  }
                >
                  {option}
                </Label>
                {quizCompleted && option === question.correctAnswer && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {quizCompleted && question.userAnswer === option && option !== question.correctAnswer && (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>
        )

      case "multiple-choice":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-option-${index}`}
                  checked={((question.userAnswer as string[]) || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const currentAnswers = (question.userAnswer as string[]) || []
                    let newAnswers

                    if (checked) {
                      newAnswers = [...currentAnswers, option]
                    } else {
                      newAnswers = currentAnswers.filter((a) => a !== option)
                    }

                    handleAnswerChange(question.id, newAnswers)
                  }}
                  disabled={quizCompleted}
                />
                <Label
                  htmlFor={`${question.id}-option-${index}`}
                  className={
                    quizCompleted
                      ? (question.correctAnswer as string[]).includes(option)
                        ? "text-green-500 font-medium"
                        : ((question.userAnswer as string[]) || []).includes(option)
                          ? "text-red-500 line-through"
                          : ""
                      : ""
                  }
                >
                  {option}
                </Label>
                {quizCompleted && (question.correctAnswer as string[]).includes(option) && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {quizCompleted &&
                  ((question.userAnswer as string[]) || []).includes(option) &&
                  !(question.correctAnswer as string[]).includes(option) && <X className="h-4 w-4 text-red-500" />}
              </div>
            ))}
          </div>
        )

      case "true-false":
        return (
          <RadioGroup
            value={(question.userAnswer as string) || ""}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            disabled={quizCompleted}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={option} id={`${question.id}-option-${index}`} disabled={quizCompleted} />
                <Label
                  htmlFor={`${question.id}-option-${index}`}
                  className={
                    quizCompleted
                      ? option === question.correctAnswer
                        ? "text-green-500 font-medium"
                        : question.userAnswer === option
                          ? "text-red-500 line-through"
                          : ""
                      : ""
                  }
                >
                  {option}
                </Label>
                {quizCompleted && option === question.correctAnswer && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {quizCompleted && question.userAnswer === option && option !== question.correctAnswer && (
                  <X className="h-4 w-4 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>
        )

      case "fill-blank":
        return (
          <div>
            <Input
              type="text"
              value={(question.userAnswer as string) || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Type your answer here"
              disabled={quizCompleted}
              className={quizCompleted ? (question.isCorrect ? "border-green-500" : "border-red-500") : ""}
            />
            {quizCompleted && (
              <div className="mt-2">
                <p className="text-sm font-medium">
                  Correct answer: <span className="text-green-500">{question.correctAnswer}</span>
                </p>
                {!question.isCorrect && (
                  <p className="text-sm font-medium">
                    Your answer: <span className="text-red-500">{question.userAnswer}</span>
                  </p>
                )}
              </div>
            )}
          </div>
        )

      case "code":
        return (
          <div>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
              <code>{question.code}</code>
            </pre>
            <RadioGroup
              value={(question.userAnswer as string) || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              disabled={quizCompleted}
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={option} id={`${question.id}-option-${index}`} disabled={quizCompleted} />
                  <Label
                    htmlFor={`${question.id}-option-${index}`}
                    className={
                      quizCompleted
                        ? option === question.correctAnswer
                          ? "text-green-500 font-medium"
                          : question.userAnswer === option
                            ? "text-red-500 line-through"
                            : ""
                        : ""
                    }
                  >
                    {option}
                  </Label>
                  {quizCompleted && option === question.correctAnswer && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {quizCompleted && question.userAnswer === option && option !== question.correctAnswer && (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />

      <main className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" className="mb-4 pl-0" asChild>
            <Link href="/quizzes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quizzes
            </Link>
          </Button>

          {!quizStarted ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </div>
                  <Badge variant="outline">{quiz.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <HelpCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>{quiz.questions} questions</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>{quiz.duration}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-2 font-medium">Quiz Instructions</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Read each question carefully before answering.</li>
                    <li>• Some questions may have multiple correct answers.</li>
                    <li>• You can navigate between questions using the previous and next buttons.</li>
                    <li>• The quiz is timed. Make sure to complete all questions before the time runs out.</li>
                    <li>• You can review your answers before submitting.</li>
                    <li>• Once submitted, you cannot change your answers.</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleStartQuiz}>
                  Start Quiz
                </Button>
              </CardFooter>
            </Card>
          ) : quizCompleted ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Quiz Results</CardTitle>
                <CardDescription>
                  You scored {score.correct} out of {score.total} ({Math.round((score.correct / score.total) * 100)}%)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Score</span>
                    <span className="font-medium">{Math.round((score.correct / score.total) * 100)}%</span>
                  </div>
                  <Progress value={(score.correct / score.total) * 100} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                            question.isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Question {index + 1}: {question.question}
                          </h3>
                          <div className="mt-2">{renderQuestion(question)}</div>
                          {question.isCorrect ? (
                            <div className="mt-2 flex items-center text-green-500">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              <span className="text-sm font-medium">Correct</span>
                            </div>
                          ) : (
                            <div className="mt-2 flex items-center text-red-500">
                              <X className="mr-1 h-4 w-4" />
                              <span className="text-sm font-medium">Incorrect</span>
                            </div>
                          )}
                          <div className="mt-2 rounded-md bg-muted p-3">
                            <p className="text-sm font-medium">Explanation:</p>
                            <p className="text-sm text-muted-foreground">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/quizzes">Back to Quizzes</Link>
                </Button>
                <Button asChild>
                  <Link href={`/quizzes/${params.quizId}`}>Retake Quiz</Link>
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                    <CardDescription>
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                    <span>{formatTime(timeRemaining)}</span>
                  </div>
                </div>
                <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2 mt-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-4">{questions[currentQuestionIndex]?.question}</h3>
                  {renderQuestion(questions[currentQuestionIndex])}
                </div>

                {showExplanation && (
                  <div className="mt-4 rounded-md bg-muted p-3">
                    <p className="text-sm font-medium">Explanation:</p>
                    <p className="text-sm text-muted-foreground">{questions[currentQuestionIndex]?.explanation}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <Button variant="outline" onClick={() => handlePrevQuestion()} disabled={currentQuestionIndex === 0}>
                    Previous
                  </Button>
                  <Button variant="ghost" onClick={() => setShowExplanation(!showExplanation)} className="ml-2">
                    {showExplanation ? "Hide Hint" : "Show Hint"}
                  </Button>
                </div>
                <div>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <Button onClick={() => handleNextQuestion()}>Next</Button>
                  ) : (
                    <Button onClick={() => handleQuizSubmit()}>Submit Quiz</Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

