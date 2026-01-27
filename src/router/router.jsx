import { createBrowserRouter, Navigate } from "react-router-dom";
import Estilos from "../pages/Estilos";
import Pedidos from "../pages/Pedidos";
import Carrito from "../pages/Carrito";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import AdminLayout from "../layout/AdminLayout";
import NotFound from "../pages/NotFound";
import AdminStyles from "../pages/AdminStyles";
import AdminPedidos from "../pages/AdminPedidos";
import AdminClientes from "../pages/AdminClientes";
import { useAuth } from "../context/AuthContext";

// Componente para proteger rutas
const ProtectedRoute = ({ element, requiredAdmin = false, redirectAdminToPanel = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredAdmin && !user.admin) {
    return <Navigate to="/" replace />;
  }

  // Si es admin y no requiere admin, redirigir al panel admin
  if (redirectAdminToPanel && user.admin) {
    return <Navigate to="/admin-pedidos" replace />;
  }

  return element;
};

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <ProtectedRoute element={<Layout />} redirectAdminToPanel={true} />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Estilos />,
            },
            {
                path: "pedidos",
                element: <Pedidos />,
            },
            {
                path: "carrito",
                element: <Carrito />,
            },
        ],
    },
    {
        path: "/admin-pedidos",
        element: <ProtectedRoute element={<AdminLayout />} requiredAdmin={true} />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <AdminPedidos />,
            },
            {
                path: "styles",
                element: <AdminStyles />,
            },
            {
                path: "pedidos",
                element: <AdminPedidos />,
            },
            {
                path: "clientes",
                element: <AdminClientes />,
            },
        ],
    },
]);