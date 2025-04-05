import { Toaster } from "react-hot-toast";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import { RouterProvider } from "react-router/dom";

import RootLayout from "./layouts/root-layout";
// import DashboardLayout from "./layouts/dashboard-layout";
import Home from "./pages/home";
// import DashboardPage from "./routes/dashboard";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
// import VerifyEmail from "./routes/verify-email";
import { AuthProvider } from "./context/auth-provider";
import Feature from "./pages/feature";
import Contact from "./pages/contact";
import About from "./pages/about";
import Office from "./pages/office";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" 
      element={<RootLayout />}
      >
        <Route index element={<Home />} />
        <Route
          path="features"
          element={
            <div className="flex justify-center">
              <Feature />
            </div>
          }
        />
        <Route
          path="contact"
          element={
            <div className="flex justify-center">
              <Contact />
            </div>
          }
        />
        <Route
          path="about"
          element={
            <div className="flex justify-center">
              <About />
            </div>
          }
        />
        <Route
          path="sign-in"
          element={
            <div className="flex justify-center">
              <SignIn />
            </div>
          }
        />
        <Route
          path="sign-up"
          element={
            <div className="flex justify-center">
              <SignUp />
            </div>
          }
        />
        <Route
          path="office"
          element={
            <div className="flex justify-center">
              <Office />
            </div>
          }
        />
        {/* <Route
          path="verify-email"
          element={
            <div className="flex justify-center">
              <VerifyEmail />
            </div>
          }
        /> */}
        <Route path="dashboard" 
        // element={<DashboardLayout />}
        >
          {/* <Route index element={<DashboardPage />} /> */}
          {/* <Route path="ticket" element={<TicketForm />} />
          <Route path="ticket/:ticketId" element={<TicketForm />} /> */}
        </Route>
      </Route>
    ),
    {
      future: {
        // v7_relativeSplatPath: true,
        // v7_startTransition: true,
        // v7_fetcherPersist: true,
        // v7_normalizeFormMethod: true,
        // v7_partialHydration: true,
        // v7_skipActionErrorRevalidation: true,
      },
    }
  );

  return (
        <AuthProvider>
          <RouterProvider
            router={router}
            // future={{
            //   v7_startTransition: true,
            // }}
          />
        <Toaster />
        </AuthProvider>
  );
}

export default App;
