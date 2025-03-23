import { createBrowserRouter } from "react-router-dom";
import Layout from "../MainLayout/Layout";
import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "../components/PrivateRoute";
import NotFound from "../pages/NotFound";
import AddQuery from "../pages/AddQuery";




const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        errorElement: <NotFound></NotFound>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },

            {
                path: '/add-query',
                element: <PrivateRoute><AddQuery></AddQuery></PrivateRoute>,
            },
            // {
            //     path: '/my-queries',
            //     element: <PrivateRoute><MyQueries></MyQueries></PrivateRoute>,
            // },

        ]
    }
])

export default router;