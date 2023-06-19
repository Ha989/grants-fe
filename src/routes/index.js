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
import VerificationPage from "../pages/VerificationPage";
import ProjectList from "../features/project/ProjectList";
import SingleProject from "../features/project/SingleProject";
import Donation from "../features/project/Donation";
import UserPanel from "../features/user/UserPanel";
import CreateProject from "../features/creator/CreateProject";
import CreatorDashboard from "../features/creator/CreatorDashboard";
import CreatorLayout from "../layouts/CreatorLayout";
import CreatorSettings from "../features/creator/CreatorSettings";
import CreatorDonations from "../features/creator/CreatorDonations";
import CreatorProjects from "../features/creator/CreatorProjects";

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
        <Route
          path="/projects/:projectId/donation/:userId"
          element={<Donation />}
        />
        <Route path="/creators" element={<CreateProject />} />
        <Route path="/users/account" element={<UserPanel />} />
      </Route>
      <Route
        element={
          <AuthRequired>
            <CreatorLayout />
          </AuthRequired>
        }
      >
        <Route path="/creators/account" element={<CreatorDashboard />} />
        <Route path="/creators/dashboard" element={<CreatorDashboard />} />
        <Route path="/creators/settings" element={<CreatorSettings />} />
        <Route path="/creators/donations" element={<CreatorDonations />} />
        <Route path="/creators/projects" element={<CreatorProjects />} />
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
