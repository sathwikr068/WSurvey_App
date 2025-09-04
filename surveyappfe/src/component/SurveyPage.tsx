import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


interface Question {
    id: number;
    title: string;
    description : string;
    type: "text"| "number";
}

interface Response {
    [key: number]:string;
}

const SurveyPage = () => {
    const [questions,setQuestions] = useState<Question[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const [responses,setResponses] = useState<Response>({});
    const [submitted,setSubmitted] = useState(false);
    const [currentStep,setCurrentStep] = useState(0);

    const navigate=useNavigate()
    useEffect(()=>{
        fetch("http://localhost:4000/api/questions")
        .then((res)=>res.json())
        .then((data)=>{
            setQuestions(data);
            setIsLoading(false);
        });
    },[]);

    const handleChange = (id:number, value:string) =>{
        setResponses((prev) => ({ ...prev, [id]:value}));
    };

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        await fetch("http://localhost:4000/api/responses",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(responses),
        });
        setSubmitted(true);
    }

    const nextStep = () =>{
        if(!responses[currentQuestion.id]){
            return;
        }

        if (currentStep < questions.length-1) {
             setCurrentStep(currentStep+1);
        }
    };
    const prevStep = () =>{
        if (currentStep > 0) {
             setCurrentStep(currentStep-1);
        }
    };





     if(isLoading){
        return(<><h2 className="text-primary-foreground">Loading...</h2></>)
     }

     if(questions.length===0){
        return(
            <h2 className="text-primary-foreground">
                no questions available
            </h2>
        )
     }

     if(submitted){
        return (
            <div className="flex flex-col gap-4 z-10 max-w-lg mx-auto mt-10 p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Thank You!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center mb-6">
                            <p className="text-muted-foreground">
                                Your responses are saved successfully.
                            </p>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Responses</h3>
                        {questions.map((q)=>(
                            (<div className="mb-4" key={q.id}>
                                <p className="font-medium">
                                    {q.title}
                                </p>
                                <p className="text-gray-300">
                                    {responses[q.id] || "not answered"}
                                </p>
                            </div>)
                        ))}
                    </CardContent>
                </Card>
                <Button onClick={()=>{navigate('/dashboard')}}>
                    Go to Dashboard
                </Button>
            </div>
        )
     }

    const progressValue = ((currentStep + 1) / questions.length) * 100
    const currentQuestion = questions[currentStep];

    
  return (

    <div className="z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-foreground">Survey Form</h1>
                <p className="text-muted-foreground">Question {currentStep +1} of {questions.length}</p>
            </div>

            <Progress value={progressValue} className="w-full h-3"/>

            <form onSubmit={handleSubmit}>
                <Card className="w-full md:w-2xl p-2">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            {currentQuestion.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                        <p className="text-base mb-8 text-center text-muted-foreground">
                            {currentQuestion.description}
                        </p>
                        <div className="flex flex-col space-y-4">
                            <Label htmlFor={`question-${currentQuestion.id}`} className="text-lg">
                                Your Answer
                            </Label>
                            <Input
                            id={`question-${currentQuestion.id}`}
                            type = {currentQuestion.type}
                            value = {responses[currentQuestion.id] || ""}
                            onChange={(e)=> handleChange(currentQuestion.id, e.target.value)}
                            className="text-center h-12 text-lg"
                            />
                            {!responses[currentQuestion.id] && (<p className="text-red-500 text-sm">this field is required.</p>)}

                            {/*validations*/}
                            {currentQuestion.title.toLowerCase().includes("age") &&
                            responses[currentQuestion.id] &&
                            (parseInt(responses[currentQuestion.id]) < 0) && (<p className="text-red-500 text-sm">Value should be above 0.</p>)
                            }
                            {currentQuestion.title.toLowerCase().includes("annual income") &&
                            responses[currentQuestion.id] &&
                            (parseInt(responses[currentQuestion.id]) < 0) && (<p className="text-red-500 text-sm">Value should be above 0.</p>)
                            }


                        </div>
                        <div className="flex justify-between pt-6">
                            <Button
                            type="button"
                            onClick={prevStep}
                            disabled={currentStep===0}
                            variant="outline"
                            className="h-10 px-6"
                            >Previous</Button>
                            {currentStep < questions.length -1?
                            (<Button disabled={!responses[currentQuestion.id]} type="button" onClick={nextStep} className="h-10 px-6">Next</Button>):
                            <Button disabled={!responses[currentQuestion.id]} type="button" onClick={handleSubmit} className="h-10 px-6">Submit</Button>}
                        </div>


                    </CardContent>
                </Card>
            </form>
        </div>

    </div>
  )
}

export default SurveyPage