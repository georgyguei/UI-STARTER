import { cn } from '@/lib/utils';
import type { FormControlProps } from '.';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';

type FormLabelProps = FormControlProps & {
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
  const {
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    requiredIndicator,
    className,
    children,
    ...rest
  } = props;

  return (
    <Box
      as="label"
      className={cn(
        isRequired ? 'flex justify-start gap-1' : 'block text-start',
        'font-medium text-md transition-common duration-normal',
        isDisabled && 'data-[disabled="true"]:opacity-40',
        className
      )}
      data-disabled={isDisabled}
      data-invalid={isInvalid}
      data-readonly={isReadOnly}
      {...rest}
    >
      {children}
      {isRequired && requiredIndicator}
    </Box>
  );
};

FormLabel.displayName = 'FormLabel';

export default FormLabel;
