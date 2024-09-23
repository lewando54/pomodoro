import { ColorNames, Colors, Themes } from "@/constants/Colors";
import { AppThemeContext } from "@/contexts/AppThemeContext";
import { useContext } from "react";

export function useThemeColor(
  colorName: ColorNames
){
  const { theme } = useContext(AppThemeContext);

  return Colors[theme as Themes][colorName];
}
