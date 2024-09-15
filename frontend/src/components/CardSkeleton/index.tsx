import { Skeleton } from "../ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="relative bg-gray-400 rounded-3xl flex flex-col gap-6 justify-center items-center py-6 px-14 z-10 h-[355px]  text-center">
      <div className="absolute top-3 right-3">
        <Skeleton className="w-[40px] h-[40px] rounded-xl bg-gray-600" />
      </div>
      <div className="h-[90px] w-[90px] min-h-[90px] rounded-xl overflow-hidden flex justify-center items-center">
        <Skeleton className="w-[90px] h-[90px] rounded-xl bg-gray-600" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="w-[180px] h-[20px] rounded-xl bg-gray-600" />
        <Skeleton className="w-[200px] h-[20px] rounded-xl bg-gray-600" />
      </div>
      <div className="flex justify-between gap-5">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-[50px] h-[20px] rounded-xl bg-gray-600" />
          <Skeleton className="w-[90px] h-[20px] rounded-xl bg-gray-600" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-[50px] h-[20px] rounded-xl bg-gray-600" />
          <Skeleton className="w-[90px] h-[20px] rounded-xl bg-gray-600" />
        </div>
      </div>
      <Skeleton className="w-[170px] h-[40px] rounded-xl bg-gray-600" />
    </div> 
  )
}
