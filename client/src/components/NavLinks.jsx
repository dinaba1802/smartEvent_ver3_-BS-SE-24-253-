import { useAuth } from "../context/AuthContext";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const { toggleSidebar } = useDashboardContext();
  const { user } = useAuth();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon, role } = link;
        if (!user || (user.role !== "admin" && role === "admin")) {
          return null;
        }
        if (!user || (user.role !== "business" && role === "business")) {
          return null;
        }
        if (text === "add business" && user.businessInformation) {
          return (
            <NavLink
              to={"/dashboard/edit-business"}
              key={text}
              onClick={toggleSidebar}
              className="nav-link"
              end
            >
              <span className="icon">{icon}</span>
              {"Edit Business"}
            </NavLink>
          );
        }
        // admin user
        return (
          <NavLink
            to={path}
            key={text}
            onClick={toggleSidebar}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
