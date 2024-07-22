import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import Box from '../layout/box';
import type { UIComponent } from '../type';

/**
 * The variants of the Paper component.
 */
const paperVariants = cva(
  'flex rounded bg-white p-2 font-normal text-blackAlpha-700 text-sm transition-shadow duration-300',
  {
    variants: {
      elevation: {
        0: 'shadow-sm',
        1: 'shadow-base',
        2: 'shadow-md',
        3: 'shadow-lg',
        4: 'shadow-xl',
        5: 'shadow-2xl',
      },
    },
    defaultVariants: {
      elevation: 1,
    },
  }
);

/**
 * The props of the Paper component.
 */
type PaperProps = VariantProps<typeof paperVariants>;

/**
 * The Paper component is a container for displaying content on an elevated surface.
 *
 * @example
 * <Paper elevation={1}>
 *  <Text>Content</Text>
 * </Paper>
 *
 * @param props - The props of the Paper component
 * @returns The Paper component
 */
const Paper: UIComponent<'div', PaperProps> = props => {
  const { elevation, className, ...rest } = props;

  return (
    <Box className={cn(paperVariants({ elevation, className }))} {...rest} />
  );
};

Paper.displayName = 'Paper';

export default Paper;
