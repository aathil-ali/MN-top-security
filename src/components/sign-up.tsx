"use client";

import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { account } from "@/lib/server/appwrite"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(email, password, firstName, lastName, phone);
      toast({
        description: "Sign Up Successful.",
      });

      router.push('/dashboard/user'); // Redirect to dashboard
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during sign up. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setError(error.message || 'An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            alt="Company Logo"
            className="mx-auto"
            height={48}
            src="/images/mn-top-security-logo-new-black.png"
            style={{
              aspectRatio: '48/48',
              objectFit: 'cover',
            }}
            width={48}
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up for a new account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or <span>  </span>
            <Link className="font-medium text-indigo-600 hover:text-indigo-500" href="/auth/signIn">
              sign in to your account
            </Link>
          </p>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <Label className="sr-only" htmlFor="first-name">
              First Name
            </Label>
            <Input
              autoComplete="given-name"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="first-name"
              name="first-name"
              placeholder="First Name"
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="last-name">
              Last Name
            </Label>
            <Input
              autoComplete="family-name"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="last-name"
              name="last-name"
              placeholder="Last Name"
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              autoComplete="email"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="email"
              name="email"
              placeholder="Email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="phone">
              Phone
            </Label>
            <Input
              autoComplete="tel"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="phone"
              name="phone"
              placeholder="Phone"
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              autoComplete="new-password"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="password"
              name="password"
              placeholder="Password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="confirm-password">
              Confirm Password
            </Label>
            <Input
              autoComplete="new-password"
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <Button
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}