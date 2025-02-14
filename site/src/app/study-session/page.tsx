import PromptArea from '@/components/game-area/PromptArea';
import GameArea from '@/components/game-area/GameArea';

export default function StudySession() {
  return (
    <div className="h-screen w-screen flex md:flex-row flex-col flex-1">
      <div className="bg-gray-200 w-1/2">
        <PromptArea />
      </div>
      <div className="bg-white w-1/2">
        <GameArea />
      </div>
    </div>
  );
}
