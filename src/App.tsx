import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import type React from "react";

const App: React.FC = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    );
};

export default App;
