import { 
  PauseIcon, 
  XMarkIcon,
  PlayIcon
} from '@heroicons/react/24/solid'

import Timer from './timer';

export default function Isle() {
  return (
    <main className="flex items-center justify-center antialiased min-h-screen">
      <div className="flex items-center justify-between w-[464px] h-24 bg-black p-6 rounded-full">
        <div className="flex gap-4">
          <div className="flex justify-center items-center w-[56px] h-[56px] bg-orange-500/[40%] hover:bg-orange-500/[50%] transition-all duration-200 rounded-full cursor-pointer">
            {/* <PauseIcon className="size-8 text-amber-500" /> */}
            <PlayIcon className="size-8 text-amber-500" />
          </div>
          <div className="flex justify-center items-center w-[56px] h-[56px] bg-gray-500/[40%] hover:bg-gray-500/[50%] transition-all duration-200 rounded-full cursor-pointer">
            <XMarkIcon className="size-8 text-white" />
          </div>
        </div>
        <div className="flex items-end gap-2 text-amber-500">
          <div className="text-lg font-semibold">Timer</div>
          <Timer className="text-5xl tabular-nums" />
        </div>
      </div>
    </main>
  );
}
