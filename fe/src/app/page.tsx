import { redirect } from 'next/navigation';

export default function Home() {
  // 루트 경로에서 /console로 리다이렉트
  redirect('/console');
}
