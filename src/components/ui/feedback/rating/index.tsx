'use client';

import { cn } from '@/lib/utils';
import { cloneElement, isValidElement, useState } from 'react';
import { BiSolidStar } from 'react-icons/bi';
import Box from '../../layout/box';
import Icon from '../../media/icon';
import type { UIComponent } from '../../type';
import Star from './star';

/**
 * The rating props
 */
export type RatingProps = {
  value?: number;
  max?: number;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  icon?: React.ReactElement;
  emptyIcon?: React.ReactElement;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: number
  ) => void;
};

/**
 * Ratings provide insight regarding others' opinions and experiences, and can allow the user to submit a rating of their own.
 *
 * @example
 * <Rating
 *  value={rating}
 *  onChange={(_event, value) => setRating(value)}
 * />
 *
 * @param props - The rating props
 *
 * @returns The rating component
 */
const Rating: UIComponent<'span', RatingProps> = ({
  children,
  value = 0,
  max = 5,
  isDisabled,
  isReadOnly,
  icon,
  emptyIcon,
  onChange,
  className,
  ...rest
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const effectiveValue = hoverValue ?? value;

  const handleMouseEnter = (newValue: number) => {
    if (!isReadOnly) {
      setHoverValue(newValue);
    }
  };

  const handleMouseLeave = () => {
    if (!isReadOnly) {
      setHoverValue(null);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isReadOnly) {
      event.preventDefault();
      const newValue = Number(event.target.value);
      if (value !== newValue) {
        onChange?.(event, newValue);
      }
    }
  };

  const IconElement = isValidElement(icon) ? (
    cloneElement(icon as React.ReactElement, { 'aria-hidden': 'true' })
  ) : (
    <Icon as={BiSolidStar} aria-hidden />
  );

  const EmptyIconElement = isValidElement(emptyIcon)
    ? cloneElement(emptyIcon as React.ReactElement, { 'aria-hidden': 'true' })
    : IconElement;

  const starsArray = Array.from({ length: max }, (_, index) => index + 1);

  return (
    <Box
      as="span"
      className={cn(
        'relative inline-flex text-left text-2xl text-yellow-400 ',
        isDisabled || isReadOnly ? 'pointer-events-none' : 'cursor-pointer',
        className
      )}
      role={isReadOnly ? 'img' : undefined}
      aria-label={
        isReadOnly
          ? `${effectiveValue} ${effectiveValue <= 1 ? 'Star' : 'Stars'}`
          : undefined
      }
      {...(rest as object)}
    >
      {starsArray.map(starValue => (
        <Star
          key={starValue}
          currentRate={value}
          filled={effectiveValue >= starValue}
          value={starValue}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          icon={IconElement}
          emptyIcon={EmptyIconElement}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleChange={handleChange}
        />
      ))}
    </Box>
  );
};

Rating.displayName = 'Rating';

export default Rating;
