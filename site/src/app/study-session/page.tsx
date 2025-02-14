import PromptArea from '@/components/game-area/PromptArea';
import GameArea from '@/components/game-area/GameArea';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row flex-1">
        <PromptArea />
        <GameArea />
      </div>
    </main>
  );
}
