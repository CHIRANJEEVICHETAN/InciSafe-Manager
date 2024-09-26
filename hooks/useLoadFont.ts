import * as Font from "expo-font";
import { useEffect, useState } from "react";

// Custom hook to load fonts
const useLoadFont = (): boolean => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Roboto-Bold": require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
        "Roboto-Italic": require("../assets/fonts/Roboto/Roboto-Italic.ttf"),
        "Roboto-Light": require("../assets/fonts/Roboto/Roboto-Light.ttf"),
        "Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
        "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
        "Roboto-Thin": require("../assets/fonts/Roboto/Roboto-Thin.ttf"),
        "Roboto-BoldItalic": require("../assets/fonts/Roboto/Roboto-BoldItalic.ttf"),
        "Judson-Bold": require("../assets/fonts/Judson/Judson-Bold.ttf"),
        "Judson-Italic": require("../assets/fonts/Judson/Judson-Italic.ttf"),
        "Judson-Regular": require("../assets/fonts/Judson/Judson-Regular.ttf"),
        "Inter-ExtraBold": require("../assets/fonts/Inter/Inter_24pt-ExtraBold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};

export default useLoadFont;
