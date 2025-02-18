import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DescriptionTabDisplayProps } from '@/types/study-session.types';

export const PromptDisplayWithTabs = ({ data }: DescriptionTabDisplayProps) => (
  <Tabs defaultValue={'description'}>
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value={'description'}>Description</TabsTrigger>
      <TabsTrigger value={'solution'}>Solution</TabsTrigger>
    </TabsList>
    <TabsContent value={'description'}>
      <Card>
        <CardHeader>
          <CardTitle>
            {data.id}. {data.title}
          </CardTitle>
          {/* TODO ADD LEETCODE LINK */}
          <CardDescription>See the original question here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">{data.content}</CardContent>
      </Card>
    </TabsContent>
    <TabsContent value={'solution'}>
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
          <CardDescription>
            Read up on the original question before reviewing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">{data.answer}</CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);
