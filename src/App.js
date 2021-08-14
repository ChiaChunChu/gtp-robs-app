import React, { useContext, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";

import MainPage from "./pages/Main";
import MainNavigation from "./components/layout/MainNavigation";
import AuthContext from "./store/AuthContext";
import CustomersInfo from "./components/CustomersInfo";

const MyBookingsPage = React.lazy(() => import("./pages/MyBookings"));
const NewBookingPage = React.lazy(() => import("./pages/NewBooking"));
const MyProfilePage = React.lazy(() => import("./pages/MyProfile"));
const LoginPage = React.lazy(() => import("./pages/Login"));
const SignupPage = React.lazy(() => import("./pages/Signup"));
const ManagementPage = React.lazy(() => import("./pages/Management"));

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.role === "Admin";

  return (
    <div>
      <MainNavigation />
      <Suspense
        fallback={
          <div className="spinloader">
            <Spinner animation="border" variant="secondary" />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path="/my-bookings">
            {isLoggedIn && <MyBookingsPage />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/new-booking">
            {isLoggedIn && <NewBookingPage />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/my-profile">
            {isLoggedIn && <MyProfilePage />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/management">
            {isLoggedIn && isAdmin && <ManagementPage />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/management/customers-info">
            {isLoggedIn && isAdmin && <CustomersInfo />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
