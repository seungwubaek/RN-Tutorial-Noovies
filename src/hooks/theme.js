import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { defaultTheme, darkTheme } from '../styles/themes';

export const useTheme = () => {
  const [theme, setTheme] = useState(defaultTheme);
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('isDarkMode :', isDark);
    setTheme(isDark ? darkTheme : defaultTheme);
  }, [isDark]);

  return { theme };
}
