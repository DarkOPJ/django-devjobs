import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import React from "react";
import PageLayout from "./layout/PageLayout";
import Homepage from "./pages/Homepage";
import JobsPage from "./pages/JobsPage";
import AddJobsPage from "./pages/AddJobsPage";
import EditJobsPage from "./pages/EditJobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ViewJob from "./pages/ViewJob";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import {jobLoader} from "./loaders/JobLoader";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<PageLayout/>}>
        <Route index element={<Homepage/>}/>
        <Route path="/jobs" element={<JobsPage/>}/>
        <Route path="/jobs/:id" element={<ViewJob/>} loader={jobLoader}/>
        <Route path="/add-job" element={<AddJobsPage/>}/>
        <Route path="/edit-job/:id" element={<EditJobsPage/>} loader={jobLoader}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Route>
    )
  )
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
};

export default App;
