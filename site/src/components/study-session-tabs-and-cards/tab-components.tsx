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
import { Json } from '@/types/database.types';
import { KaggleDatasetQuestionMetadata } from '@/zod/kaggle_dataset_v0';

export const PromptTab = () => (
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

export const GameTab = () => (
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

interface DescriptionTabProps {
  data: {
    promptKey: number;
    promptKind: string;
    promptData: Json;
  };
}

export const DescriptionTab = ({ data }: DescriptionTabProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Description</CardTitle>
      <CardDescription>
        Read up on the original question before reviewing.
      </CardDescription>
    </CardHeader>
    <DescriptionTabVersionControl data={data} />
  </Card>
);

const DescriptionTabVersionControl = ({ data }: DescriptionTabProps) => {
  if (data.promptKind === 'kaggle/erichartford/leetcode-solutions-combined') {
    return <DescriptionTabForKaggleDataset data={data} />;
  }

  return <div>Unable to match prompt kind against any UI components</div>;
};

const DescriptionTabForKaggleDataset = ({ data }: DescriptionTabProps) => {
  const {
    data: parsedData,
    success: parseSuccess,
    error: parseError,
  } = KaggleDatasetQuestionMetadata.safeParse(data.promptData);

  if (parseError || !parseSuccess) {
    console.error(parseError);
    return <div>Something went wrong parsing DescriptionTab</div>;
  }

  return <CardContent className="space-y-2">{parsedData.content}</CardContent>;
};
