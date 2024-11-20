import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";


const Layout = ({ children }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <>
      <Header />
      <section style={{ paddingTop: navbarHeight }}>{children}</section>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
