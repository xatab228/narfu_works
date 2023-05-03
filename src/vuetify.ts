import {createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import {aliases, mdi} from "vuetify/iconsets/mdi-svg";
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import type {ThemeDefinition} from "vuetify/vuetify";

const LightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#788bff',
    'primary-darken-1': '#5465ff',
    secondary: '#e2fdff',
    'secondary-darken-1': '#bfd7ff',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: LightTheme
    },
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
    },
    sets: {
      mdi,
    },
  },
})

export default vuetify