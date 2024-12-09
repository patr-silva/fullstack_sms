import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteLesson, getLessonById } from "../services/LessonsService";
import { getStudentById } from "../services/StudentsService";
import "animate.css";

const LessonDetails = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studentNumber, setStudentNumber] = useState(null);
  const [student, setStudent] = useState({});
  const [formatedDate, setFormatedDate] = useState({});

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    getLessonById(id).then((response) => {
      const { title, description, startTime, endTime, studentId } =
        response.data;
      setTitle(title);
      setDescription(description);
      setStartDate(startTime);
      setEndDate(endTime);
      setStudentNumber(studentId);
      formatDateAndTime();
    });

    if (studentNumber) {
      getStudentById(studentNumber).then((response) => {
        setStudent(response.data);
      });
    }
  }, [id, studentNumber, student]);

  function updateLesson(id) {
    navigator(`/edit-lesson/${id}`);
  }

  function removeLesson(id) {
    deleteLesson(id)
      .then((response) => {
        // console.log(response);
        navigator("/lessons");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function checkStudentDetails(studentId) {
    navigator(`/students/${studentId}`);
  }

  function checkCalendar() {
    navigator("/lessons");
  }

  function formatDateAndTime() {
    const date = new Date(startDate);
    const end = new Date(endDate);

    const formatWithLeadingZero = (number) => String(number).padStart(2, "0");

    const startTime = `${formatWithLeadingZero(
      date.getHours()
    )}:${formatWithLeadingZero(date.getMinutes())}`;
    const endTime = `${formatWithLeadingZero(
      end.getHours()
    )}:${formatWithLeadingZero(end.getMinutes())}`;

    const format = {
      date: date.toLocaleDateString(),
      startTime,
      endTime,
    };

    setFormatedDate(format);
  }

  return (
    <div className='container-fluid animate__animated animate__fadeIn'>
      <div className='row'>
        <aside className='col-md-3 mt-2 p-4 d-none d-md-block'>
          <div className='nav flex-column'>
            <button className='menu-btn mb-2' onClick={() => updateLesson(id)}>
              Edit Lesson
            </button>
            <button
              className='menu-btn mb-2'
              onClick={() => checkStudentDetails(studentNumber)}
            >
              Student Details
            </button>
            <button className='menu-btn mb-2' onClick={() => removeLesson(id)}>
              Remove Lesson
            </button>
            <button className='menu-btn mb-2' onClick={() => checkCalendar()}>
              Calendar
            </button>
          </div>
        </aside>

        <nav className='navbar d-md-none'>
          <div className='container-fluid'>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#mobileMenu'
              aria-controls='mobileMenu'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
          </div>
        </nav>

        <div className='collapse' id='mobileMenu'>
          <div className='card card-body'>
            <button className='menu-btn mb-2' onClick={() => updateLesson(id)}>
              Edit Lesson
            </button>
            <button
              className='menu-btn mb-2'
              onClick={() => checkStudentDetails(studentNumber)}
            >
              Student Details
            </button>
            <button className='menu-btn mb-2' onClick={() => removeLesson(id)}>
              Remove Lesson
            </button>
            <button className='menu-btn mb-2' onClick={() => checkCalendar()}>
              Calendar
            </button>
          </div>
        </div>

        <main className='col-md-9 p-4'>
          <div className='card profile mb-4'>
            <div className='card-body d-flex flex-column flex-md-row align-items-center text-center justify-content-evenly'>
              <div>
                <p className='fs-6 text-break'>
                  <span className='fw-bold fs-5'>Student </span> <br />
                  {student.firstName} {student.lastName}
                </p>
                <p className='fs-6 text-break'>
                  <span className='fw-bold fs-5'>Grade </span> <br />
                  {student.grade} º
                </p>
                <p className='fs-6 text-break'>
                  <span className='fw-bold fs-5'>Subject </span> <br />
                  {title}
                </p>
              </div>
              <div
                style={{
                  maxWidth: "300px",
                  textAlign: "left",
                  wordWrap: "break-word",
                }}
              >
                <p className='fs-6 text-break'>
                  <span className='fw-bold fs-5'>Summary </span> <br />
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className='row g-3'>
            <div className='col-md-6'>
              <div className='card profile-table'>
                <div className='card-body'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th className='text-center'>Date</th>
                        <th className='text-center'>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <td className='text-center'>{formatedDate.date}</td>
                      <td className='text-center'>
                        {formatedDate.startTime} - {formatedDate.endTime}
                      </td>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='card profile-table'>
                <h4 className='card-header text-center'>Grades</h4>
                <div className='card-body'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th className='text-center'>Subject</th>
                        <th className='text-center'>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='text-center'>Potions - Basics</td>
                        <td className='text-center'>100%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonDetails;
