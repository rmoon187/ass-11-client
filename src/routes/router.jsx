import { createBrowserRouter } from "react-router-dom";
import Layout from "../MainLayout/Layout";
import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "../components/PrivateRoute";
import NotFound from "../pages/NotFound";
import AddQuery from "../pages/AddQuery";
import MyQueries from "../pages/MyQueries";
import QueryDetails from "../pages/QueryDetails";




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
            {
                path: '/my-queries',
                element: <PrivateRoute><MyQueries></MyQueries></PrivateRoute>,
            },
            {
                path: '/query-details/:id',
                element: <PrivateRoute><QueryDetails></QueryDetails></PrivateRoute>,

            },

        ]
    }
])

export default router;