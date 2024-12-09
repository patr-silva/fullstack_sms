import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById, deleteStudent } from "../services/StudentsService";
import student_avatar from "../assets/student_avatar.png";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "animate.css";
import { getLessonByStudentId } from "../services/LessonsService";

const StudentDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [grade, setGrade] = useState(0);
  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState(0);
  const [lessons, setLessons] = useState([]);

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    getStudentById(id)
      .then((response) => {
        const {
          firstName,
          lastName,
          age,
          grade,
          guardianName,
          guardianContact,
        } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setAge(age);
        setGrade(grade);
        setGuardianName(guardianName);
        setGuardianContact(guardianContact);
      })
      .catch((error) => {
        console.error(error);
      });

    getLessonByStudentId(id)
      .then((response) => {
      // console.log(response.data);
        setLessons(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  function updateStudent(id) {
    navigator(`/edit-student/${id}`);
  }

  function removeStudent(id) {
    deleteStudent(id)
      .then((response) => {
       // console.log(response.data);
        navigator("/students");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function scheduleLesson() {
    navigator("/add-lesson");
  }

  function formatLesson(lesson) {
    const [datePart, timePart] = lesson.startTime.split("T");

    const [year, month, day] = datePart.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    const [hour, minute] = timePart.split(":");
    const formattedTime = `${hour}:${minute}`;

    return (
      <tr key={lesson.id}>
        <td className='text-center'>{formattedDate}</td>
        <td className='text-center'>{formattedTime}</td>
        <td className='text-center'>{lesson.title}</td>
      </tr>
    );
  }

  return (
    <div className='container-fluid animate__animated animate__fadeIn'>
      <div className='row'>
        <aside className='col-md-3 mt-2 p-4 d-none d-md-block'>
          <div className='nav flex-column'>
            <button className='menu-btn mb-2' onClick={() => updateStudent(id)}>
              Modify Student Details
            </button>
            <button className='menu-btn mb-2' onClick={() => scheduleLesson()}>
              Schedule Lesson
            </button>
            <button
              className='menu-btn mb-2'
              onClick={() => alert("Coming soon...")}
            >
              Modify Student Grades
            </button>
            <button className='menu-btn mb-2' onClick={() => removeStudent(id)}>
              Remove Student
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
            <button className='menu-btn mb-2' onClick={() => updateStudent(id)}>
              Modify Student Details
            </button>
            <button className='menu-btn mb-2' onClick={() => scheduleLesson()}>
              Schedule Lesson
            </button>
            <button
              className='menu-btn mb-2'
              onClick={() => alert("Coming soon...")}
            >
              Student Grades
            </button>
            <button className='menu-btn mb-2' onClick={() => removeStudent(id)}>
              Remove Student
            </button>
          </div>
        </div>

        <main className='col-md-9 p-4'>
          <div className='card profile mb-4'>
            <div className='card-body d-flex flex-column flex-md-row align-items-center text-center justify-content-evenly'>
              <div className='me-md-5 mb-4 mb-md-0'>
                <img
                  className='rounded-circle mb-3 mb-md-0'
                  width='180'
                  src={student_avatar}
                  alt='Student Avatar'
                />
                <h4>
                  {firstName} {lastName}
                </h4>
              </div>
              <div>
                <p className='fs-5'>
                  <span className='fw-bold'>Age</span> <br />
                  {age} years old
                </p>
                <p className='fs-5'>
                  <span className='fw-bold'>Grade </span> <br /> {grade} º
                </p>
              </div>
              <div>
                <p className='fs-5'>
                  <span className='fw-bold'>Parent/Guardian </span> <br />
                  {guardianName}
                </p>
                <p className='fs-5'>
                  <span className='fw-bold'>Contact Information </span> <br />
                  {guardianContact}
                </p>
              </div>
            </div>
          </div>

          <div className='row g-3'>
            <div className='col-md-6'>
              <div className='card profile-table'>
                <h4 className='card-header text-center'>Lessons</h4>
                <div className='card-body'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th className='text-center'>Date</th>
                        <th className='text-center'>Time</th>
                        <th className='text-center'>Subject</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lessons.map((elem) => {
                        return formatLesson(elem);
                      })}
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

export default StudentDetails;
