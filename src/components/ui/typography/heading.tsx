import React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import type { UIComponent } from '../type';
import Text from './text';

/**
 * Represents all valid DOM element types for heading content in the application.
 */
type HeadingDomElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Defines a generic type for typography components in the UI library.
 *
 * This type is used to create strongly typed components that render heading elements,
 * ensuring they receive both the standard props of their DOM element type and any additional
 * custom props defined.
 *
 * @template T - The type of the DOM element to render (e.g., 'h1', 'h2').
 * @template P - An object representing the custom props for the component. Defaults to an empty object.
 */
type UITypographyComponent<
  T extends HeadingDomElements,
  P extends object = object,
> = UIComponent<T, P>;

/**
 * Represents the sizes of the Heading component.
 */
const HEADING_SIZES = {
  xs: 'text-sm heading-[1.2]',
  sm: 'text-md heading-[1.2]',
  md: 'text-xl heading-[1.2]',
  lg: 'text-2xl leading-[1.33]',
  xl: 'text-3xl leading-[1.33]',
  '2xl': 'text-4xl leading-[1.2]',
  '3xl': 'text-5xl leading-none',
  '4xl': 'text-6xl leading-none',
};

/**
 * Represents the variants of the Heading component.
 */
const headingVariants = cva('font-bold font-heading', {
  variants: {
    /**
     * The size of the Heading component.
     */
    size: HEADING_SIZES,

    /**
     * The variant of the Heading component.
     */
    variant: {},
  },
  defaultVariants: {
    size: 'xl',
  },
});

/**
 * Represents the props of the Heading component.
 */
type HeadingProps = VariantProps<typeof headingVariants>;

/**
 * Heading is used to render semantic HTML heading elements.
 *
 * @example
 * <Heading>I'm a Heading</Heading>
 *
 * @param {HeadingProps} props - The props of the component.
 *
 * @returns {JSX.Element} The Heading component.
 */
const Heading: UITypographyComponent<'h2', HeadingProps> = props => {
  const { className, variant, size, ...rest } = props;
  return (
    <Text
      as="h2"
      className={cn(headingVariants({ variant, size, className }))}
      {...rest}
    />
  );
};

Heading.displayName = 'Heading';

export default Heading;
