import { LinkButton } from '@/components/buttons/link-button';
import { ThemeSwitcherCta } from '@/components/theme-switcher/theme-switcher-cta';
import Image from 'next/image';

export default async function Home() {
  return (
    <div className="flex w-full align-center items-center justify-center">
      <div className="flex flex-col gap-4 align-center items-center max-w-[375px] mt-8">
        <Image
          alt="a funny meme about gengar"
          height={300}
          width={300}
          src="/gengar-at-work-meme.jpeg"
        />
        <div className="text-center whitespace-pre-wrap break-words p-4">
          need to make an actual landing page, but this works for now. this is a
          proof of concept, not final product!
        </div>
        <div className="flex gap-4">
          <LinkButton href="/home">Get started</LinkButton>
          <ThemeSwitcherCta />
        </div>
        <div className="w-4/5 justify-center flex gap-1 border-t text-xs mt-24 py-3">
          AI slop by
          <a
            href="https://github.com/lenghuang/leetcode-review"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            lendevelops
          </a>
          <Image
            width={16}
            height={16}
            src="/gengarheheq.png"
            alt="gengarheheq"
          />
        </div>
      </div>
    </div>
  );
}
