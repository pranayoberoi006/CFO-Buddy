
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email id." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email id." }),
});

const googleProvider = new GoogleAuthProvider();

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <title>Google Logo</title>
      <clipPath id="g">
        <path d="M40,23.51c0-1.69-.15-3.32-.43-4.88H24v9.25h8.92c-.38,2.98-1.55,5.5-3.81,7.25v6h7.71C40.92,37.38,44,31.11,44,24c0-.25,0-.5-.05-.74.05.24.05.49.05.74Z" />
      </clipPath>
      <path d="M40,23.51c0-1.69-.15-3.32-.43-4.88H24v9.25h8.92c-.38,2.98-1.55,5.5-3.81,7.25v6h7.71C40.92,37.38,44,31.11,44,24c0-.25,0-.5-.05-.74.05.24.05.49.05.74Z" fill="#4285f4" />
      <path clipPath="url(#g)" d="M24,44c6.34,0,11.69-2.1,15.58-5.69L31.87,32.6c-2.1,1.42-4.8,2.25-7.87,2.25-6.02,0-11.12-4.04-12.94-9.5H4v6.19C7.88,38.2,15.28,44,24,44Z" fill="#34a853" />
      <path d="M11.06,28.5c-.48-1.42-.76-2.92-.76-4.5s.28-3.08,.76-4.5V13.31H4C2.79,15.99,2,19.33,2,23c0,3.67,.79,7.01,2,9.69Z" fill="#fbbc04" />
      <path d="M24,11.25c3.42,0,6.23,1.18,8.5,3.31l6.73-6.73C35.69,1.89,30.34,0,24,0,15.28,0,7.88,5.8,4,13.31l7.06,6.19c1.82-5.46,6.92-9.5,12.94-9.5Z" fill="#ea4335" />
    </svg>
  );
}


export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [isForgotPending, startForgotTransition] = React.useTransition();
  const [isForgotModalOpen, setForgotModalOpen] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast({
                title: "Login Successful!",
                description: "Redirecting to your dashboard.",
            });
            router.push('/dashboard');
        } catch (error: any) {
             if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
                toast({
                    title: "Login Failed",
                    description: "Invalid email or password.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Login Failed",
                    description: "An unexpected error occurred. Please try again.",
                    variant: "destructive",
                });
                console.error("Error signing in:", error);
            }
        }
    });
  }
  
  const handleGoogleSignIn = () => {
    startTransition(async () => {
      try {
        await signInWithPopup(auth, googleProvider);
        toast({
          title: "Login Successful!",
          description: "Redirecting to your dashboard.",
        });
        router.push('/dashboard');
      } catch (error: any) {
        // Don't show an error if the user closes the popup.
        if (error.code === 'auth/popup-closed-by-user') {
          return;
        }
        console.error("Google Sign-In Error:", error);
        if (error.code === 'auth/internal-error' || error.code === 'auth/invalid-api-key') {
             toast({
                title: "Google Sign-In Failed",
                description: "Authentication failed. Please check your Firebase configuration and ensure Google Sign-In is enabled in the console.",
                variant: "destructive",
            });
        } else {
            toast({
              title: "Google Sign-In Failed",
              description: "Could not sign in with Google. Please try again.",
              variant: "destructive",
            });
        }
      }
    });
  };

  function onForgotPasswordSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    startForgotTransition(async () => {
        try {
            await sendPasswordResetEmail(auth, values.email);
            toast({
                title: "Success",
                description: "Password reset email sent. Please check your inbox.",
            });
            setForgotModalOpen(false);
        } catch (error: any) {
            console.error("Error sending password reset email:", error);
            if (error.code === 'auth/user-not-found') {
                toast({
                    title: "Error",
                    description: "No user found with this email address.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to send password reset email. Please try again.",
                    variant: "destructive",
                });
            }
        }
    });
  }


  return (
    <>
      <section className="py-16 sm:py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Welcome Back
              </h2>
              <p className="mt-4 text-muted-foreground">
                Log in to your CFO Buddy account to continue.
              </p>
            </div>

            <Button variant="outline" className="w-full transition-transform duration-300 hover:scale-105" onClick={handleGoogleSignIn} disabled={isPending}>
              <GoogleIcon className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            
            <div className="flex items-center my-6">
                <Separator className="flex-1" />
                <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                <Separator className="flex-1" />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Id</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email id"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                       <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                         <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto text-sm"
                            onClick={() => setForgotModalOpen(true)}
                          >
                            Forgot password?
                          </Button>
                       </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full transition-transform duration-300 hover:scale-105" size="lg" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Log In
                </Button>
              </form>
            </Form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="hidden lg:flex justify-center">
            <Image
              src="https://picsum.photos/seed/login/600/600"
              alt="Decorative image for login page"
              width={500}
              height={500}
              className="rounded-lg shadow-xl"
              data-ai-hint="abstract geometric"
            />
          </div>
        </div>
      </section>

      <Dialog open={isForgotModalOpen} onOpenChange={setForgotModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <Form {...forgotPasswordForm}>
            <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-6 py-4">
              <FormField
                control={forgotPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setForgotModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isForgotPending}>
                  {isForgotPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Reset Link
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
