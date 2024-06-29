import { SignIn } from "@/components/sign-in"
import Link from "next/link";

export default function HomePage() {
    return (

        <main >
  
            <SignIn>
                
            </SignIn>

            <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <img
                alt="Company Logo"
                className="mb-4"
                height={64}
                src="/images/mn-top-security-logo-new-black.png"
                style={{ aspectRatio: "64/64", objectFit: "cover" }}
                width={64}
              />
              <p className="text-gray-300">
                MN Top Security provides industry-leading training for security professionals. Our mission is to enhance the skills and knowledge of our students, preparing them for successful careers in security.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link className="hover:text-gray-300" href="#">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-300" href="#">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-300" href="#">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-300" href="#">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-300" href="#">
                    Account
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Contact Us</h3>
              <p className="text-gray-300">123 Security Lane, Safety City, SC 45678</p>
              <p className="text-gray-300">Email: info@mntopsecurity.com</p>
              <p className="text-gray-300">Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>
      </footer>


        </main>
        
    );
}
