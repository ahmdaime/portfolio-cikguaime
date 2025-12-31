import React from 'react';

// Base skeleton with shimmer animation
const SkeletonBase = ({ className = '' }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-white/10 rounded ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

// Slot Progress Skeleton - matches the slot counter UI
export const SlotProgressSkeleton = () => (
  <div className="space-y-2 animate-pulse">
    <div className="flex justify-between">
      <SkeletonBase className="h-4 w-16" />
      <SkeletonBase className="h-4 w-12" />
    </div>
    <SkeletonBase className="h-2 w-full rounded-full" />
  </div>
);

// Pricing Card Skeleton
export const PricingCardSkeleton = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
    <SkeletonBase className="h-5 w-24 mb-3" />
    <SkeletonBase className="h-8 w-20 mb-4" />
    <SlotProgressSkeleton />
    <div className="mt-6 space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonBase key={i} className="h-4 w-full" />
      ))}
    </div>
    <SkeletonBase className="h-12 w-full mt-6 rounded-lg" />
  </div>
);

// Text line skeleton
export const TextSkeleton = ({ width = 'w-full' }: { width?: string }) => (
  <SkeletonBase className={`h-4 ${width}`} />
);

// Button skeleton
export const ButtonSkeleton = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizes = {
    sm: 'h-8 w-24',
    md: 'h-10 w-32',
    lg: 'h-12 w-40'
  };
  return <SkeletonBase className={`${sizes[size]} rounded-lg`} />;
};

export default SkeletonBase;
