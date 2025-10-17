"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { findResources } from '@/lib/actions/resource-recommender';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, ExternalLink } from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? 'Searching...' : 'Find Resources'}
    </Button>
  );
}

export default function ResourceFinderPage() {
  const initialState = { message: undefined, errors: {}, resources: undefined };
  const [state, dispatch] = useFormState(findResources, initialState);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Finder</CardTitle>
            <CardDescription>Describe a lesson plan to find relevant articles, videos, and interactive resources.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={dispatch} className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="e.g., Biology" />
                   {state.errors?.subject && <p className="text-sm text-destructive">{state.errors.subject[0]}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gradeLevel">Grade Level</Label>
                  <Input id="gradeLevel" name="gradeLevel" placeholder="e.g., 10th Grade" />
                   {state.errors?.gradeLevel && <p className="text-sm text-destructive">{state.errors.gradeLevel[0]}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skillLevel">Student Skill Level</Label>
                  <Select name="skillLevel" required>
                    <SelectTrigger id="skillLevel">
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                   {state.errors?.skillLevel && <p className="text-sm text-destructive">{state.errors.skillLevel[0]}</p>}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lessonPlan">Lesson Plan Summary</Label>
                <Textarea id="lessonPlan" name="lessonPlan" placeholder="Paste or summarize your lesson plan here..." className="min-h-[150px]" />
                 {state.errors?.lessonPlan && <p className="text-sm text-destructive">{state.errors.lessonPlan[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {state.resources && (
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                <Bot className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Recommended Resources</h2>
             </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {state.resources.map((resource, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">{resource.suitability}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                        View Resource <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        {state.message && !state.resources && <p className="text-sm text-destructive">{state.message}</p>}
      </div>
    </main>
  );
}
