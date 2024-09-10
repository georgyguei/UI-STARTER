import React from 'react';

type UseCounterProps = {
  /**
   * The callback fired when the value changes
   */
  onChange?(valueAsString: string, valueAsNumber: number): void;
  /**
   * The number of decimal points used to round the value
   */
  precision?: number;
  /**
   * The initial value of the counter. Should be less than `max` and greater than `min`
   */
  defaultValue?: string | number;
  /**
   * The value of the counter. Should be less than `max` and greater than `min`
   */
  value?: string | number;
  /**
   * The step used to increment or decrement the value
   * @default 1
   */
  step?: number;
  /**
   * The minimum value of the counter
   * @default Number.MIN_SAFE_INTEGER
   */
  min?: number;
  /**
   * The maximum value of the counter
   * @default Number.MAX_SAFE_INTEGER
   */
  max?: number;
  /**
   * This controls the value update behavior in general.
   *
   * - If `true` and you use the stepper or up/down arrow keys,
   *  the value will not exceed the `max` or go lower than `min`
   *
   * - If `false`, the value will be allowed to go out of range.
   *
   * @default true
   */
  keepWithinRange?: boolean;
};

export function useCounter(props?: UseCounterProps): {
  isOutOfRange: boolean;
  isAtMax: boolean;
  isAtMin: boolean;
  precision: number;
  value: string | number;
  valueAsNumber: number;
  update: (next: string | number) => void;
  reset: () => void;
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  clamp: (value: number) => string;
  cast: (value: string | number) => void;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
} {
  const {
    onChange,
    precision = 0,
    defaultValue = 0,
    value: valueProp,
    step = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    keepWithinRange = true,
  } = props || {};

  const [value, setValue] = React.useState<string | number>(
    valueProp ?? defaultValue
  );
  const valueAsNumber = React.useMemo(() => Number(value), [value]);
  const isOutOfRange = valueAsNumber < min || valueAsNumber > max;
  const isAtMax = valueAsNumber === max;
  const isAtMin = valueAsNumber === min;

  const update = (next: string | number) => {
    setValue(next);
    onChange?.(String(next), Number(next));
  };

  const reset = () => {
    setValue(defaultValue);
    onChange?.(String(defaultValue), Number(defaultValue));
  };

  const clamp = (value: number) => {
    return Math.min(Math.max(value, min), max).toFixed(precision);
  };

  const increment = (step?: number) => {
    const next = valueAsNumber + (step ?? 1);
    update(keepWithinRange ? clamp(next) : next);
  };

  const decrement = (step?: number) => {
    const next = valueAsNumber - (step ?? 1);
    update(keepWithinRange ? clamp(next) : next);
  };

  const cast = (value: string | number) => {
    const next = Number(value);
    update(keepWithinRange ? clamp(next) : next);
  };

  return {
    isOutOfRange,
    isAtMax,
    isAtMin,
    precision,
    value,
    valueAsNumber,
    update,
    reset,
    increment,
    decrement,
    clamp,
    cast,
    setValue,
  };
}
