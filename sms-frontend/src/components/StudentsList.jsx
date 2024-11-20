import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listStudents, deleteStudent } from "../services/StudentsService";

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
        getAllStudents();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className='container'>
      <h1 className='text-center mb-3 display-4'>Students List</h1>
      <div className='row mb-3'>
        <div className='col text-end'>
          <button className='create-btn' onClick={createNewStudent}>
            Create new Student
          </button>
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table table-borderless'>
          <thead>
            <tr>
              <th scope='col' className='text-center'>
                ID
              </th>
              <th scope='col' className='text-center'>
                Name
              </th>

              <th scope='col' className='text-center'>
                Actions
              </th>
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
