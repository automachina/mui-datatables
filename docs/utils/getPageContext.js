/* eslint-disable no-underscore-dangle */

import { SheetsRegistry } from 'jss';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import createGenerateClassName from '@mui/styles/createGenerateClassName';
import { purple, green } from '@mui/material/colors';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createTheme(
  adaptV4Theme({
    palette: {
      primary: purple,
      secondary: green,
    },
  }),
);

function createPageContext() {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
