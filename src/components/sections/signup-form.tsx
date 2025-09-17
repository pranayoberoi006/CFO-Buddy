
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import countries from "@/lib/countries.json";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email id." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  countryCode: z.string().min(1, { message: "Please select a country code." }),
  mobile: z.string().min(5, { message: "Please enter a valid phone number." }),
  country: z.string().min(1, { message: "Please select your country." }),
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


export function SignupForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      countryCode: "+91",
      mobile: "",
      country: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        if (user) {
            await updateProfile(user, {
                displayName: values.name,
            });
        }
        
        toast({
          title: "Account Created!",
          description: "Account created successfully! Please log in.",
        });
        router.push('/login');

    } catch (error: any) {
        console.error("Error signing up:", error);
        if (error.code === 'auth/email-already-in-use') {
            toast({
              title: "Sign-up Failed",
              description: "This email address is already in use.",
              variant: "destructive",
            });
        } else {
            toast({
              title: "Sign-up Failed",
              description: "Failed to create an account. Please try again.",
              variant: "destructive",
            });
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

  return (
    <section className="py-16 sm:py-24">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:flex justify-center">
          <Image
            src="https://picsum.photos/seed/signup/600/600"
            alt="Decorative image for sign up page"
            width={500}
            height={500}
            className="rounded-lg shadow-xl"
            data-ai-hint="abstract geometric"
          />
        </div>
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Create an Account
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join CFO Buddy and start making smarter financial decisions today.
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormLabel>Set Password</FormLabel>
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
               <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-28">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.dial_code}>
                              {country.dial_code} ({country.code})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                    )}
                  />
                </div>
                <FormMessage>{form.formState.errors.mobile?.message || form.formState.errors.countryCode?.message}</FormMessage>
              </FormItem>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country/Region</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.name} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full transition-transform duration-300 hover:scale-105" size="lg" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
