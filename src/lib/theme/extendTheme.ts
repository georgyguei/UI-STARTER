import type {
  CustomThemeConfig,
  KeyValuePair,
  ResolvableTo,
} from 'tailwindcss/types/config';

/**
 * Utility type to conditionally check if a type `T` is `any`, and if so, return type `N`, otherwise return type `Y`.
 * This is used to filter out properties of type `any` in other utility types.
 *
 * @template T - The type to check.
 * @template Y - The type to return if `T` is not `any`.
 * @template N - The type to return if `T` is `any`.
 */
type IfNotAny<T, Y, N> = 0 extends 1 & T ? N : Y;

/**
 * Type utility that excludes properties of type `any` from a given type `T`.
 * This is achieved by using the `IfNotAny` utility type to conditionally include or exclude properties.
 *
 * @template T - The type from which to exclude `any` properties.
 */
type ExcludeAny<T> = {
  [P in keyof T as IfNotAny<T[P], P, never>]: T[P];
};

/**
 * Represents the properties of `CustomThemeConfig` after excluding any properties of type `any`.
 * This type is useful for ensuring that theme properties are strictly typed.
 */
type ThemePropertiesWithoutAny = ExcludeAny<CustomThemeConfig>;

/**
 * Identifies the keys from `ThemePropertiesWithoutAny` that are considered numeric theme properties.
 * Currently, this is limited to the 'zIndex' property but can be expanded to include others.
 */
type NumericThemeKeys = keyof Pick<
  ThemePropertiesWithoutAny,
  'zIndex' | 'fontWeight' | 'lineHeight'
>;

/**
 * Defines the structure for an extended theme configuration. It allows numeric theme keys
 * to be specified either as their original type or as a resolvable key-value pair.
 * This flexibility facilitates more dynamic theme customization.
 *
 * @template CustomThemeConfig - The base theme configuration type.
 */
export type ExtendedThemeConfig = Partial<{
  [P in keyof CustomThemeConfig]: P extends NumericThemeKeys
    ? ResolvableTo<KeyValuePair<string, string | number>>
    : CustomThemeConfig[P];
}>;

/**
 * Processes a value to be compatible with the theme configuration, converting objects
 * to key-value pairs and other values to strings.
 *
 * @param value The value to process.
 * @returns The processed value, suitable for theme configuration.
 */
const processValueForTheme = (value: unknown): unknown => {
  if (typeof value === 'string' || Array.isArray(value)) {
    // Directly return strings and arrays without modification.
    return value;
  }
  if (typeof value === 'object' && value !== null) {
    // For objects, recursively process each property value.
    return Object.entries(value).reduce(
      (acc, [key, val]) => {
        // Recursively process and assign the value.
        acc[key] = processValueForTheme(val);
        return acc;
      },
      {} as Record<string, unknown>
    );
  }
  // For all other types, convert to string.
  return String(value);
};

/**
 * Extends a TailwindCSS theme configuration with additional customizations.
 *
 * @param theme The theme configuration to extend.
 * @returns The extended theme configuration.
 */
export const extendTheme = (theme: ExtendedThemeConfig) => {
  return Object.entries(theme).reduce(
    (acc, [key, value]) => {
      acc[key] = processValueForTheme(value);
      return acc;
    },
    {} as Partial<CustomThemeConfig>
  );
};
