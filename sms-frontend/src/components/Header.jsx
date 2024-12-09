import { Link } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import logo from "../assets/logo.png";
import "animate.css";

const Header = () => {
  return (
    <nav className='navbar animate__animated animate__fadeIn'>
      <div className='container-fluid '>
        <Link className='navbar-brand' to='/'>
          <img src={logo} alt='logo and slogan' />
        </Link>
        <div className='ms-auto'>
          <Link to='/'>
            <button
              className='btn btn-primary rounded-circle d-flex align-items-center justify-content-center circle-home-btn'
              type='button'
            >
              <HomeIcon />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
