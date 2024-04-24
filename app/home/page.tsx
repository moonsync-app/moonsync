import Link from 'next/link';
import StatsCard from './stats-card';
import MoodImage from './mood.svg';
import WorkoutImage from './workout2.svg';
import DietImage from './food.svg';

export default async function Page() {

  const details = `You might be feeling more energetic and sociable, as this phase is often associated with rising energy levels.\n\nYour mood could be more stable and positive during this time.\n\nYou may experience less physical discomfort, as symptoms like bloating or cramps typically decrease after menstruation.`

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24 background-gradient">
      <h1>MoonSync</h1>
      <Link href="/chat">Go to chat</Link>

      <div className="absolute inset-x-0 bottom-0 w-full mb-2">
        <div className="grid grid-cols-3 justify-items-center ">
            <StatsCard svgIllustration={MoodImage} title={'Mood'} details = {details}/>
          <StatsCard svgIllustration={DietImage} title={'Nourish'} details = {details}/>
          <StatsCard svgIllustration={WorkoutImage} title={'Movement'} details = {details}/>
        </div>
      </div>
    </main>
  );
}
