import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";

const themes = {
    dark: `${process.env.PUBLIC_URL}/antd.dark.css`,
    light: `${process.env.PUBLIC_URL}/antd.compact.css`,
};

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
                <App />
            </ThemeSwitcherProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
