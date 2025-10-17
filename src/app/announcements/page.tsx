"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  avatar: string;
}

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Welcome to the new school year!",
    content: "We are excited to start a new year of learning and growth. Please make sure to check the portal regularly for updates.",
    author: "Principal Smith",
    date: "Sep 1, 2024",
    avatar: "https://placehold.co/40x40.png",
  },
  {
    id: 2,
    title: "Parent-Teacher Conferences",
    content: "Parent-teacher conferences will be held next week on October 15th and 16th. Please sign up for a slot.",
    author: "Admin Office",
    date: "Sep 28, 2024",
    avatar: "https://placehold.co/40x40.png",
  },
  {
    id: 3,
    title: "Science Fair Project Deadline",
    content: "A friendly reminder that all science fair projects are due this Friday. Good luck to all participants!",
    author: "Mr. Davis",
    date: "Oct 5, 2024",
    avatar: "https://placehold.co/40x40.png",
  },
];

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const { toast } = useToast();

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please fill in both title and content.",
        });
        return;
    }
    const newAnnouncement: Announcement = {
        id: announcements.length + 1,
        title: newTitle,
        content: newContent,
        author: "You (Teacher)",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        avatar: "https://placehold.co/40x40.png",
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setNewTitle('');
    setNewContent('');
    toast({
        title: "Success!",
        description: "Your announcement has been sent.",
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>New Announcement</CardTitle>
              <CardDescription>Compose and send a new announcement to students and parents.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSendAnnouncement}>
              <CardContent className="space-y-4">
                <Input 
                    placeholder="Title" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <Textarea 
                    placeholder="What's on your mind?" 
                    className="min-h-[120px]"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Send Announcement</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
                <Bell className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Recent Announcements</h2>
            </div>
          {announcements.map((ann) => (
            <Card key={ann.id}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                   <Avatar className="h-10 w-10">
                      <AvatarImage src={ann.avatar} alt={ann.author} data-ai-hint="person portrait" />
                      <AvatarFallback>{ann.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle>{ann.title}</CardTitle>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground pt-1">
                        <span>{ann.author}</span>
                        <span>&middot;</span>
                        <span>{ann.date}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{ann.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
