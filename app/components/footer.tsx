import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full text-center border-t border-gray-300 dark:border-neutral-800 p-4">
      <p className="text-sm font-mono">
        © {new Date().getFullYear()} Moonsync team. All rights reserved.
      </p>
      <a
        href="https://github.com/moonsync-hackathon/moonsync"
        className="flex items-center justify-center font-nunito text-lg font-bold gap-2 mt-4"
      >
        <span>Visit our GitHub</span>
        <Image
          className="rounded-xl"
          src="/moon.png"
          alt="Moonsync Logo"
          width={40}
          height={40}
          priority
        />
      </a>
    </footer>
  );
}
