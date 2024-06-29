// pages/dashboard/index.tsx
"use client";
import dynamic from 'next/dynamic';

import { Course } from "@/components/course";

const DynamicCourse = dynamic(() => import('@/components/course'), {
    ssr: false, // Disable server-side rendering for this component
  });

export default function Courses() {

   
        return (
            <main>
      <DynamicCourse />
            </main>
        );
    

}
