import { type FC, useEffect, useMemo, useState } from 'react';

import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from '../config/themeContext';

const preferTheme =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT;

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || preferTheme;
interface IThemeProvider {
  readonly children: JSX.Element;
}

export const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const html = document.querySelector('html');
    if (!html) return;

    html.classList.remove(Theme.DARK, Theme.LIGHT);
    html.classList.add(theme);
  }, [theme]);

  const defaultValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultValue}>
      {children}
    </ThemeContext.Provider>
  );
};
