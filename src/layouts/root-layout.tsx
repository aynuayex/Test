import { Outlet, useLocation, useNavigate } from "react-router";
import MainNav from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import useLogOut from "@/hooks/useLogOut";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const logOut = useLogOut();
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    logOut();
    setAuth({
      id: "",
      email: "",
      fullName: "",
      role: "",
      accessToken: "",
      emailVerified: true
    });
    setTimeout(() => {
      navigate("/");
    }, 0); 
    toast.success("You have Logged Out of your account!");
  };

  return (
    <>
      <header>
        <div className="w-full flex items-center justify-center px-4">
          <div className="mr-32 hidden md:block my-2">
            <img src="Logo.png"  alt="logo" />
          </div>
          <div className="w-full flex items-center justify-around h-20">
            <MainNav />
            {location.pathname !== "/sign-in" &&
              location.pathname !== "/sign-up" &&
              (auth?.accessToken ? (
                <Button className="bg-[#ffa200] rounded-xs" onClick={handleLogout}>Log Out</Button>
              ) : (
                <Button className="bg-[#ffa200] rounded-xs" onClick={() => navigate("/sign-in")}>Sign In</Button>
              ))}
          </div>
        </div>
      </header>
      <main className="px-4 ">
        <Outlet />
      </main>
    </>
  );
}
