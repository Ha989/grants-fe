import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import UserPage from "../pages/UserPage";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectListPage from "../pages/ProjectListPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import AuthLayout from "../layouts/AuthLayout";
import AuthRequired from "./AuthRequired";
import CreatorPage from "../pages/CreatorPage";
import VerificationPage from "../pages/VerificationPage";
import CreateDetailPage from "../pages/CreateDetailPage";
import ProjectList from "../features/project/ProjectList";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="project" element={<ProjectList />} />
      </Route>
      <Route
        element={
          <AuthRequired>
            <AuthLayout />
          </AuthRequired>
        }
      >
        <Route path="/creator" element={<CreatorPage />} />
        <Route path="/user/account" element={<UserPage />} />
        <Route path="/:projectId" element={<ProjectDetailPage />} />
        <Route path="/creator/account" element={<CreateDetailPage />}/>
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/:id/verify/:code" element={<VerificationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;