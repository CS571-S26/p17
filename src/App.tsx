import type React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import WatchlistPage from "./pages/WatchlistPage";
import AboutPage from "./pages/AboutPage";
import WatchedPage from "./pages/WatchedPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/watchlist" element={<WatchlistPage />} />
                <Route path="/watched" element={<WatchedPage />} />
                <Route path="/about" element={<AboutPage />} />
            </Route>
        </Routes>
    );
};

export default App;
