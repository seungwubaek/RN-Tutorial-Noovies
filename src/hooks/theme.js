import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { defaultColors, darkColors } from '../styles/colors';

export const useTheme = () => {
  const [colors, setColors] = useState(defaultColors);
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('isDarkMode :', isDark);
    setColors(isDark ? darkColors : defaultColors);
  }, [isDark]);

  return { colors };
}
