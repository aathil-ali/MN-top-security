// pages/dashboard/_middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { account } from '@/lib/server/appwrite';

export async function middleware(req: NextRequest) {
  try {
    const session = await account.getSession('current');
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signIn', req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/auth/signIn', req.url));
  }
  return NextResponse.next();
}
