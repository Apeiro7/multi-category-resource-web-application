import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5, size = 12 }) => {
  const normalized = (rating / 10) * max;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(normalized)
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 dark:text-gray-600 fill-transparent"
          }
        />
      ))}
      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
