import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import darkTheme from '~/styles/themes';

export const useTheme = () => {
  const [theme, setTheme] = useState(darkTheme);
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('(disabled) isDarkMode :', isDark);
    // setTheme(isDark ? darkTheme : lightTheme);
  }, [isDark]);

  return { theme };
};
