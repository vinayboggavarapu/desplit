import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"; 
import SignOutButton from "./sign-out-btn";

export default async function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Out</CardTitle>
        <CardDescription>
          By signing out you will be logged out of your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <SignOutButton />
        </div>
      </CardContent>
    </Card>
  );
}
