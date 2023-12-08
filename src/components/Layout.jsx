import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>
        <Link to="/">Users</Link>
      </header>
      <Outlet />
      <footer>Hello world</footer>
    </div>
  );
}

export default Layout;
