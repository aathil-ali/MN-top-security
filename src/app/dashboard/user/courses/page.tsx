"use client";
import dynamic from 'next/dynamic';

// Dynamically import the Course component
const DynamicCourse = dynamic(() => import('@/components/course').then(module => module.Course), {
    ssr: false, // Disable server-side rendering for this component
  });

export default function Courses() {
    return (
        <main>
            <DynamicCourse />
        </main>
    );
}