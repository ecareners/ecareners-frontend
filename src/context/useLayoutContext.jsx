import useToggle from '@/hooks/useToggle';
import { toggleDocumentAttribute } from '@/utils/layout';
import { createContext, useContext, useMemo, useState } from 'react';
const ThemeContext = createContext(undefined);
const useLayoutContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useLayoutContext can only be used within LayoutProvider');
  }
  return context;
};
const storageThemeKey = 'EDUPORT_THEME_KEY';
const themeKey = 'data-bs-theme';
const LayoutProvider = ({
  children
}) => {
  // Force theme to light mode for now
  const INIT_STATE = {
    theme: 'light'
  };
  const [settings, setSettings] = useState(INIT_STATE);
  const {
    isTrue,
    toggle
  } = useToggle();

  // update settings
  const updateSettings = _newSettings => setSettings({
    ...settings,
    ..._newSettings
  });

  // update theme mode
  const changeTheme = newTheme => {
    // Only allow switching to light for now
    if (newTheme !== 'light') return;
    updateSettings({
      ...settings,
      theme: 'light'
    });
  };
  const appMenuControl = {
    open: isTrue,
    toggle: toggle
  };
  return <ThemeContext.Provider value={useMemo(() => ({
    ...settings,
    theme: settings.theme,
    changeTheme,
    appMenuControl
  }), [settings, isTrue])}>
      {children}
    </ThemeContext.Provider>;
};
export { LayoutProvider, useLayoutContext };
