import type React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>
        </Routes>
    );
};

export default App;
