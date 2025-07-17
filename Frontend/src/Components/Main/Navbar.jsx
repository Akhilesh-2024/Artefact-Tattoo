import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const [navbarData, setNavbarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch navbar data from API
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API}/api/tatto/navbar`);
        setNavbarData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNavbar();
  }, []);

  // Handle active links
  useEffect(() => {
    if (loading || error) return;

    const currentPath = location.pathname;
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    const activeLink = document.querySelector(
      `.nav-link[href="${currentPath}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }, [location, loading, error]);

  // Render dropdown menu
  const renderDropdown = (navItem) => {
    return (
      <li className="nav-item dropdown" key={navItem._id || navItem.label}>
        <Link
          className={`nav-link dropdown-toggle ${
            navItem.subItems.some(
              (subItem) =>
                subItem.path === location.pathname ||
                (subItem.children &&
                  subItem.children.some(
                    (child) => child.path === location.pathname
                  ))
            )
              ? "active"
              : ""
          }`}
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {navItem.label} <i className="ti-angle-down" />
        </Link>
        <ul className="dropdown-menu">
          {navItem.subItems.map((subItem) => (
            <li key={subItem._id || subItem.label}>
              {subItem.children && subItem.children.length > 0 ? (
                <>
                  <Link
                    className={`dropdown-item dropdown-toggle ${
                      subItem.children.some(
                        (child) => child.path === location.pathname
                      )
                        ? "active"
                        : ""
                    }`}
                    to="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {subItem.label} <i className="ti-angle-right" />
                  </Link>
                  <ul className="dropdown-menu dropdown-submenu">
                    {subItem.children.map((child) => (
                      <li key={child._id || child.label}>
                        <Link
                          to={child.path}
                          className={`dropdown-item ${
                            location.pathname === child.path ? "active" : ""
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={subItem.path}
                  className={`dropdown-item ${
                    location.pathname === subItem.path ? "active" : ""
                  }`}
                >
                  {subItem.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </li>
    );
  };

  if (loading)
    return <div className="navbar-placeholder">Loading navbar...</div>;
  if (error)
    return (
      <div className="navbar-placeholder">Error loading navbar: {error}</div>
    );
  if (!navbarData)
    return <div className="navbar-placeholder">No navbar data found</div>;

  const getFullLogoUrl = (logoPath) => {
    if (!logoPath) return "/invalid/path.jpg"; // force broken image
    return `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/${logoPath.replace(/^\/?/, "")}`;
  };

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        {/* Logo */}
        <div className="logo-wrapper">
          <Link className="logo" to="/">
            <img
              src={getFullLogoUrl(navbarData.logo)}
              className="logo-img"
              alt="Logo"
              onError={(e) => {
                // Let broken image show visually
                e.currentTarget.onerror = null;
              }}
            />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="ti-menu" />
          </span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto">
            {navbarData.navItems.map((navItem) =>
              navItem.dropdown ? (
                renderDropdown(navItem)
              ) : (
                <li className="nav-item" key={navItem._id || navItem.label}>
                  <Link
                    className={`nav-link ${
                      location.pathname === navItem.path ? "active" : ""
                    }`}
                    to={navItem.path}
                  >
                    {navItem.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
