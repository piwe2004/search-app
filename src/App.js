import React from "react";
import SearchInput from "./components/SearchInput";
import NavigationBar from "./components/NavigationBar";
import { Navigate, Route, Routes } from "react-router-dom";
import AllResult from "./components/results/AllResult";
import ImageResult from './components/results/ImageResult';

function App() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="flex flex-wrap justify-center relative">
                <SearchInput />
                <NavigationBar />
            </div>
            <Routes>
                <Route exact path="/" element={<Navigate to="/all" />} />
                <Route exact path="/all" element={<AllResult />} />
                <Route exact path="/photo" element={<ImageResult />} />
            </Routes>
        </div>
    );
}

export default App;
