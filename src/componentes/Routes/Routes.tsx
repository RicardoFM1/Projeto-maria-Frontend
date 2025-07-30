import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/login";
import { Home } from "../pages/Home/home";


export const Rotas = () => {
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
    </Routes>
}