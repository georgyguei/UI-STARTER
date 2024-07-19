/**
 * Represents a generic type for React element types.
 */
type As = React.ElementType;

/**
 * Creates a utility type to omit common props from a target type and optionally add 'htmlTranslate' prop.
 * @param Target - The target type from which to omit props.
 * @param OmitAdditionalProps - Additional props to omit from the target type.
 * @returns A type with specified props omitted and an optional 'htmlTranslate' prop added.
 */
type OmitCommonProps<
  Target,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  OmitAdditionalProps extends keyof any = never,
> = Omit<Target, 'as' | OmitAdditionalProps> & {
  /**
   * Controls HTML translation.
   */
  htmlTranslate?: 'yes' | 'no' | undefined;
};

/**
 * Extracts and extends the props of a React element or component, allowing for an optional 'as' prop.
 * @param T - The type of the React element or component.
 * @returns The props of the specified React element or component with an optional 'as' prop.
 */
type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  /**
   * Specifies the element type to render.
   */
  as?: As;
};

/**
 * Merges source props with override props, excluding common keys from the source.
 * @param SourceProps - The source props to merge.
 * @param OverrideProps - The override props to merge, which will exclude common keys from the source.
 * @returns A type representing the merged props.
 */
type RightJoinProps<
  SourceProps extends object,
  OverrideProps extends object,
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

/**
 * Assigns properties from one type to another.
 * @param T - The original type.
 * @param U - The type from which properties are assigned to T.
 * @returns A type with properties of U assigned to T.
 */
type Assign<T, U> = Omit<T, keyof U> & U;

/**
 * Merges component props with 'as' component props and additional props.
 * @param ComponentProps - The base component props.
 * @param AsProps - The 'as' component props.
 * @param AdditionalProps - Additional props to merge.
 * @param AsComponent - The component type for the 'as' prop.
 * @returns A type representing the merged props.
 */
type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = object,
  AsComponent extends As = As,
> = (
  | RightJoinProps<ComponentProps, AdditionalProps>
  | RightJoinProps<AsProps, AdditionalProps>
) & {
  /**
   * Specifies the element type to render.
   */
  as?: AsComponent;
};

/**
 * Defines a higher-order component type with a customizable 'as' prop and additional props.
 * @param Component - The base component type.
 * @param Props - Additional props to include.
 * @returns A function component type with dynamic element type.
 */
type ComponentWithAs<Component extends As, Props extends object = object> = {
  /**
   * Renders the component with specified props.
   */
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element | Promise<JSX.Element>;
  /**
   * Specifies the display name of the component.
   */
  displayName?: string;

  /**
   * Specifies the props types of the component.
   */
  propTypes?: React.WeakValidationMap<unknown>;

  /**
   * Specifies the context types of the component.
   */
  contextTypes?: React.ValidationMap<unknown>;

  /**
   * Specifies the default props of the component.
   */
  defaultProps?: Partial<unknown>;

  /**
   * Specifies the component identifier.
   */
  id?: string;
};

/**
 * Defines additional UI component props.
 */
type UIComponentProps = {
  /**
   * Specifies the number of lines to display for text truncate.
   */
  noOfLines?: string;
};

/**
 * Type for UI components extending base component functionality with additional UI props.
 * @param T - The base component type.
 * @param P - Additional props to include.
 * @returns A type representing a UI component with extended functionality.
 */
type UIComponent<
  T extends As,
  P extends object = object,
> = ComponentWithAs<T, Assign<UIComponentProps, P>>;

export type { As, PropsOf, Assign, UIComponent };
