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
import { GengarIcon } from '@/components/icons/gengar-icon';
import Image from 'next/image';

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

      {/* More Lessons Grid */}
      <MoreLessons />
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
      <CardTitle className="text-xl sm:text-2xl">
        Dynamic Programming Basics
      </CardTitle>
      <CardDescription className="text-base">
        Master the fundamentals of DP with 5 carefully selected problems
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Brain className="h-4 w-4" />
          <span>5 Problems • 2 hours</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span>4.9</span>
          </div>
        </div>
        <Button className="w-full sm:w-auto">
          Start Lesson
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

// TODO: Make this a client component with more enriched data
const MoreLessons = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold tracking-tight">More Lessons</h2>
      <Button variant="ghost" className="text-sm">
        View all
      </Button>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="flex flex-col">
        <CardHeader>
          <Badge variant="destructive" className="w-fit">
            Hard
          </Badge>
          <CardTitle className="mt-2">Graph Algorithms</CardTitle>
          <CardDescription>
            Advanced graph problems focusing on shortest paths
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>4 Problems • 3h</span>
          </div>
        </CardContent>
        <div className="p-4 pt-0">
          <Button variant="outline" className="w-full">
            Start Lesson
          </Button>
        </div>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            New
          </Badge>
          <CardTitle className="mt-2">Binary Trees</CardTitle>
          <CardDescription>
            Common patterns for solving tree-based problems
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>6 Problems • 2.5h</span>
          </div>
        </CardContent>
        <div className="p-4 pt-0">
          <Button variant="outline" className="w-full">
            Start Lesson
          </Button>
        </div>
      </Card>

      <Card className="flex flex-col sm:hidden lg:flex">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            Popular
          </Badge>
          <CardTitle className="mt-2">Array Techniques</CardTitle>
          <CardDescription>
            Essential array manipulation strategies
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>5 Problems • 2h</span>
          </div>
        </CardContent>
        <div className="p-4 pt-0">
          <Button variant="outline" className="w-full">
            Start Lesson
          </Button>
        </div>
      </Card>
    </div>
  </div>
);
