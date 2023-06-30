import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { lightTheme, darkTheme } from '~/styles/themes';

export const useTheme = () => {
  const [theme, setTheme] = useState(lightTheme);
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('isDarkMode :', isDark);
    setTheme(isDark ? darkTheme : lightTheme);
  }, [isDark]);

  return { theme };
}
