import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import validator from "validator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { FirebaseError } from "firebase/app";
import { getFriendlyErrorMessageForSignup } from "@/components/utils/firebaseUtils";
import { useEffect } from "react";
import { generateAvatarUrl } from "@/components/utils";

export function SignupPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });

    return unsubscribe;
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Data Extraction
      const [firstName, lastName, email, password] = Array.from(
        e.currentTarget.elements
      )
        .filter((el): el is HTMLInputElement => el instanceof HTMLInputElement)
        .map((el: HTMLInputElement) => el.value);

      // Error cases
      if (password.length < 6)
        throw new Error("Password must be at least 6 characters long");
      if (!validator.isEmail(email)) throw new Error("Email should be valid.");

      // Create user
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser!, {
        displayName: `${firstName} ${lastName}`,
        photoURL: generateAvatarUrl(user.user.uid),
      });

      toast({
        variant: "default",
        title: "Account created",
        description: `Welcome, ${user.user.displayName}`,
      });

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        let errorDescription = error.message;
        if (error instanceof FirebaseError)
          errorDescription = getFriendlyErrorMessageForSignup(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: errorDescription,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while creating your account",
        });
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Robinson" required />
                </div>
              </div>
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
                <Input id="password" placeholder="********" type="password" />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupPage;
