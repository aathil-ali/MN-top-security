import { Link, StarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { loadStripe } from '@stripe/stripe-js';
import { account, checkUserEnrolled } from '@/lib/server/appwrite'; // Adjust the import path as needed
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Courses = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({}); // To track loading state for each course
  const [enrolledCourses, setEnrolledCourses] = useState({}); // To track enrollment status for each course
  const [isPaid , setIsPaid] = useState(false);
  const router = useRouter();

  const courseData = [
    {
      id: 1,
      title: "Security Guard Training",
      description: "Learn the fundamental skills required to become a certified security guard.",
      duration: "6 weeks",
      price: 180, // Use numerical price for Stripe
      rating: 5,
      image: "/images/secuirty-course.jpg",
      priceId: process.env.NEXT_PUBLIC_STRIPE_SECURITY_PRODUCT_PRICE_ID,

    },
    {
      id: 2,
      title: "First Aid/CPR",
      description: "At MN Top Security, our Emergency First Aid / CPR-C course offers a combination of online and in-person learning. The in-person section takes place in either Toronto or Mississauga, providing learners with practical, hands-on experience.",
      duration: "1 week",
      price: 75, // Use numerical price for Stripe
      rating: 5,
      image: "/images/cpr.jpg",
      priceId: process.env.NEXT_PUBLIC_STRIPE_FIRST_AID_PRODUCT_PRICE_ID,

    },
    // Add more courses as needed
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setUser(user);

        // Check enrollment status for each course
        const enrollmentStatuses = await Promise.all(courseData.map(async (course) => {
          const isEnrolled = await checkUserEnrolled(user.$id, course.id);
          return { courseId: course.id, isEnrolled };
        }));

        // Update the state with enrollment statuses
        const enrolledCourses = {};
        enrollmentStatuses.forEach(status => {
          enrolledCourses[status.courseId] = status.isEnrolled;
        });
        setEnrolledCourses(enrolledCourses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleEnroll = async (course) => {
    setLoading(prev => ({ ...prev, [course.id]: true }));
    const stripe = await stripePromise;

    try {
      const session = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course.id, courseTitle: course.title, coursePrice: course.price, userId: user.$id , productImageUrl:process.env.NEXT_PUBLIC_SECURITY_COURSE_IMAGE , priceId: course.priceId}),
      }).then(res => res.json());

      if (session.id) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
    } finally {
      setLoading(prev => ({ ...prev, [course.id]: false }));
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">My Courses</h2>
        <Link className="text-indigo-600 hover:underline" href="#">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.map(course => (
          <CourseCard key={course.id} course={course} onEnroll={() => handleEnroll(course)} loading={loading[course.id]} enrolled={enrolledCourses[course.id]} />
        ))}
      </div>
    </section>
  );

  function CourseCard({ course, onEnroll, loading, enrolled }) {
    const handleGoToCourse = () => {
      router.push(`/dashboard/user/courses`); // Corrected the route path

    };
    return (
      <Card className="overflow-hidden rounded-lg shadow-lg">
      <img alt={course.title} className="w-full h-48 object-cover" src={course.image} />
      <CardContent className="p-4">
        <h3 className="text-lg font-bold">{course.title}</h3>
        <p className="text-gray-500">{course.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mt-2 text-gray-500">Duration: {course.duration}</p>
          </div>
          <span className="text-gray-900 font-semibold">${course.price.toFixed(2)}</span>
        </div>
        {enrolled ? (
          <button
            onClick={handleGoToCourse}
            className={`mt-4 inline-block w-full text-center rounded-md bg-green-500 px-4 py-2 font-medium text-white shadow-sm hover:bg-green-600`}
          >
            Go to Course
          </button>
        ) : (
          <button
            onClick={onEnroll}
            className={`mt-4 inline-block w-full text-center rounded-md px-4 py-2 font-medium text-white shadow-sm ${loading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            disabled={loading}
          >
            {loading ? <div>Please Wait ...</div> : 'Enroll Now'}
          </button>
        )}
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
};

export default Courses;
