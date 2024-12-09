import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createLesson,
  getLessonById,
  updateLesson,
} from "../services/LessonsService";
import { listStudents } from "../services/StudentsService";
import "animate.css";

const LessonForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    studentId: "",
  });

  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    listStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (id) {
      getLessonById(id)
        .then((response) => {
          const { title, description, startTime, endTime, studentId } =
            response.data;

          setTitle(title);
          setDescription(description);
          setStartTime(startTime);
          setEndTime(endTime);
          setStudentId(studentId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function validateForm() {
    const errorMessage = { ...errors };
    let isValid = true;

    if (title.trim()) {
      errorMessage.title = "";
    } else {
      errorMessage.title = "The title is required.";
      isValid = false;
    }

    if (description.trim()) {
      errorMessage.description = "";
    } else {
      errorMessage.description = "The description is required.";
      isValid = false;
    }

    if (isDateValid(startTime)) {
      errorMessage.startTime = "";
    } else {
      errorMessage.startTime =
        "Lessons can only be schedule from Monday to Friday and from 08AM to 07PM.";
      isValid = false;
    }

    if (isDateValid(endTime)) {
      errorMessage.endTime = "";
    } else {
      errorMessage.endTime =
        "Lessons can only be schedule from Monday to Friday and from 08AM to 07PM.";
      isValid = false;
    }

    if (studentId > 0) {
      errorMessage.studentId = "";
    } else {
      errorMessage.studentId = "You have to pick a student";
      isValid = false;
    }

    setErrors(errorMessage);

    return isValid;
  }

  function isDateValid(newDate) {
    const date = new Date(newDate);
    const day = date.getDay();
    const hour = date.getHours();

    return day >= 1 && day <= 5 && hour >= 8 && hour <= 18;
  }

  function saveOrUpdateLesson(e) {
    e.preventDefault();

    if (validateForm()) {
      const lesson = {
        title,
        description,
        startTime,
        endTime,
        studentId,
      };

      if (id) {
        updateLesson(id, lesson)
          .then((response) => {
            console.log(response.data);
            navigator("/lessons");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createLesson(lesson)
          .then((response) => {
            console.log(response.data);
            navigator("/lessons");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  return (
    <div className='container d-flex justify-content-around align-items-start min-vh-70 animate__animated animate__fadeIn'>
      <div className='col-12 col-md-8 col-lg-6'>
        <div className='card border-0 bg-transparent'>
          {id ? (
            <h2 className='text-center'>Edit Details</h2>
          ) : (
            <h2 className='text-center'>Schedule Lesson</h2>
          )}
          <div className='card-body'>
            <form className='border-0 mt-3'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>Title</label>
                    <input
                      type='text'
                      name='title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                    />
                    {errors.title && (
                      <div className='invalid-feedback'>{errors.title}</div>
                    )}
                  </div>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>Lesson Summary</label>
                    <input
                      type='text'
                      name='description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                    />
                    {errors.description && (
                      <div className='invalid-feedback'>
                        {errors.description}
                      </div>
                    )}
                  </div>

                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>Student</label>

                    <select
                      name='studentId'
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className={`form-control ${
                        errors.studentId ? "is-invalid" : ""
                      }`}
                    >
                      <option value='' disabled defaultValue='0'>
                        Select a student
                      </option>
                      {students.map((elem) => {
                        return (
                          <option value={elem.id} key={elem.id}>
                            {elem.firstName} {elem.lastName}
                          </option>
                        );
                      })}
                    </select>
                    {errors.studentId && (
                      <div className='invalid-feedback'>{errors.studentId}</div>
                    )}
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>Start Time</label>
                    <input
                      type='datetime-local'
                      name='startTime'
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className={`form-control ${
                        errors.startTime ? "is-invalid" : ""
                      }`}
                    />
                    {errors.startTime && (
                      <div className='invalid-feedback'>{errors.startTime}</div>
                    )}
                  </div>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>End Time</label>
                    <input
                      type='datetime-local'
                      name='endTime'
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className={`form-control ${
                        errors.endTime ? "is-invalid" : ""
                      }`}
                    />
                    {errors.endTime && (
                      <div className='invalid-feedback'>{errors.endTime}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className='text-center'>
                <button
                  type='submit'
                  className='mt-4 create-btn'
                  onClick={saveOrUpdateLesson}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonForm;
