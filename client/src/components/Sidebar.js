import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/browse', label: 'Browse Movies', icon: '🎬' },
    { path: '/search', label: 'Search', icon: '🔍' },
    { path: '/my-reviews', label: 'My Reviews', icon: '⭐' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
  ];

  return (
    <div className="sidebar bg-dark text-white p-3">
      <h3 className="mb-4 text-center">Movie Reviews</h3>
      <nav>
        <ul className="nav flex-column">
          {navItems.map(item => (
            <li key={item.path} className="nav-item mb-2">
              <Link
                to={item.path}
                className={`nav-link text-white ${location.pathname === item.path ? 'active bg-primary rounded' : ''}`}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <Link to="/login" className="btn btn-outline-light w-100">Login</Link>
      </div>
    </div>
  );
};

export default Sidebar;
