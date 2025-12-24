import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                        star <= Math.floor(rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : star - 0.5 <= rating
                            ? 'text-yellow-400 fill-yellow-400/50'
                            : 'text-gray-600'
                    }`}
                />
            ))}
            <span className="text-sm font-medium text-white ml-1">{rating.toFixed(1)}</span>
        </div>
    );
};

export default StarRating;
