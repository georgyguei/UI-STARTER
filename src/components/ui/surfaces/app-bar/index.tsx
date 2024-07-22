import { cn } from '@/lib/utils';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';

/**
 * The AppBar component displays information and actions relating to the current screen. It's used for branding, screen titles, navigation, and actions.
 *
 * @example
 * <AppBar>
 *  <Toolbar>
 *   ...
 * </Toolbar>
 * </AppBar>
 *
 * @param props - The props of the AppBar component
 * @returns The AppBar component
 */
const AppBar: UIComponent<'header', object> = props => {
  const { children, className, ...rest } = props;

  return (
    <div className="flex-grow">
      <Box
        as="header"
        className={cn(
          'flex w-full shrink-0 flex-col shadow-md transition-shadow',
          className
        )}
        {...rest}
      >
        {children}
      </Box>
    </div>
  );
};

AppBar.displayName = 'AppBar';

export default AppBar;
