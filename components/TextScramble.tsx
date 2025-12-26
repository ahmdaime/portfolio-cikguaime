import React, { useEffect, useState, useCallback } from 'react';

interface TextScrambleProps {
  texts: string[];
  className?: string;
  speed?: number;
  pauseDuration?: number;
  stopAtLast?: boolean;
}

const chars = '!<>-_\\/[]{}—=+*^?#_アイウエオカキクケコサシスセソタチツテト';

const TextScramble: React.FC<TextScrambleProps> = ({
  texts,
  className = '',
  speed = 50,
  pauseDuration = 2000,
  stopAtLast = false,
}) => {
  const [displayText, setDisplayText] = useState(texts[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const scramble = useCallback((oldText: string, newText: string, onComplete: () => void) => {
    const length = Math.max(oldText.length, newText.length);
    let iteration = 0;
    const maxIterations = length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        newText
          .split('')
          .map((char, index) => {
            if (index < iteration / 3) {
              return char;
            }
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
          .padEnd(length, chars[Math.floor(Math.random() * chars.length)])
          .slice(0, Math.max(newText.length, length - Math.floor(iteration / 4)))
      );

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(newText);
        onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  useEffect(() => {
    // Stop if we've reached the last item and stopAtLast is true
    if (isComplete) return;

    const isLastItem = currentIndex === texts.length - 1;

    if (stopAtLast && isLastItem) {
      setIsComplete(true);
      return;
    }

    const nextIndex = (currentIndex + 1) % texts.length;

    const timeout = setTimeout(() => {
      scramble(texts[currentIndex], texts[nextIndex], () => {
        setCurrentIndex(nextIndex);
      });
    }, pauseDuration);

    return () => clearTimeout(timeout);
  }, [currentIndex, texts, scramble, pauseDuration, stopAtLast, isComplete]);

  return (
    <span className={className}>
      {displayText}
    </span>
  );
};

export default TextScramble;
