import Link from 'next/link';
import StatsComponent from './stats';
import Header from './header';
import { Poppins } from 'next/font/google';
import SpeedDial from '../components/ui/speed-dial';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });
const poppinsThin = Poppins({ weight: '200', subsets: ['latin'] });


export default async function Page() {
  return (
    <main className={`flex min-h-screen flex-col items-center gap-10 p-4 background-gradient ${poppins.className}`}>
      <SpeedDial/>
      <Header/>
      <StatsComponent />
    </main>
  );
}
