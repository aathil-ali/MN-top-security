"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { account } from '@/lib/server/appwrite';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const userId = searchParams.get('userId');
      const secret = searchParams.get('secret');

      if (!userId || !secret) {
        setError('Invalid verification link.');
        return;
      }

      setLoading(true);

      try {
        await account.updateVerification(userId, secret);
        setVerified(true);
        toast({
          description: 'Email verified successfully. You can now sign in.',
        });
      } catch (err: any) {
        setError(err.message || 'An error occurred during verification. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, toast]);

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
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Email Verification
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {loading && (
            <div className="text-center text-gray-600">
              Verifying your email...
            </div>
          )}
          {verified && (
            <div className="text-center text-green-600">
              Your email has been verified successfully!
              <Button onClick={() => router.push('/signin')} className="mt-4">
                Sign In
              </Button>
            </div>
          )}
      
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;