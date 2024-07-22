'use client';

import { cn } from '@/lib/utils';
import type { RatingProps } from '.';
import Box from '../../layout/box';

type RatingStarProps = Pick<
  RatingProps,
  'value' | 'emptyIcon' | 'icon' | 'isDisabled' | 'isReadOnly'
> & {
  currentRate: number;
  filled: boolean;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * A helper component used within Rating to render individual star elements.
 * @param props - The rating star props
 * @returns The rating star component
 */
const RatingStar = (props: RatingStarProps) => {
  const {
    currentRate,
    filled,
    value = 0,
    isDisabled,
    isReadOnly,
    icon,
    emptyIcon,
    handleMouseEnter,
    handleMouseLeave,
    handleChange,
  } = props;

  return (
    <>
      <Box
        as={!isReadOnly ? 'label' : 'span'}
        className={!isReadOnly ? 'cursor-[inherit]' : undefined}
        onMouseEnter={() => handleMouseEnter(value)}
        onMouseLeave={handleMouseLeave}
        {...(!isReadOnly ? { htmlFor: `:r-${value}` } : {})}
      >
        <span
          className={cn(
            'flex transition-transform',
            isDisabled && 'opacity-80',
            filled ? 'drop-shadow-[0_0_4px_currentColor]' : 'opacity-50',
            isDisabled || isReadOnly
              ? 'pointer-events-none'
              : 'hover:scale-[1.2]'
          )}
        >
          {filled ? icon : emptyIcon}
        </span>
        {!isReadOnly && (
          <span className="sr-only">{`${value} RatingStar`}</span>
        )}
      </Box>
      {!isReadOnly && (
        <input
          className="sr-only"
          id={`:r-${value}`}
          type="radio"
          name="rating"
          value={value}
          disabled={isDisabled}
          defaultChecked={currentRate === value}
          onChange={handleChange}
        />
      )}
    </>
  );
};

RatingStar.displayName = 'RatingStar';

export default RatingStar;
