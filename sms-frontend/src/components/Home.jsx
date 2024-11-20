import { useNavigate } from "react-router-dom";
import CircleButton from "./CircleButton";

const Home = () => {
  const navigator = useNavigate();
  /*
  function addNewStudent() {
    navigator("/add-student");
  }
*/

  function checkStudentsList() {
    navigator("/students");
  }

  const buttonData = [
    { type: "Students", onClick: checkStudentsList, color: "#FF5758" },
    {
      type: "Schedule",
      onClick: () => alert("Button 2 clicked!"),
      color: "#bfa5a3",
    },
    {
      type: "Grades",
      onClick: () => alert("Button 3 clicked!"),
      color: "#1e648e",
    },
  ];

  return (
    <div className='container h-100'>
      <div className='row h-100 align-items-center'>
        <div className='col-12 text-center'>
          <h1 className='mt-5 home-title'>Committed to the Future</h1>
          <div className='container'>
            <div className='d-flex justify-content-center align-items-center flex-wrap gap-5 mt-5'>
              {buttonData.map((elem, index) => {
                return (
                  <CircleButton
                    type={elem.type}
                    onClick={elem.onClick}
                    color={elem.color}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
