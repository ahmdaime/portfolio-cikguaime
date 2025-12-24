import { Variants, TargetAndTransition, VariantLabels } from 'framer-motion';

// Common initial states
export const fadeInInitial = { opacity: 0 };
export const fadeInUpInitial = { opacity: 0, y: 20 };
export const fadeInUpSmallInitial = { opacity: 0, y: 10 };
export const fadeInLeftInitial = { opacity: 0, x: -30 };
export const fadeInRightInitial = { opacity: 0, x: 30 };
export const scaleInInitial = { opacity: 0, scale: 0.5 };
export const scaleInSmallInitial = { opacity: 0, scale: 0.8 };
export const modalInitial = { opacity: 0, scale: 0.95, y: 20 };

// Common animate states
export const fadeInAnimate = { opacity: 1 };
export const fadeInUpAnimate = { opacity: 1, y: 0 };
export const fadeInLeftAnimate = { opacity: 1, x: 0 };
export const fadeInRightAnimate = { opacity: 1, x: 0 };
export const scaleInAnimate = { opacity: 1, scale: 1 };
export const modalAnimate = { opacity: 1, scale: 1, y: 0 };

// Common exit states
export const fadeOutExit = { opacity: 0 };
export const fadeOutDownExit = { opacity: 0, y: 20 };
export const scaleOutExit = { opacity: 0, scale: 0.95 };

// Common viewport settings
export const viewportOnce = { once: true };
export const viewportOnceWithMargin = { once: true, margin: '-50px' };

// Common transitions
export const defaultTransition = { duration: 0.5 };
export const fastTransition = { duration: 0.3 };
export const slowTransition = { duration: 0.8 };
export const springTransition = { type: 'spring', damping: 20, stiffness: 100 };
export const modalTransition = { type: 'spring', damping: 25, stiffness: 300 };

// Stagger helper - creates staggered animation delays
export const staggerDelay = (index: number, baseDelay = 0, staggerAmount = 0.1) => ({
    delay: baseDelay + index * staggerAmount,
    duration: 0.5,
});

// Common animation variants for reuse
export const fadeInUpVariants: Variants = {
    initial: fadeInUpInitial,
    animate: fadeInUpAnimate,
    exit: fadeOutDownExit,
};

export const fadeInLeftVariants: Variants = {
    initial: fadeInLeftInitial,
    animate: fadeInLeftAnimate,
};

export const fadeInRightVariants: Variants = {
    initial: fadeInRightInitial,
    animate: fadeInRightAnimate,
};

export const scaleInVariants: Variants = {
    initial: scaleInInitial,
    animate: scaleInAnimate,
};

export const modalVariants: Variants = {
    initial: modalInitial,
    animate: modalAnimate,
    exit: scaleOutExit,
};

// Container variants for stagger children
export const staggerContainerVariants: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export const staggerItemVariants: Variants = {
    initial: fadeInUpInitial,
    animate: fadeInUpAnimate,
};

// Hover animations
export const hoverScale = { scale: 1.05 };
export const hoverScaleSmall = { scale: 1.02 };
export const tapScale = { scale: 0.98 };

// Scroll-linked animations (for parallax effects)
export const parallaxY = (amount: number) => ({
    y: amount,
});
