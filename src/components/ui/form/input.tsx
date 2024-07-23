import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import Box from '../layout/box';
import type { UIComponent } from '../type';
import type { FormControlProps } from './control';

/**
 * The size of the input component
 */
const INPUT_SIZES = {
  xs: 'h-6 rounded-sm ps-2 pe-2 text-xs',
  sm: 'h-8 rounded-sm ps-3 pe-3 text-sm',
  md: 'h-10 rounded-md ps-4 pe-4 text-md',
  lg: 'h-12 rounded-md ps-4 pe-4 text-lg',
};

/**
 * The variant of the input component
 */
const INPUT_VARIANTS = {
  outline:
    'border hover:border-gray-300 focus-visible:z-[1] focus-visible:border-2 focus-visible:border-blue-500',
  filled:
    'border-2 border-transparent bg-gray-100 hover:bg-gray-200 focus-visible:border-blue-500 focus-visible:bg-transparent',
  flushed:
    'rounded-none border-b bg-transparent ps-0 pe-0 focus-visible:border-blue-500 focus-visible:border-b-2',
  unstyled: 'h-auto bg-transparent ps-0 pe-0',
};

/**
 * The variant of the input component
 */
const inputVariant = cva(
  'relative w-full min-w-0 appearance-none border-solid outline-none transition-common duration-normal',
  {
    variants: {
      size: INPUT_SIZES,
      variant: INPUT_VARIANTS,
    },
    defaultVariants: {
      size: 'md',
      variant: 'outline',
    },
  }
);

/**
 * The props of the input component
 */
type InputProps = VariantProps<typeof inputVariant> &
  FormControlProps & {
    colorScheme?: string;
  };

/**
 * Input component is a component that is used to get user input in a text field.
 *
 * @example
 * <Input placeholder='Basic usage' />
 *
 * @param props - The props of the input component
 * @returns The input component
 */
const Input: UIComponent<'input', InputProps> = props => {
  const {
    className,
    isRequired,
    isDisabled,
    isInvalid,
    isReadOnly,
    size,
    variant,
    ...rest
  } = props;

  return (
    <Box
      as="input"
      className={cn(
        isDisabled && 'disabled:cursor-not-allowed disabled:opacity-40',
        isInvalid &&
          'aria-[invalid="true"]:border-2 aria-[invalid="true"]:border-red-500',
        isReadOnly && 'read-only:select-all read-only:shadow-none',
        inputVariant({ variant, size, className })
      )}
      disabled={isDisabled}
      aria-invalid={isInvalid || undefined}
      readOnly={isReadOnly}
      required={isRequired}
      aria-required={isRequired || undefined}
      {...rest}
    />
  );
};

Input.displayName = 'Input';

export default Input;
