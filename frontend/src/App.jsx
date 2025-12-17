import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const SignupPage = lazy(() => import("./pages/SignupPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const MakeNewProfile = lazy(() => import("./pages/MakeNewProfile"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"));
const MyListPage = lazy(() => import("./pages/MyListPage"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));
const RedirectIfAuth = lazy(() => import("./components/RedirectIfAuth"));
const Movies = lazy(() => import("./pages/Movies"));
const AllMoviesPage = lazy(() => import("./pages/AllMoviesPage"));
const AdminPanelPage = lazy(() => import("./pages/AdminPanelPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const TVShows = lazy(() => import("./pages/TVShows"));
const AllTVShowsPage = lazy(() => import("./pages/AllTVShowsPage"));
// import SignupPage from "./pages/SignupPage";
// import LoginPage from "./pages/LoginPage";
// import ProfilePage from "./pages/ProfilePage";
// import DashboardPage from "./pages/DashboardPage";
// import MakeNewProfile from "./pages/MakeNewProfile";
// import MovieDetailPage from "./pages/MovieDetailPage";
// import MyListPage from "./pages/MyListPage";
// import RequireAuth from "./components/RequireAuth";
// import RedirectIfAuth from "./components/RedirectIfAuth";
import { useDispatch } from "react-redux";
import { setSelectedProfile } from "./features/profiles/profileSlice";
import { setUser } from "./features/user/userSlice";
// import Movies from "./pages/Movies";
// import AllMoviesPage from "./pages/AllMoviesPage";
// import AdminPanelPage from "./pages/AdminPanelPage";
// import HistoryPage from "./pages/HistoryPage";
// import AdminLogin from './pages/AdminLogin';
// import TVShows from "./pages/TVShows";
// import AllTVShowsPage from "./pages/AllTVShowsPage";


function App() {
  const dispatch = useDispatch();
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    // Restore user from localStorage if present
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
    // Restore selectedProfile from localStorage if present
    const storedProfile = localStorage.getItem("selectedProfile");
    if (storedProfile) {
      dispatch(setSelectedProfile(JSON.parse(storedProfile)));
    }
    setRestored(true);
  }, [dispatch]);

  // Only render routes after restoration is complete
  if (!restored) return null;

  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfAuth>
              <SignupPage />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfAuth>
              <LoginPage />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/admin/login"
          element={
            <RedirectIfAuth>
              <AdminLogin />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuth>
              <SignupPage />
            </RedirectIfAuth>
          }
        />
        <Route
          path="/profiles"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequireAuth>
              <HistoryPage />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route
          path="/makenewprofile"
          element={
            <RequireAuth>
              <MakeNewProfile />
            </RequireAuth>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <RequireAuth>
              <MovieDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path="/mylist"
          element={
            <RequireAuth>
              <MyListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/movies"
          element={
            <RequireAuth>
              <Movies />
            </RequireAuth>
          }
        />
        <Route
          path="/tvshows"
          element={
            <RequireAuth>
              <TVShows />
            </RequireAuth>
          }
        />
        <Route
          path="/allmovies"
          element={
            <RequireAuth>
              <AllMoviesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/alltvshows"
          element={
            <RequireAuth>
              <AllTVShowsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth adminOnly>
              <AdminPanelPage />
            </RequireAuth>
          }
        />
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
