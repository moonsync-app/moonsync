import Link from 'next/link';
import { Poppins } from 'next/font/google';
import SpeedDial from './components/ui/speed-dial';
import StatsComponent from './home/stats';
import Header from './home/header';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export default async function Page() {
  return (
    <main className={`flex min-h-screen flex-col items-center gap-10 p-4 background-gradient ${poppins.className}`}>
      <SpeedDial/>
      <Header/>
      <StatsComponent />
    </main>
  );
}
