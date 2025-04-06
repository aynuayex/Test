import { Toaster } from "react-hot-toast";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import { RouterProvider } from "react-router/dom";

import { AuthProvider } from "./context/auth-provider";
import RootLayout from "./layouts/root-layout";
import Home from "./pages/home";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import Office from "./pages/office";
import About from "./pages/about";
import Feature from "./pages/feature";
import Contact from "./pages/contact";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Feature />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="office" element={<Office />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
