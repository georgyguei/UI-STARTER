import { borderRadius } from './borderRadius';
import { colors } from './colors';
import { extendTheme } from './extendTheme';
import { screens } from './screens';
import { boxShadow } from './shadows';
import { transition } from './transitions';
import { typography } from './typography';
import { zIndex } from './zIndices';

const customTheme = extendTheme({
  colors,
  screens,
  zIndex,
  boxShadow,
  borderRadius,
  ...transition,
  ...typography,
});

export default customTheme;
