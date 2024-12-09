import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createStudent,
  getStudentById,
  updateStudent,
} from "../services/StudentsService";
import "animate.css";

const StudentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [grade, setGrade] = useState(0);
  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState(0);

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    grade: "",
    guardianName: "",
    guardianContact: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
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
    }
  }, [id]);

  function saveOrUpdateStudent(e) {
    e.preventDefault();

    if (validateForm()) {
      const student = {
        firstName,
        lastName,
        age,
        grade,
        guardianName,
        guardianContact,
      };

      if (id) {
        updateStudent(id, student)
          .then((response) => {
            console.log(response.data);
            navigator("/students");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createStudent(student)
          .then((response) => {
            console.log(response.data);
            navigator("/students");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    const errorMessage = { ...errors };
    let isValid = true;

    const contactPattern = /^[0-9]{9}$/;

    if (firstName.trim()) {
      errorMessage.firstName = "";
    } else {
      errorMessage.firstName = "The first name is required.";
      isValid = false;
    }

    if (lastName.trim()) {
      errorMessage.lastName = "";
    } else {
      errorMessage.lastName = "The last name is required.";
      isValid = false;
    }

    if (age >= 5 && age <= 13) {
      errorMessage.age = "";
    } else {
      errorMessage.age = "Enter a valid age.";
      isValid = false;
    }

    if (grade >= 1 && grade <= 4) {
      errorMessage.grade = "";
    } else {
      errorMessage.grade = "Enter a valid grade.";
      isValid = false;
    }

    if (guardianName.trim()) {
      errorMessage.guardianName = "";
    } else {
      errorMessage.guardianName = "The guardian's name is required.";
      isValid = false;
    }

    if (contactPattern.test(guardianContact)) {
      errorMessage.guardianContact = "";
    } else {
      errorMessage.guardianContact =
        "Guardian contact must be a 9-digit number.";
      isValid = false;
    }

    setErrors(errorMessage);

    return isValid;
  }

  return (
    <div className='container d-flex justify-content-around align-items-start min-vh-70 animate__animated animate__fadeIn'>
      <div className='col-12 col-md-8 col-lg-6'>
        <div className='card border-0 bg-transparent'>
          {id ? (
            <h2 className='text-center'>Edit Details</h2>
          ) : (
            <h2 className='text-center'>Register Student</h2>
          )}
          <div className='card-body'>
            <form className='border-0 mt-3'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>First Name</label>
                    <input
                      type='text'
                      name='firstName'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`form-control ${
                        errors.firstName ? "is-invalid" : ""
                      }`}
                    />
                    {errors.firstName && (
                      <div className='invalid-feedback'>{errors.firstName}</div>
                    )}
                  </div>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>Last Name</label>
                    <input
                      type='text'
                      name='lastName'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`form-control ${
                        errors.lastName ? "is-invalid" : ""
                      }`}
                    />
                    {errors.lastName && (
                      <div className='invalid-feedback'>{errors.lastName}</div>
                    )}
                  </div>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>Age</label>
                    <input
                      type='number'
                      name='age'
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={`form-control ${
                        errors.age ? "is-invalid" : ""
                      }`}
                    />
                    {errors.age && (
                      <div className='invalid-feedback'>{errors.age}</div>
                    )}
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>Grade</label>
                    <input
                      type='number'
                      name='grade'
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className={`form-control ${
                        errors.grade ? "is-invalid" : ""
                      }`}
                    />
                    {errors.grade && (
                      <div className='invalid-feedback'>{errors.grade}</div>
                    )}
                  </div>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>Parent/Guardian</label>
                    <input
                      type='text'
                      name='guardianName'
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className={`form-control ${
                        errors.guardianName ? "is-invalid" : ""
                      }`}
                    />
                    {errors.guardianName && (
                      <div className='invalid-feedback'>
                        {errors.guardianName}
                      </div>
                    )}
                  </div>
                  <div className='form-group mb-3'>
                    <label className='form-label fw-bold'>
                      Contact Information
                    </label>
                    <input
                      type='number'
                      name='guardianContact'
                      value={guardianContact}
                      onChange={(e) => setGuardianContact(e.target.value)}
                      className={`form-control ${
                        errors.guardianContact ? "is-invalid" : ""
                      }`}
                    />
                    {errors.guardianContact && (
                      <div className='invalid-feedback'>
                        {errors.guardianContact}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='text-center'>
                <button
                  type='submit'
                  onClick={saveOrUpdateStudent}
                  className='mt-4 create-btn'
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

export default StudentForm;
