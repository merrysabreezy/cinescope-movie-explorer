export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
      </div>
      <div className="mt-4">
        <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  );
}
