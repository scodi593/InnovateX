import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import NotFound from "./pages/not-found";
import UserLayout from "./components/user-view/layout";
import UserHome from "./pages/user-view/home";
import UserAccount from "./pages/user-view/account";
import UserCheckout from "./pages/user-view/checkout";
import EventListing from "./pages/user-view/listing";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import PaypalReturnPage from "./pages/user-view/paypal-return";
import PaymentSuccessPage from "./pages/user-view/payment-success";
function App() {
 
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div>Loadin....</div>;
  console.log(isLoading,user)

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="register" element={<AuthRegister />}></Route>
          <Route path="login" element={<AuthLogin />}></Route>
        </Route>

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />}></Route>
        </Route>

        {/* USer Route */}
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<EventListing />}></Route>
          <Route path="account" element={<UserAccount />}></Route>
          <Route path="checkout" element={<UserCheckout />}></Route>
          <Route path="listing" element={<UserHome />}></Route>
          <Route path="paypal-return" element={<PaypalReturnPage/>}></Route>
          <Route path="payment-success" element={<PaymentSuccessPage/>}></Route>
        </Route>


        <Route path ="/unauth-page" element={<UnAuthPage/>}></Route>
        <Route path="*" element={<NotFound />} />
       
      </Routes>
    </div>
  );
}

export default App;
