import { Themes } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    PropsWithChildren,
    createContext,
    useEffect,
    useState,
} from 'react';
import {useColorScheme} from 'react-native';

interface ThemeContextInterface {
    theme: keyof typeof Themes | null | undefined;
    setTheme: React.Dispatch<React.SetStateAction<keyof typeof Themes | null| undefined>>;
}

export const AppThemeContext = createContext<ThemeContextInterface>({
    theme: null,
    setTheme: () => {}
});

type ThemeProviderProps = PropsWithChildren;

export const AppThemeProvider = ({children}: ThemeProviderProps) => {

    const scheme = useColorScheme() ?? 'light';
    const [theme, setTheme] = useState<keyof typeof Themes | null | undefined>(scheme);

    useEffect(() => {
        async function getTheme() {
        const savedTheme = await AsyncStorage.getItem('theme') ?? 'system';
        if (savedTheme === 'system') {
            setTheme('light');
        }
        else {
            setTheme(savedTheme as keyof typeof Themes);
        }
        }
        getTheme();
    }, []);

    const themeData = {theme, setTheme};

    return (
        <AppThemeContext.Provider value={themeData}>
        {children}
        </AppThemeContext.Provider>
    );
};
