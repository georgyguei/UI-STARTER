import { cn } from '@/lib/utils';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';

type FormHelperTextProps = object;

/**
 * Form Helper Text provides a message that helps users understand more about a form section.
 *
 * @example
 * <FormHelperText>
 * ...
 * </FormHelperText>
 *
 * @param props - The props of the FormHelperText component.
 * @returns The FormHelperText component.
 */
const FormHelperText: UIComponent<'p', FormHelperTextProps> = props => {
  const { className, children, ...rest } = props;

  return (
    <Box
      as="p"
      className={cn('text-gray-600 text-sm leading-normal', className)}
      {...rest}
    >
      {children}
    </Box>
  );
};

FormHelperText.displayName = 'FormHelperText';

export default FormHelperText;
