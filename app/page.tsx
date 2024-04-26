import Link from 'next/link';
import { Poppins } from 'next/font/google';
import SpeedDial from './components/ui/speed-dial';
import StatsComponent from './home/stats';
import Header from './home/header';
import { DonutChart } from './components/ui/phase';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export default async function Page() {
  return (
    <main className={`flex min-h-screen flex-col items-center p-4 background-gradient ${poppins.className} pt-16`} >
      <SpeedDial/>
      <Header/>
      {/* TODO make dynamic */}
      <DonutChart width={250} height={250} />
      <StatsComponent />
    </main>
  );
}
