import { createBrowserRouter } from "react-router-dom";
import Estilos from "../pages/Estilos";
import Pedidos from "../pages/Pedidos";
import Carrito from "../pages/Carrito";
import Layout from "../layout/Layout";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Estilos />,
        },
            {
                path: "/pedidos",
                element: <Pedidos />,
            },
            {
                path: "/carrito",
                element: <Carrito />,
            },
        ],
    },
    
]);