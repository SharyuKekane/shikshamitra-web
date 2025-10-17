"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { createLessonPlan } from '@/lib/actions/lesson-plan';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? 'Generating...' : 'Generate Plan'}
    </Button>
  );
}

export default function LessonPlannerPage() {
  const { toast } = useToast();
  const initialState = { message: undefined, errors: {}, lessonPlan: undefined };
  const [state, dispatch] = useFormState(createLessonPlan, initialState);

  const handleCopy = () => {
    if (state.lessonPlan) {
      navigator.clipboard.writeText(state.lessonPlan);
      toast({
        title: "Copied to clipboard!",
        description: "The lesson plan has been copied.",
      });
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lesson Plan Generator</CardTitle>
            <CardDescription>Fill in the details below to generate a new lesson plan with AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={dispatch} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="e.g., Algebra I" />
                {state.errors?.subject && <p className="text-sm text-destructive">{state.errors.subject[0]}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gradeLevel">Grade Level</Label>
                <Input id="gradeLevel" name="gradeLevel" placeholder="e.g., 9th Grade" />
                {state.errors?.gradeLevel && <p className="text-sm text-destructive">{state.errors.gradeLevel[0]}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="learningObjectives">Learning Objectives</Label>
                <Textarea id="learningObjectives" name="learningObjectives" placeholder="e.g., Students will be able to solve linear equations..." className="min-h-[100px]" />
                {state.errors?.learningObjectives && <p className="text-sm text-destructive">{state.errors.learningObjectives[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {state.lessonPlan && (
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="space-y-1.5">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-6 w-6" />
                  Generated Lesson Plan
                </CardTitle>
                <CardDescription>Here is the AI-generated lesson plan. You can copy it or use it to find resources.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCopy}>
                <Clipboard className="h-4 w-4" />
                <span className="sr-only">Copy</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap rounded-md border bg-muted p-4 font-mono text-sm">
                {state.lessonPlan}
              </div>
            </CardContent>
          </Card>
        )}
        {state.message && !state.lessonPlan && <p className="text-sm text-destructive">{state.message}</p>}
      </div>
    </main>
  );
}
