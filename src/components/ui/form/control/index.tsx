import { cn } from '@/lib/utils';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';

type FormControlProps = {
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
};

/**
 * Form Control is a wrapper component that provides context and functionality to form elements.
 *
 * @example
 * <FormControl isInvalid={error}>
 *  ...
 * </FormControl>
 *
 * @param props - The props of the FormControl component.
 * @returns The FormControl component.
 */
const FormControl: UIComponent<'div', FormControlProps> = props => {
  const { isInvalid, className, ...rest } = props;

  return (
    <Box
      className={cn('relative w-full', className)}
      role="group"
      data-invalid={isInvalid}
      {...rest}
    />
  );
};

FormControl.displayName = 'FormControl';

export default FormControl;
