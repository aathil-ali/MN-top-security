// pages/404.tsx
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          You will be redirected to the home page in a few seconds.
        </p>
        <Link href="/">
          <a className="mt-4 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Go back to Home
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
