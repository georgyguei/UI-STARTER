import { cn } from '@/lib/utils';
import type { FormControlProps } from '.';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';

type FormLabelProps = Pick<FormControlProps, 'isRequired'> & {
  requiredIndicator?: React.ReactElement;
};

/**
 * Form Label provides a label for a form section.
 *
 * @example
 * <FormLabel>
 *  ...
 * </FormLabel>
 *
 * @param props - The props of the FormLabel component.
 * @returns The FormLabel component.
 */
const FormLabel: UIComponent<'label', FormLabelProps> = props => {
  const { isRequired, requiredIndicator, className, children, ...rest } = props;

  return (
    <Box
      as="label"
      className={cn(
        isRequired ? 'flex justify-start gap-1' : 'block text-start',
        'font-medium text-md transition-common duration-normal',
        className
      )}
      {...rest}
    >
      {children}
      {isRequired && requiredIndicator}
    </Box>
  );
};

FormLabel.displayName = 'FormLabel';

export default FormLabel;
