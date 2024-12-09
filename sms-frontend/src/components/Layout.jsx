import PropTypes from "prop-types";
import Header from "./Header";

const Layout = ({ children }) => {


  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
