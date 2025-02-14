import PromptArea from '@/components/game-area/PromptArea';
import GameArea from '@/components/game-area/GameArea';

export default function Home() {
  return (
    <main className="fixed top-0 left-0 min-h-screen w-screen">
      <div className="flex md:flex-row flex-col flex-1">
        <PromptArea />
        <GameArea />
      </div>
    </main>
  );
}
