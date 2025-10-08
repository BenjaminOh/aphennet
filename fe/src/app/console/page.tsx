import { redirect } from 'next/navigation';

export default function Console() {
  // /console 경로에서 /console/login으로 리다이렉트
  redirect('/console/login');
}
