export interface PaymentData {
  userId: string;
  stripeSessionId: string;
  amount: number | null;
  status: string | null;
}