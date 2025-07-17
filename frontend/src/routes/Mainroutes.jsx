import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import AuthWrapper from "./AuthWrapper";
import PageNotFound from "../pages/PageNotFound";

const UnauthWrapper = lazy(() => import("./UnauthWrapper"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const Products = lazy(() => import("../pages/Products"));
const UserProfile = lazy(() => import("../pages/users/UserProfile"));
const Cart = lazy(() => import("../pages/Cart"));

const MainRoutes = () => {
    return (
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
               
                <Route
                path="/login"
                element={
                    <UnauthWrapper>
                        <Login />
                    </UnauthWrapper>
                }
                />
                <Route
                    path="/register"
                    element={
                        <UnauthWrapper>
                            <Register />
                        </UnauthWrapper>
                    }
                />
                <Route
                    path="/admin/create-product"
                    element={
                        <AuthWrapper>
                            <CreateProduct />
                        </AuthWrapper>
                    }
                />
                <Route
                    path="/admin/user-profile"
                    element={
                        <AuthWrapper>
                            <UserProfile />
                        </AuthWrapper>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <AuthWrapper>
                            <Cart />
                        </AuthWrapper>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <AuthWrapper>
                            <ProductDetails />
                        </AuthWrapper>
                    }
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
    );
};

export default MainRoutes;