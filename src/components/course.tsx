/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/GxcaSUNn86A
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:


To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

import { Button } from "@/components/ui/button";

import Link from "next/link";
import {
  CarouselItem,
  CarouselContent,
  Carousel,
} from "@/components/ui/carousel";
import Module from "./user/Module";
import { useEffect, useState } from "react";
import { Quiz } from "./quiz";
import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { checkUserPassed, modulesCollection } from "@/lib/server/appwrite"; // Import your Appwrite instance
import { RefreshCwIcon, MoveLeft } from "lucide-react";
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRouter } from 'next/navigation'; // Ensure this is the correct import

export function Course() {

  interface Module {
    $id: string; // Appwrite automatically assigns an ID, so it's not optional here
    name: string;
    pages: number;
    index: number;
    duration: string
    // Add more fields as needed
  }
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [dBLoader, setDBLoader] = useState(null);
  const [passedModules, setPassedModules] = useState(null);
  const { user, loading } = useAuth();


  const [selectedLink, setSelectedLink] = useState("Content"); // Default to showing content

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      userPassed();
    }
  }, [loading, user]);

  const userPassed = async () => {
    console.log(user);
    const isUserPassed = await checkUserPassed(user.$id);
    setPassedModules(isUserPassed?.passedAllModules ?? null);
    console.log("The User complted --- ", isUserPassed);

  }
  const handleModuleClick = (moduleId) => {
    const selected = modules.find((module) => module.$id === moduleId);
    setSelectedModule(selected);
    setSelectedLink("Content"); // Reset the selected link
  };

  const handleLinkClick = (linkType) => {
    setSelectedLink(linkType);
  };



  const fetchModules = async () => {
    try {
      const response = await modulesCollection;

      console.log("Response", response);

      const fetchedModules = response.documents.map((document, index) => ({
        $id: document.$id,
        name: document.name,
        pages: document.pages,
        duration: document.Duration,
        index: index + 1, // Add an index to determine the module number
        // Add more fields as needed
      }));


      console.log("MODULES", fetchedModules);
      setModules(fetchedModules);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };
  const handleDownloadCertificate = async (e) => {
    e.preventDefault();

    const name = "Aathil Thadathil";
    const date = new Date().toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

    setDBLoader(true);

    try {
      const response = await fetch('/api/generate_certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, date }),
      });

      if (response.ok) {
        setDBLoader(false);

        const data = await response.json();
        const fileUrl = data.fileUrl;

        if (fileUrl) {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL}${fileUrl}`;
          const a = document.createElement('a');
          a.href = url;
          a.download = 'certificate.pdf';
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          console.error('File URL not found in the response');
        }
      } else {
        console.error('Failed to generate certificate');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const router = useRouter();

  const handleDashboardRedirect = () => {
    router.push('/dashboard/user');
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-[300px_1fr] bg-gray-100 dark:bg-gray-800">
      <div className="border-r bg-white p-6 shadow-sm dark:bg-gray-950 course">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Course Modules</h2>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <Accordion type="single" collapsible>
              {modules.map((module) => (
                <AccordionItem key={module.$id} value={module.$id}>
                  <AccordionTrigger onClick={() => handleModuleClick(module.$id)}>
                    {" "}
                    <h3 className="text-base font-semibold">{module.name} - ({module.duration}:00 Hrs) </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 space-y-2">
                      <Link
                        className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                        href="#"
                        onClick={() => handleLinkClick("Content")}

                      >
                        <span>Presentation</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleLinkClick("Content")}

                        >
                          <PlayIcon className="h-5 w-5" />
                          <span className="sr-only">Start</span>
                        </Button>
                      </Link>
                      <Link
                        className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                        href="#"
                        onClick={() => handleLinkClick("Quiz")}

                      >
                        <span>Quiz</span>
                        <Button
                          size="icon"
                          variant="ghost"
                        >
                          <PlayIcon className="h-5 w-5" />
                          <span className="sr-only">Start</span>
                        </Button>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>


      <div className="p-6 flex flex-col items-center w-full module">
        <div className="flex justify-between w-full mb-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={handleDownloadCertificate}
                    disabled={!passedModules}
                  >
                    {dBLoader ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <DownloadIcon className="w-4 h-4 mr-2" />
                    )}
                    Download Certificate
                  </Button>



                </span>

              </TooltipTrigger>
              {!passedModules && (
                <TooltipContent>
                  <p>You must pass all modules to download the certificate.</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" className="flex items-center" onClick={handleDashboardRedirect}
          >
            <MoveLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>

        </div>

        {selectedModule ? (
          selectedLink === "Content" ? (
            <Module
              key={`${selectedModule.$id}-content`}
              filePaths={Array.from(
                { length: selectedModule.pages },
                (_, i) => `/docs/module_${selectedModule.index}/${i + 1}.pdf`
              )}
            />
          ) : (
            <Quiz key={`${selectedModule.$id}-quiz`} id={selectedModule.index} />
          )
        ) : (
          <div>Select a module to view its content or quiz</div>
        )}
      </div>
    </div>
  );
}

function DownloadIcon(props) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function PlayIcon(props) {
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
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
