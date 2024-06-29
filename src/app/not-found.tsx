/**
 * v0 by Vercel.
 * @see https://v0.dev/t/8OxJV76VVf0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-md text-center space-y-4">
        <CompassIcon className="mx-auto h-24 w-24 text-gray-500 dark:text-gray-400" />
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Oops, the page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
          href="/"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {
  // Define any specific props your component expects, if any
}


function CompassIcon(props: ChevronDownIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}