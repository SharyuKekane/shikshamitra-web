'use server';

/**
 * @fileOverview AI flow to recommend relevant learning resources based on a lesson plan.
 *
 * - recommendLearningResources - Function to get learning resource recommendations.
 * - RecommendLearningResourcesInput - Input type for the function.
 * - RecommendLearningResourcesOutput - Output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendLearningResourcesInputSchema = z.object({
  lessonPlan: z
    .string()
    .describe('The lesson plan for which resources are needed.'),
  gradeLevel: z.string().describe('The grade level of the lesson plan.'),
  subject: z.string().describe('The subject of the lesson plan.'),
  skillLevel: z
    .string()
    .describe(
      'The skill level of the students (e.g., beginner, intermediate, advanced).'
    ),
});
export type RecommendLearningResourcesInput = z.infer<
  typeof RecommendLearningResourcesInputSchema
>;

const LearningResourceSchema = z.object({
  title: z.string().describe('The title of the resource.'),
  url: z.string().url().describe('The URL of the resource.'),
  type: z.string().describe('The type of resource (e.g., article, video, interactive).'),
  suitability: z.string().describe('An assessment of how suitable the resource is for use in the classroom, and for the specified skill level.'),
});

const RecommendLearningResourcesOutputSchema = z.object({
  resources: z.array(LearningResourceSchema).describe('A list of recommended learning resources.'),
});

export type RecommendLearningResourcesOutput = z.infer<
  typeof RecommendLearningResourcesOutputSchema
>;

export async function recommendLearningResources(
  input: RecommendLearningResourcesInput
): Promise<RecommendLearningResourcesOutput> {
  return recommendLearningResourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendLearningResourcesPrompt',
  input: {
    schema: RecommendLearningResourcesInputSchema,
  },
  output: {
    schema: RecommendLearningResourcesOutputSchema,
  },
  prompt: `You are an expert educational resource curator. Given a lesson plan, grade level, subject, and skill level, you will recommend relevant articles, videos, and interactive resources that can enhance the learning experience.

  Lesson Plan: {{{lessonPlan}}}
  Grade Level: {{{gradeLevel}}}
  Subject: {{{subject}}}
  Skill Level: {{{skillLevel}}}

  Please provide a list of resources with their title, URL, type, and an assessment of how suitable the resource is for use in the classroom, and for the specified skill level.

  Format your output as a JSON object with a "resources" field containing an array of resource objects. Each resource object should have the fields "title", "url", "type", and "suitability".
  `,
});

const recommendLearningResourcesFlow = ai.defineFlow(
  {
    name: 'recommendLearningResourcesFlow',
    inputSchema: RecommendLearningResourcesInputSchema,
    outputSchema: RecommendLearningResourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
