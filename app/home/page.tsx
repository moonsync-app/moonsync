import Link from 'next/link'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 background-gradient">
      <h1>MoonSync</h1>
      <Link href="/chat">Go to chat</Link>
    </main>
  );
}
