import Link from 'next/link';
import StatsComponent from './stats';


export default async function Page() {

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 background-gradient">
      <h1>MoonSync</h1>
      <Link href="/chat">Go to chat</Link>
      <StatsComponent />
    </main>
  );
}
