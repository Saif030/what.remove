import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Plans from "../pages/Plans";
import Result from "../pages/Result";

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/result" element={<Result />} />
        </Routes>
    )
}

export default PageRoutes;