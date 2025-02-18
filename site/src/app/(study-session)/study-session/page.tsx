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

const AccountTab = () => (
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

const PasswordTab = () => (
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
  account: { title: 'Account', component: AccountTab },
  password: { title: 'Password', component: PasswordTab },
};

export default function StudySession() {
  return (
    <div className="w-full w-max-md p-4">
      <Progress value={20} className="mb-4" />
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          {Object.entries(TabComponents).map(([key, value]) => (
            <TabsTrigger value={key}>{value.title}</TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(TabComponents).map(([key, value]) => (
          <TabsContent value={key}>{value.component()}</TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
