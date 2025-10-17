'use server';

import { recommendLearningResources, RecommendLearningResourcesInput, RecommendLearningResourcesOutput } from "@/ai/flows/recommend-learning-resources";
import { z } from "zod";

const ResourceFinderSchema = z.object({
  subject: z.string().min(2, "Subject must be at least 2 characters."),
  gradeLevel: z.string().min(1, "Grade level is required."),
  skillLevel: z.string().min(1, "Skill level is required."),
  lessonPlan: z.string().min(10, "Lesson plan must be at least 10 characters."),
});

type State = {
  message?: string;
  errors?: {
    subject?: string[];
    gradeLevel?: string[];
    skillLevel?: string[];
    lessonPlan?: string[];
  };
  resources?: RecommendLearningResourcesOutput['resources'];
};

export async function findResources(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = ResourceFinderSchema.safeParse({
    subject: formData.get('subject'),
    gradeLevel: formData.get('gradeLevel'),
    skillLevel: formData.get('skillLevel'),
    lessonPlan: formData.get('lessonPlan'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Find Resources.',
    };
  }

  try {
    const { resources } = await recommendLearningResources(validatedFields.data as RecommendLearningResourcesInput);
    return { message: "Resources found successfully.", resources };
  } catch (error) {
    return { message: "Failed to find resources. Please try again." };
  }
}
