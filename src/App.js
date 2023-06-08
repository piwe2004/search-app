import React from "react";
import SearchInput from "./components/SearchInput";
import NavigationBar from "./components/NavigationBar";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="flex flex-wrap justify-center relative">
                <SearchInput />
                <NavigationBar />
            </div>
            <Routes>
                <Route exact path="/" element={<Navigate to="/all" />} />
            </Routes>
        </div>
    );
}

export default App;
