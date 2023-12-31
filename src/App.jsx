import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
import Loading from "@/components/Loading";
import Layout from "./layout/Layout";
import Counter from "./pages/dashboard/counter/Counter";
import Posts from "./pages/posts/Posts";
import Categories from "./pages/dashboard/categories/Categories";
import SubCategories from "./pages/dashboard/subCategory/SubCategories";
import Brands from "./pages/dashboard/brand/Brands";
import AboutUs from "./pages/dashboard/aboutUs/AboutUs";
import Products from "./pages/dashboard/products/Products";

const Login = lazy(() => import("./pages/auth/login"));

function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="counter" element={<Counter />} />
          <Route path="posts" element={<Posts />} />
          <Route path="categories" element={<Categories />} />
          <Route path="sub-categories" element={<SubCategories />} />
          <Route path="brand" element={<Brands />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="products" element={<Products />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
