import { useEffect, useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const themes = {
  sunset: "sunset",
  winter: "winter",
};

const checkTheme = () => {
  let currentTheme = localStorage.getItem("currentTheme");

  if (currentTheme === null) {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;
    currentTheme = prefersDarkMode ? themes.sunset : themes.winter;
  } else {
    currentTheme =
      currentTheme === themes.sunset ? themes.sunset : themes.winter;
  }

  localStorage.setItem("currentTheme", currentTheme);
  return currentTheme;
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(null);

  const toggleTheme = () => {
    const newTheme = theme === themes.sunset ? themes.winter : themes.sunset;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("currentTheme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const theme = checkTheme();
    document.documentElement.setAttribute("data-theme", theme);
    setTheme(theme);
  }, []);

  return (
    <button onClick={toggleTheme} className="btn btn-link btn-sm">
      {theme === "sunset" ? (
        <BsSunFill className="h-4 w-4" />
      ) : (
        <BsMoonFill className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
