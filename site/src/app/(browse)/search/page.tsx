import ProblemsPageClient from '@/components/layout/problems-page';
import { BrowseHeader } from '@/components/typography/BrowseHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Brain } from 'lucide-react';

export default async function SearchPage() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <BrowseHeader>Your sql (server) response</BrowseHeader>
      <ProblemsPageClient />
      <MoreLessons />
    </div>
  );
}

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
          <CardTitle className="mt-2">
            (Coming Soon) Specific Lesson Plans
          </CardTitle>
          <CardDescription>
            Soon you'll be able to create lesson plans and pick just a few
            questions to do at a time instead of all of them at once.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>4 Problems • 5min</span>
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
          <CardTitle className="mt-2">
            (Coming Soon) Specific Lesson Plans
          </CardTitle>
          <CardDescription>
            Soon you'll be able to create lesson plans and pick just a few
            questions to do at a time instead of all of them at once.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>6 Problems • 15min</span>
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
          <CardTitle className="mt-2">
            (Coming Soon) Specific Lesson Plans
          </CardTitle>
          <CardDescription>
            Soon you'll be able to create lesson plans and pick just a few
            questions to do at a time instead of all of them at once.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>5 Problems • 10min</span>
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
