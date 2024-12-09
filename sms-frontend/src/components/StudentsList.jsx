import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listStudents, deleteStudent } from "../services/StudentsService";
import "animate.css";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllStudents();
  }, []);

  function getAllStudents() {
    listStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createNewStudent() {
    navigator("/add-student");
  }

  function updateStudent(id) {
    navigator(`/edit-student/${id}`);
  }

  function checkDetails(id) {
    navigator(`/students/${id}`);
  }

  function removeStudent(id) {
    deleteStudent(id)
      .then((response) => {
        //console.log(response.data);
        getAllStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className='container animate__animated animate__fadeIn'>
      <h2 className='text-center mb-3 mt-5 display-4 font-weight-bold'>
        Students
      </h2>
      <div className='row mb-3'>
        <div className='col text-end'>
          <button className='create-btn' onClick={createNewStudent}>
            Register Student
          </button>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table '>
          <thead>
            <tr>
              <th scope='col' className='text-center'>
                ID Number
              </th>
              <th scope='col' className='text-center'>
                Name
              </th>
              <th scope='col' className='text-center'>
                Grade
              </th>

              <th scope='col' className='text-center'></th>
            </tr>
          </thead>
          <tbody>
            {students.map((elem) => {
              return (
                <tr key={elem.id}>
                  <td scope='row' className='text-center'>
                    {elem.id}
                  </td>
                  <td className='text-center'>
                    {elem.firstName} {elem.lastName}
                  </td>
                  <td className='text-center'>{elem.grade} º</td>
                  <td className='text-center'>
                    <button
                      className='btn btn-link btn-sm'
                      onClick={() => checkDetails(elem.id)}
                    >
                      <i className='bi bi-eye eye-icon'></i>
                    </button>

                    <button
                      className='btn btn-link btn-sm'
                      onClick={() => updateStudent(elem.id)}
                    >
                      <i className='bi bi-pencil-square pencil-icon'></i>
                    </button>
                    <button
                      className='btn btn-link btn-sm'
                      onClick={() => removeStudent(elem.id)}
                    >
                      <i className='bi bi-trash trash-icon'></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
