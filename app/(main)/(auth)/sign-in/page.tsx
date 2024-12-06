import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
  } from "@/components/ui/card";
  import SignInButton from "./sign-in-btn";
  
  export default async function LoginForm() {
    return (
      <Card className="mx-auto max-w-lg w-full">
        <CardHeader className="!space-y-4">
          <CardTitle className="text-3xl">DeSplit</CardTitle>
          <CardDescription>
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <SignInButton />
          </div>
        </CardContent>
      </Card>
    );
  }
  