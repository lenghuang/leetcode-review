import PromptArea from '@/components/game-area/PromptArea';
import GameArea from '@/components/game-area/GameArea';

export default function StudySession() {
  return (
    <div className="fixed top-12 left-0 mb-16">
      <div className="flex md:flex-row flex-col flex-1 h-screen w-screen">
        <div className="flex flex-col bg-gray-200 w-2/5 overflow-y-auto h-screen">
          <div className="p-4">
            <PromptArea />
            <PromptArea />
            <PromptArea />
            <PromptArea />
            This text is at the bottom, can you see it?
          </div>
        </div>
        <div className="flex flex-col justify-center bg-white w-auto h-screen overflow-y-auto">
          <div className="p-4">
            <GameArea />
          </div>
        </div>
      </div>
    </div>
  );
}
