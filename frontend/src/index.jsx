/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";

// layout
import DefaultLayout from "./layouts/default";
import AuthLayout from "./layouts/auth";
import DashboardLayout from "./layouts/dashboard";

// routes
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

// providers
import AuthProvider from "./contexts/AuthContext";

render(
  () => (
    <AuthProvider>
      <Router root={DefaultLayout}>
        <Route path="/" component={DashboardLayout}>
          <Route path="/" component={Home} />
          <Route path="/search" component={Search} />
        </Route>
        <Route path="/" component={AuthLayout}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Route>
        <Route path="*paramName" component={NotFound} />
      </Router>
    </AuthProvider>
  ),
  document.getElementById("root")
);
