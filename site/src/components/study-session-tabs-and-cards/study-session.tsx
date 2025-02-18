'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, NotebookPen } from 'lucide-react';

const PromptTab = () => (
  <Card>
    <CardHeader>
      <CardTitle>Account</CardTitle>
      <CardDescription>
        Make changes to your account here. Click save when you're done.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Pedro Duarte" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@peduarte" />
      </div>
    </CardContent>
    <CardFooter>
      <Button>Save changes</Button>
    </CardFooter>
  </Card>
);

const GameTab = () => (
  <Card>
    <CardHeader>
      <CardTitle>Password</CardTitle>
      <CardDescription>
        Change your password here. After saving, you'll be logged out.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor="current">Current password</Label>
        <Input id="current" type="password" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="new">New password</Label>
        <Input id="new" type="password" />
      </div>
    </CardContent>
    <CardFooter>
      <Button>Save password</Button>
    </CardFooter>
  </Card>
);

const TabComponents = {
  prompt: { title: () => 'Prompt', component: PromptTab },
  game: { title: () => 'Game', component: GameTab },
  scrap: {
    title: () => (
      <div className="flex flex-col justify-center h-[1.25rem]">
        <NotebookPen size={'14px'} />
      </div>
    ),
    component: () => null,
  },
};

export function StudySessionClient() {
  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <ArrowLeft />
        <Progress value={20} />
      </div>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-[3fr_3fr_1fr]">
          {Object.entries(TabComponents).map(([key, value]) => (
            <TabsTrigger value={key}>{value.title()}</TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(TabComponents).map(([key, value]) => (
          <TabsContent value={key}>{value.component()}</TabsContent>
        ))}
      </Tabs>
    </>
  );
}
