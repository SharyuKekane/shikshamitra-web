"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Eraser, Type, Circle, Square, Minus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function WhiteboardPage() {
  return (
    <TooltipProvider>
      <main className="flex h-full flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Interactive Whiteboard</h1>
          <div className="flex items-center gap-2">
              <Button variant="outline">Share</Button>
              <Button>Save</Button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-[auto,1fr] gap-4">
          <Card className="flex flex-col items-center gap-2 p-2 h-fit bg-card">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="bg-accent text-accent-foreground"><Pen className="h-5 w-5"/></Button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Pen</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon"><Eraser className="h-5 w-5"/></Button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Eraser</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon"><Type className="h-5 w-5"/></Button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Text</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon"><Circle className="h-5 w-5"/></Button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Circle</p></TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon"><Square className="h-5 w-5"/></Button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Square</p></TooltipContent>
              </Tooltip>
               <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon"><Minus className="h-5 w-5"/></Button>
                </TooltipTrigger>
                <TooltipContent side="right"><p>Line</p></TooltipContent>
              </Tooltip>
          </Card>
          <Card className="overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                  <Textarea 
                      placeholder="Start collaborating..."
                      className="w-full h-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none text-lg p-6 bg-card"
                  />
              </CardContent>
          </Card>
        </div>
      </main>
    </TooltipProvider>
  );
}
