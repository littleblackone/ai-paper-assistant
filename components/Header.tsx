'use client';

import Image from 'next/image';
import Link from 'next/link';
export default function Header() {
  return (
    <>
      <div className="absolute left-4 top-4 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 ">
          <Image src="/logo.png" alt="logo" height={30} width={30}></Image>
          <p className=" text-lg font-medium text-zinc-950">AI论文写作专业版</p>
        </Link>
      </div>
    </>
  );
}
