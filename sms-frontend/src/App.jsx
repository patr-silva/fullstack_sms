import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import StudentsList from "./components/StudentsList";
import StudentDetails from "./components/StudentDetails";
import StudentForm from "./components/StudentForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/students' element={<StudentsList />} />
            <Route path='/students/:id' element={<StudentDetails />} />
            <Route path='/add-student' element={<StudentForm />} />
            <Route path='/edit-student/:id' element={<StudentForm />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
