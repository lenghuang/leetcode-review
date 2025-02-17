import GameArea from '@/components/game-area/GameArea';
import PromptArea from '@/components/game-area/PromptArea';

export default function StudySession() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* DevEx: Mobile indicator */}
      <div className="lg:hidden bg-pink-200 p-2 text-center font-bold">
        Mobile View
      </div>

      {/* DevEx: Desktop indicator */}
      <div className="hidden lg:block bg-blue-200 p-2 text-center font-bold">
        Desktop View (25/75 Split)
      </div>

      {/* Mobile: Full-width top section */}
      <div className="lg:hidden w-full bg-gray-200 p-4 border-2 border-pink-500">
        <h2 className="text-xl font-bold mb-4">Instructions (Mobile Top)</h2>
        <PromptArea />
      </div>

      {/* Desktop: 25/75 split */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left side: 25% width on desktop, full width on mobile */}
        <div className="w-full lg:w-1/4 bg-gray-200 lg:fixed lg:top-0 lg:bottom-0 lg:left-0 lg:overflow-y-auto border-2 border-blue-500 lg:border-r-0">
          <div className="p-4">
            <div className="hidden lg:block">
              <h2 className="text-xl font-bold mb-4">
                Instructions (Desktop Left - 25%, Scrollable)
              </h2>
            </div>
            <PromptArea />
            <PromptArea />
            <PromptArea />
            <PromptArea />
            <p className="mt-4">This text is at the bottom, can you see it?</p>
          </div>
        </div>

        {/* Right side: 75% width on desktop, full width on mobile */}
        <div className="flex-1 bg-white lg:ml-[25%] overflow-y-auto border-2 border-blue-500">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 lg:block hidden">
              Game Area (Desktop Right - 75%)
            </h2>
            <h2 className="text-xl font-bold mb-4 lg:hidden">
              Game Area (Mobile)
            </h2>
            <GameArea />
            {/* Adding extra content to demonstrate scrolling */}
            <div className="mt-8">
              <h3 className="text-lg font-bold">Extra Content for Scrolling</h3>
              <p>Scroll down to see more content...</p>
              {[...Array(10)].map((_, index) => (
                <p key={index} className="my-4">
                  This is paragraph {index + 1} to demonstrate scrolling
                  behavior.
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Full-width bottom section */}
      <div className="lg:hidden w-full bg-gray-200 p-4 border-2 border-pink-500">
        <h2 className="text-xl font-bold mb-4">Mobile Bottom Section</h2>
        <p>This text is at the bottom, can you see it?</p>
      </div>
    </div>
  );
}
