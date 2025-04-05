import { NavLink } from "react-router";

export default function MainNav() {
  const routes = [
    {
      to: `/`,
      label: "Home",
    },
    {
      to: `/features`,
      label: "Features",
    },
    {
      to: `/about`,
      label: "About Us",
    },
    {
      to: `/contact`,
      label: "Contact Us",
    },
  ];
  return (
    <nav className="flex items-center space-x-8 lg:space-x-32">
      {routes.map((route) => (
        <NavLink
          key={route.to}
          to={route.to}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-white/90
            ${
              isActive ? "text-white font-bold text-xl border-b-3" : "text-white/80"
            }`
          }
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
}
