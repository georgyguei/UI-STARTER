import { cn } from '@/lib/utils';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';

/**
 * The Toolbar component gives users quick access to their frequently used tools.
 *
 * @example
 * <AppBar>
 *  <Toolbar>
 *   ...
 *  </Toolbar>
 * </AppBar>
 *
 * @param props - The props of the Toolbar component
 * @returns The Toolbar component
 */
const Toolbar: UIComponent<'div', object> = props => {
  const { children, className, ...rest } = props;

  return (
    <Box
      className={cn(
        'relative flex min-h-12 items-center gap-2 ps-4 pe-4',
        className
      )}
      {...rest}
    >
      {children}
    </Box>
  );
};

Toolbar.displayName = 'Toolbar';

export default Toolbar;
