import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Plans from "../pages/Plans";
import Result from "../pages/Result";
import CheckoutPage from "../pages/CheckoutPage";

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/result" element={<Result />} />
            <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
    )
}

export default PageRoutes;