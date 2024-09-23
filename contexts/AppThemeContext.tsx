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

    const currentScheme = useColorScheme() ?? 'light';
    const [scheme , setScheme] = useState<string>(currentScheme);
    const [theme, setTheme] = useState<keyof typeof Themes | null | undefined>(scheme as keyof typeof Themes);

    useEffect(() => {
        async function getTheme() {
        const savedTheme = await AsyncStorage.getItem('theme') ?? 'system';
        console.log(savedTheme);
        if (savedTheme === 'system') {
            setTheme(currentScheme);
        }
        else {
            setTheme(savedTheme as keyof typeof Themes);
        }
        }
        getTheme();
    }, [scheme]);

    useEffect(() => {
        setScheme(currentScheme);
    }, [currentScheme]);

    const themeData = {theme, setTheme};

    return (
        <AppThemeContext.Provider value={themeData}>
        {children}
        </AppThemeContext.Provider>
    );
};
