import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircleButton from "./CircleButton";
import "animate.css";

const Home = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navigator = useNavigate();

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight / 2);
    }
  }, []);

  function checkCalendar() {
    navigator("/lessons");
  }

  function checkStudentsList() {
    navigator("/students");
  }

  const buttonData = [
    { type: "Students", onClick: checkStudentsList },
    {
      type: "Schedule",
      onClick: checkCalendar,
    },
    {
      type: "Grades",
      onClick: () => alert("Coming soon..."),
    },
  ];

  return (
    <section
      style={{ paddingTop: navbarHeight }}
      className='animate__animated animate__fadeIn'
    >
      <div className='container vh-50 '>
        <div className='row justify-content-center align-items-start'>
          <div className='col-12 text-center'>
            <div className=''>
              <h1 className='text-center title'>Tutorly</h1>
              <p className='text-center fst-italic fs-4'>
                Commited to the future
              </p>
            </div>
            <div className='container container-with-navbar d-flex justify-content-center align-items-center gap-5'>
              {buttonData.map((elem, index) => (
                <CircleButton
                  type={elem.type}
                  onClick={elem.onClick}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
