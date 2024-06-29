import Link from "next/link";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { StarIcon } from "@heroicons/react/solid"; // Assuming you're using Heroicons
import { ChevronDownIcon, ClockIcon, MenuIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";

export function HomePage() {
  return (
    <>
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto py-12 px-4 md:py-20 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  alt="Company Logo"
                  className="mr-4"
                  height={48}
                  src="images/mn-top-security-logo-new-black.png"
                  style={{ aspectRatio: "48/48", objectFit: "cover" }}
                  width={48}
                />
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Become a Certified Security Guard</h1>
              </div>
              <p className="text-lg text-gray-300">
                Enroll in our comprehensive online security guard training course and kickstart your career in the security industry with MN Top Security.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  href="/auth/signIn"
                >
                  Get Started
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-md bg-transparent px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  href="#courses"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                alt="Online courses"
                className="rounded-lg object-cover"
                height={400}
                src="images/security-primary.jpg"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
                width={600}
              />
            </div>
          </div>
        </div>
      </header>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-4 md:py-6 md:px-6">
          <Link className="flex items-center" href="#our-courses">
            <img
              alt="Company Logo"
              className="mr-2"
              height={32}
              src="images/mn-top-security-logo-new-black.png"
              style={{ aspectRatio: "32/32", objectFit: "cover" }}
              width={32}
            />
            <span className="text-xl font-bold">MN Top Security</span>
          </Link>
          <div className="hidden space-x-4 md:flex">
            <Link className="hover:text-gray-300" href="#our-courses">
              Courses
            </Link>
            <Link className="hover:text-gray-300" href="#why-choose">
              Why Choose Us
            </Link>
            <Link className="hover:text-gray-300" href="#about">
              About
            </Link>
            <Link className="hover:text-gray-300" href="/auth/signIn">
              Sign In
            </Link>

          </div>
          <div className="md:hidden">
            <Button size="icon" variant="ghost">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </nav>
      <main>
        <section className="bg-gray-100 py-12 md:py-20" id="our-courses">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Our Courses</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {courseData.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
        <section className="bg-white py-12 md:py-20" id="why-choose">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Why Choose MN Top Security?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Expert Instructors</h3>
                <p className="text-gray-500">Learn from experienced professionals in the security industry.</p>
                <p className="text-gray-500">Our instructors bring years of field experience and practical knowledge to the classroom, ensuring you receive the best training possible.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Flexible Learning</h3>
                <p className="text-gray-500">Access our courses online, anytime, anywhere.</p>
                <p className="text-gray-500">We understand the demands of modern life, so our courses are designed to fit your schedule. Study at your own pace with our flexible online platform.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Certification</h3>
                <p className="text-gray-500">Receive a recognized certification upon course completion.</p>
                <p className="text-gray-500">Our certifications are widely recognized and respected in the industry, helping you stand out in the job market and advance your career.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-12 md:py-20" id="about">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">About MN Top Security</h2>
            <p className="text-gray-500">
              MN Top Security is dedicated to providing top-notch security guard training to individuals seeking to enter the security industry or advance their careers. Our comprehensive courses are designed to equip you with the knowledge and skills necessary to excel in various security roles.
            </p>
            <p className="mt-4 text-gray-500">
              Our mission is to deliver high-quality, accessible training that prepares our students for real-world challenges. With a focus on practical skills and industry best practices, we ensure that our graduates are ready to handle any situation with confidence and professionalism.
            </p>
          </div>
        </section>
        <section className="bg-white py-12 md:py-20" id="additional-features">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Additional Features</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<ShieldCheckIcon className="h-8 w-8 text-indigo-600" />}
                title="Industry-Recognized Certification"
                description="Receive a certification that is widely recognized and respected in the security industry."
              />
              <FeatureCard
                icon={<UsersIcon className="h-8 w-8 text-indigo-600" />}
                title="Expert Instructors"
                description="Learn from experienced professionals who bring real-world knowledge and expertise."
              />
              <FeatureCard
                icon={<ClockIcon className="h-8 w-8 text-indigo-600" />}
                title="Flexible Learning Schedule"
                description="Study at your own pace with our flexible online platform that fits your busy lifestyle."
              />
            </div>
          </div>
        </section>



        <section className="bg-gray-200 py-12 md:py-20" id="contact">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">Contact Us</h2>
                <p className="text-gray-500 mb-4">
                  Have questions or need assistance? Contact our support team for help.
                </p>
                <p className="text-gray-500 mb-4">
                  Email: <a href="mailto:info@mntopsecurity.com" className="text-indigo-600 hover:underline">info@mntopsecurity.com</a>
                </p>
                <p className="text-gray-500 mb-4">
                  Phone: 416-4505837

                </p>
              </div>
              <div>
                {/* Optionally, add a contact form here */}
                <form className="grid grid-cols-1 gap-4">
                  <input type="text" placeholder="Your Name" className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <input type="email" placeholder="Your Email" className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <textarea placeholder="Your Message" rows={4} className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <img
                alt="Company Logo"
                className="mb-4"
                height={64}
                src="images/mn-top-security-logo-new-black.png"
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
              <p className="text-gray-300">Phone: 416-4505837
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const courseData = [

  {
    id: 1,
    title: "Security Guard Training",
    description: "Learn the fundamental skills required to become a certified security guard.",
    duration: "6 weeks",
    price: "$199",
    rating: 4,
    image: "images/secuirty-course.jpg"
  },
  {
    id: 2,
    title: "First Aid/CPR",
    description: "At MN Top Security, our Emergency First Aid / CPR-C course offers a combination of online and in-person learning. The in-person section takes place in either Toronto or Mississauga, providing learners with practical, hands-on experience.",
    duration: "1 week",
    price: "$75", // Use numerical price for Stripe
    rating: 5,
    image: "/images/cpr.jpg",
    priceId: process.env.NEXT_PUBLIC_STRIPE_FIRST_AID_PRODUCT_PRICE_ID,

  },

  // Add more courses as needed
];

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

function EventCard({ date, title, description, location, buttonText, buttonLink }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <p className="text-gray-500 mb-2">{date}</p>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      <p className="text-gray-500 mb-2">{location}</p>
      <Link href={buttonLink} className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {buttonText}
      </Link>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg">
      <img alt={course.title} className="w-full h-48 object-cover" src={course.image} />
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">{course.title}</h3>
        <p className="text-gray-500">{course.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <StarRating rating={course.rating} />
          </div>
          <span className="text-gray-900 font-semibold">{course.price}</span>
        </div>
        <p className="mt-2 text-gray-500">Duration: {course.duration}</p>
        <Link href="#" className="mt-4 inline-block w-full text-center rounded-md bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700">
          Enroll Now
        </Link>
      </CardContent>
    </Card>
  );
}

function StarRating({ rating }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <StarIcon
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    );
  }
  return <div className="flex">{stars}</div>;
}

export default HomePage;
