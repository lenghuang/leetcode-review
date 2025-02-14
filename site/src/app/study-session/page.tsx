import PromptArea from '@/components/game-area/PromptArea';
import GameArea from '@/components/game-area/GameArea';

export default function StudySession() {
  return (
    <div className="min-h-screen w-screen flex md:flex-row flex-col flex-1">
      <div className="bg-gray-200 w-1/2 d:h-full">
        <PromptArea />
      </div>
      <div className="bg-white w-1/2 md:h-full">
        <GameArea />
      </div>
    </div>
  );
}
