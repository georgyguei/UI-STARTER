import { cn } from '@/lib/utils';
import Box from '../layout/box';
import type { UIComponent } from '../type';

/**
 * Represents all valid DOM element types for text content in the application.
 */
type TextDomElements =
  | 'p' // Paragraph
  | 'span' // Inline container
  | 'label' // Label for a form element
  | 'strong' // Important text
  | 'em' // Emphasized text
  | 'b' // Bold text
  | 'i' // Italic text
  | 'u' // Underlined text
  | 's' // Strikethrough text
  | 'mark' // Marked/Highlighted text
  | 'small' // Smaller text
  | 'del' // Deleted text
  | 'ins' // Inserted text
  | 'sub' // Subscript text
  | 'sup' // Superscript text
  | 'q' // Short quotation
  | 'blockquote' // A section that is quoted from another source
  | 'abbr' // Abbreviation or acronym
  | 'cite' // The title of a work
  | 'dfn' // A defining instance of a term
  | 'code' // A piece of computer code
  | 'samp' // Sample output from a computer program
  | 'kbd' // Keyboard input
  | 'var' // A variable
  | 'pre' // Preformatted text
  | 'time' // A specific time (24-hour clock)
  | 'data' // Machine-readable equivalent of content
  | 'ruby' // Ruby annotation (used in East Asian typography)
  | 'rt' // Explanation/pronunciation of characters (for East Asian typography)
  | 'rp' // What to show browsers that don't support ruby annotations
  | 'bdi' // Isolates a part of text that might be formatted in a different direction from other text outside it
  | 'bdo'; // Overrides the current text direction

/**
 * Defines a generic type for typography components in the UI library.
 *
 * This type is used to create strongly typed components that render text elements,
 * ensuring they receive both the standard props of their DOM element type and any additional
 * custom props defined.
 *
 * @template T - The type of the DOM element to render (e.g., 'h1', 'p').
 * @template P - An object representing the custom props for the component. Defaults to an empty object.
 */
type UITypographyComponent<
  T extends TextDomElements,
  P extends object = object,
> = UIComponent<T, P>;

/**
 * Text is the used to render text and paragraphs within an interface.
 *
 * @example
 * <Text>
 *  I love with React & Next.js
 * </Text>
 *
 * @param props - The props of the component.
 *
 * @returns The Text component.
 */
const Text: UITypographyComponent<'p', object> = (props): JSX.Element => {
  const { className, ...rest } = props;

  return <Box as="p" className={cn(className)} {...rest} />;
};

Text.displayName = 'Text';

export default Text;
