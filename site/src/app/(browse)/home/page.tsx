import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Star, Trophy } from 'lucide-react';
import { BrowseHeader } from '@/components/typography/BrowseHeader';
import Image from 'next/image';
import Link from 'next/link';
import { LinkButton } from '@/components/link-button/link-button';

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Title and tagline */}
      <div>
        <BrowseHeader>Review Leetcode Questions</BrowseHeader>
        <p className="text-muted-foreground text-sm mb-4">
          Does it take more than hour for you to solve that Leetcode Medium you
          used to be able to do in 15 minutes?{' '}
          <span className="bg-primary text-primary-foreground rounded px-1">
            Never lose your edge with Recode.ai
          </span>
        </p>
        <p className="text-muted-foreground text-sm">
          Go Gengar mode on your prep and quickly review high level ideas and
          approachs to a wide breadth of questions in just minutes.{' '}
          <Image
            className="inline-block align-text-top"
            width={16}
            height={16}
            src="/gengarheheq.png"
            alt="gengarheheq"
          />
        </p>
      </div>

      {/* Show summary stats if logged in, else show CTA to sign up to save your progress */}
      <StatsOrLoginCard />

      {/* Featured Lesson */}
      <FeaturedLesson />
    </div>
  );
}

// TODO: Make this a client component with more enriched data
const StatsOrLoginCard = () => (
  <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
    <Card className="flex-shrink-0 w-32 sm:w-40">
      <CardHeader className="py-2">
        <CardTitle className="text-xs text-muted-foreground">Streak</CardTitle>
        <div className="text-xl font-bold">7 days</div>
      </CardHeader>
    </Card>
    <Card className="flex-shrink-0 w-32 sm:w-40">
      <CardHeader className="py-2">
        <CardTitle className="text-xs text-muted-foreground">Solved</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">124</span>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </div>
      </CardHeader>
    </Card>
    <Card className="flex-shrink-0 w-32 sm:w-40">
      <CardHeader className="py-2">
        <CardTitle className="text-xs text-muted-foreground">Success</CardTitle>
        <div className="space-y-1">
          <div className="text-xl font-bold">67%</div>
          <Progress value={67} className="h-1" />
        </div>
      </CardHeader>
    </Card>
  </div>
);

// TODO: Make this a client component with more enriched data
const FeaturedLesson = () => (
  <Card className="relative overflow-hidden border-2 border-primary">
    <CardHeader>
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="absolute top-3 right-3">
          Featured
        </Badge>
      </div>
      <CardTitle className="text-xl sm:text-2xl">Grind 75</CardTitle>
      <CardDescription className="text-base">
        Go through the most important questions, inspired by the "Grind 75"
        list.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Brain className="h-4 w-4" />
          <span>75 Problems • 2 hours</span>
        </div>
        <LinkButton href="/study-session">Start Lesson</LinkButton>
      </div>
    </CardContent>
  </Card>
);
