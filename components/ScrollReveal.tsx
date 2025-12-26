import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
}

// Lightweight CSS-based scroll reveal using Intersection Observer
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 20,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0,0,0)';
    switch (direction) {
      case 'up': return `translate3d(0,${distance}px,0)`;
      case 'down': return `translate3d(0,-${distance}px,0)`;
      case 'left': return `translate3d(${distance}px,0,0)`;
      case 'right': return `translate3d(-${distance}px,0,0)`;
      default: return 'translate3d(0,0,0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

// Container for staggered children - CSS based
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div ref={ref} className={className} data-visible={isVisible}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            style: {
              ...((child.props as any).style || {}),
              transitionDelay: isVisible ? `${index * staggerDelay}s` : '0s',
            },
            'data-stagger-visible': isVisible,
          });
        }
        return child;
      })}
    </div>
  );
};

// Stagger child item - CSS based
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  style?: React.CSSProperties;
  'data-stagger-visible'?: boolean;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  direction = 'up',
  distance = 15,
  style = {},
  'data-stagger-visible': isVisible = false,
}) => {
  const getTransform = () => {
    if (isVisible) return 'translate3d(0,0,0)';
    switch (direction) {
      case 'up': return `translate3d(0,${distance}px,0)`;
      case 'down': return `translate3d(0,-${distance}px,0)`;
      case 'left': return `translate3d(${distance}px,0,0)`;
      case 'right': return `translate3d(-${distance}px,0,0)`;
      default: return 'translate3d(0,0,0)';
    }
  };

  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};

// Text reveal - simplified, no animation for performance
interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
}) => {
  return <span className={className}>{text}</span>;
};

// Section header - simplified
interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  className = '',
  align = 'left',
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
          {badgeIcon}
          <span className="text-[10px] sm:text-xs font-medium text-primary uppercase tracking-wider">
            {badge}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3 md:mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ScrollReveal;
