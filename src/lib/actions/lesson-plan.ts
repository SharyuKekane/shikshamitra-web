'use server';

import { generateLessonPlan, GenerateLessonPlanInput } from "@/ai/flows/generate-lesson-plan";
import { z } from "zod";

const LessonPlanSchema = z.object({
  subject: z.string().min(2, "Subject must be at least 2 characters."),
  gradeLevel: z.string().min(1, "Grade level is required."),
  learningObjectives: z.string().min(10, "Learning objectives must be at least 10 characters."),
});

type State = {
  message?: string;
  errors?: {
    subject?: string[];
    gradeLevel?: string[];
    learningObjectives?: string[];
  };
  lessonPlan?: string;
};

export async function createLessonPlan(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = LessonPlanSchema.safeParse({
    subject: formData.get('subject'),
    gradeLevel: formData.get('gradeLevel'),
    learningObjectives: formData.get('learningObjectives'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Lesson Plan.',
    };
  }

  try {
    const { lessonPlan } = await generateLessonPlan(validatedFields.data as GenerateLessonPlanInput);
    return { message: "Lesson plan generated successfully.", lessonPlan };
  } catch (error) {
    return { message: "Failed to generate lesson plan. Please try again." };
  }
}
