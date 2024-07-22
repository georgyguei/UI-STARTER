import { cn } from '@/lib/utils';
import Box from '../../layout/box';
import type { UIComponent } from '../../type';

export type FormRequiredIndicatorProps = object;

/**
 * Form Required Indicator provides a required indicator for a form section.
 *
 * @example
 * <FormRequiredIndicator>
 *  ...
 * </FormRequiredIndicator>
 *
 * @param props - The props of the FormRequiredIndicator component.
 * @returns The FormRequiredIndicator component.
 */
const FormRequiredIndicator: UIComponent<
  'span',
  FormRequiredIndicatorProps
> = props => {
  const { className, ...rest } = props;

  return (
    <Box
      as="span"
      className={cn('text-red-500', className)}
      role="presentation"
      aria-hidden="true"
      {...rest}
    />
  );
};

FormRequiredIndicator.displayName = 'FormRequiredIndicator';

export default FormRequiredIndicator;
