import React from 'react';

type BadgeVariant =
    | 'default'
    | 'primary'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'red'
    | 'orange'
    | 'cyan'
    | 'gray'
    | 'white'
    | 'dark'
    | 'vip'
    | 'international';

type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    rounded?: 'full' | 'default';
    border?: boolean;
    className?: string;
    pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-white/5 text-gray-300 border-white/10',
    primary: 'bg-primary/10 text-primary border-primary/30',
    yellow: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    white: 'bg-white/10 text-white border-white/20',
    dark: 'bg-black/70 text-white border-transparent backdrop-blur-sm',
    vip: 'bg-purple-500/90 text-white border-transparent',
    international: 'bg-blue-500/90 text-white border-transparent',
};

const sizeStyles: Record<BadgeSize, string> = {
    xs: 'px-1.5 py-0.5 text-[7px] sm:text-[8px] gap-1',
    sm: 'px-2 py-0.5 text-[8px] sm:text-[10px] gap-1',
    md: 'px-2.5 py-1 text-[10px] sm:text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-xs sm:text-sm gap-2',
};

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'default',
    size = 'sm',
    icon,
    iconPosition = 'left',
    rounded = 'full',
    border = true,
    className = '',
    pulse = false,
}) => {
    const roundedClass = rounded === 'full' ? 'rounded-full' : 'rounded';
    const borderClass = border ? 'border' : '';

    return (
        <span
            className={`
                inline-flex items-center font-medium
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${roundedClass}
                ${borderClass}
                ${className}
            `.trim().replace(/\s+/g, ' ')}
        >
            {pulse && (
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                </span>
            )}
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </span>
    );
};

export default Badge;
