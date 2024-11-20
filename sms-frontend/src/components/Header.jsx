import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString()); 
      };

      const timerId = setInterval(updateTime, 1000);

      return () => clearInterval(timerId);
    }, []);

  return (
    <nav className='navbar fixed-top'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} alt='A book with an apple on top' height='70' />
        </Link>
          <div className='navbar-nav ms-auto'>
            <span className='nav-item me-3 time'>{currentTime}</span>
          </div>

      </div>
    </nav>
  );
};

export default Header;
