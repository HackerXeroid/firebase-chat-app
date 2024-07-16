import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const [email, password] = Array.from(e.currentTarget.elements).map(
      (el) => (el as HTMLInputElement).value
    );

    await signInWithEmailAndPassword(auth, email, password);
    toast({
      variant: "default",
      title: "Hurray!",
      description: "Login successful",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Invalid email or password",
    });
  }
};

export function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });

    return unsubscribe;
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={loginHandler} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="********"
                type="password"
                required
              />
            </div>
            <div className="flex flex-col border w-full gap-4">
              <Button className="w-full">Sign in</Button>
              {/* <Button
                variant="outline"
                className="w-full"
                onClick={googleLoginHandler}
              >
                Login with Google
              </Button> */}
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Create an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
