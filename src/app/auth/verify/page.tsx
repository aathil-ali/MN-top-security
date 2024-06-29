import { SignIn } from "@/components/sign-in"
import { SignUp } from "@/components/sign-up";
import VerifyEmail from "@/components/verify-email";
import dynamic from "next/dynamic";


const DynamicCourse = dynamic(() => import('@/components/verify-email'), {
    ssr: false, // Disable server-side rendering for this component
});

export default function HomePage() {
    return (

        <main >

            <DynamicCourse />



        </main>
    );
}
