export interface PaymentData {
  userId: string;
  stripeSessionId: string;
  amount: number | null;
  status: string | null;
  courseId: number; // Define courseId here

}