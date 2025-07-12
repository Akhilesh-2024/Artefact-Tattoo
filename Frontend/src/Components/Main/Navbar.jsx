import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();
  
  // Function to handle active links
  useEffect(() => {
    // Update active class based on current path
    const currentPath = location.pathname;
    
    // Remove active class from all links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current link
    let activeLink;
    if (currentPath === '/') {
      activeLink = document.querySelector('.navbar-nav .nav-link[href="/"]');
    } else {
      activeLink = document.querySelector(`.navbar-nav .nav-link[href="${currentPath}"]`);
    }
    
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }, [location]);
  
  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        {/* Logo */}
        <div className="logo-wrapper">
          <Link className="logo" to="/">
            <img src="img/logo-light.png" className="logo-img" alt="Logo" />
          </Link>
        </div>
        {/* Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="ti-menu" />
          </span>
        </button>
        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={location.pathname === '/' ? 'nav-link active' : 'nav-link'} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'} to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={location.pathname === '/services' ? 'nav-link active' : 'nav-link'} to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className={location.pathname === '/portfolio' ? 'nav-link active' : 'nav-link'} to="/portfolio">
                Portfolio
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={
                  location.pathname === '/team' || 
                  location.pathname === '/team-details' || 
                  location.pathname === '/pricing' || 
                  location.pathname === '/faqs' || 
                  location.pathname === '/aftercare' || 
                  location.pathname === '/services-page' || 
                  location.pathname === '/post' || 
                  location.pathname === '/404' || 
                  location.pathname === '/coming-soon' 
                    ? 'nav-link dropdown-toggle active' 
                    : 'nav-link dropdown-toggle'
                }
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                Pages <i className="ti-angle-down" />
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/pricing" className={location.pathname === '/pricing' ? 'dropdown-item active' : 'dropdown-item'}>
                    <span>Pricing</span>
                  </Link>
                </li>
                <li>
                  <Link to="/team" className={location.pathname === '/team' ? 'dropdown-item active' : 'dropdown-item'}>
                    <span>Team</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className={location.pathname === '/faqs' ? 'dropdown-item active' : 'dropdown-item'}>
                    <span>Faq</span>
                  </Link>
                </li>
                <li>
                  <Link to="/aftercare" className={location.pathname === '/aftercare' ? 'dropdown-item active' : 'dropdown-item'}>
                    <span>Aftercare</span>
                  </Link>
                </li>
                <li>
                  <Link to="/team-details" className={location.pathname === '/team-details' ? 'dropdown-item active' : 'dropdown-item'}>
                    <span>Team Details</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services-page" className={location.pathname === '/services-page' ? 'dropdown-item active' : 'dropdown-item'}>
                    <span>Services Page</span>
                  </Link>
                </li>
                <li>
                  <Link to="/post" className={location.pathname === '/post' ? 'dropdown-item active' : 'dropdown-item'}>
                    <span>Post Page</span>
                  </Link>
                </li>
                <li className="dropdown-submenu dropdown">
                  <Link
                    className={
                      location.pathname === '/404' || location.pathname === '/coming-soon'
                        ? 'dropdown-item dropdown-toggle active'
                        : 'dropdown-item dropdown-toggle'
                    }
                    to="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                  >
                    <span>
                      Other Pages <i className="ti-angle-right" />
                    </span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/404" className={location.pathname === '/404' ? 'dropdown-item active' : 'dropdown-item'}>
                        <span>404 Page</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/coming-soon" className={location.pathname === '/coming-soon' ? 'dropdown-item active' : 'dropdown-item'}>
                        <span>Coming Soon</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={location.pathname === '/blog' ? 'nav-link active' : 'nav-link'} to="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
