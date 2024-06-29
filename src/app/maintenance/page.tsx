import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

const Maintenance = () => {
    return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <img src="/images/mn-top-security-logo-new-black.png" width={100} height={100} alt="MN Top Security" className="mx-auto mb-6" />
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Site Undergoing Maintenance</h1>
        <p className="mt-4 text-muted-foreground">
          We apologize for the inconvenience. Our website is currently undergoing scheduled maintenance to improve your
          experience.
        </p>
        <Collapsible className="mt-6">
          <CollapsibleTrigger className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Show More <ChevronDownIcon className="ml-2 h-4 w-4 transition-all [&[data-state=open]]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 text-left text-muted-foreground">
            <p>
              We are working hard to ensure that our website is back up and running as soon as possible. During this
              time, you may experience some disruptions or unavailability of certain features.
            </p>
            <p className="mt-4">
              If you have any urgent inquiries, please feel free to contact our customer support team at{" "}
              <a href="#" className="text-primary underline">
                support@mntopsecurity.com
              </a>
              . We appreciate your patience and understanding.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );


  interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {
    // Define any specific props your component expects, if any
  }
  
  function ChevronDownIcon(props: ChevronDownIconProps) {
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
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
  }
  
  };
  
  export default Maintenance;// app/maintenance/page.tsx
 