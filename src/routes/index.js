import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import BlankLayout from "../layouts/BlankLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthLayout from "../layouts/AuthLayout";
import AuthRequired from "./AuthRequired";
import CreatorPage from "../pages/CreatorPage";
import VerificationPage from "../pages/VerificationPage";
import CreateDetailPage from "../pages/CreateDetailPage";
import ProjectList from "../features/project/ProjectList";
import SingleProject from "../features/project/SingleProject";
import Donation from "../features/project/Donation";
import UserPanel from "../features/user/UserPanel";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<SingleProject />} />
      </Route>
      <Route
        element={
          <AuthRequired>
            <AuthLayout />
          </AuthRequired>
        }
      > 
      <Route path="/projects/:projectId/donation/:userId" element={<Donation />}/>
        <Route path="/creators" element={<CreatorPage />} />
        <Route path="/users/account" element={<UserPanel />} />
        <Route path="/creators/account" element={<CreateDetailPage />} />
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
