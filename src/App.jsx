import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./Dashboard/AdminPanel/Compo/Auth/AdminLogin";
import AdminRegister from "./Dashboard/AdminPanel/Compo/Auth/AdminRegister";
import AdminHome from "./Dashboard/AdminPanel/Layout/AdminHome/AdminHome";
import DashB from "./Dashboard/AdminPanel/Compo/DashB/DashB";
import Clients from "./Dashboard/AdminPanel/Compo/Clients/Clients";
import Employee from "./Dashboard/AdminPanel/Employee/Employee";
import AddEmployee from "./Dashboard/AdminPanel/Employee/Crud/AddEmployee";
import ClientDashB from "./Dashboard/ClientPanel/Compo/ClientDashB";
import AddBasicInfo from "./Dashboard/ClientPanel/Compo/AddBasicInfo/AddBasicInfo";
import FinancialInfo from "./Dashboard/ClientPanel/Compo/BankInfo/BankInfo";
import AddDocuments from "./Dashboard/ClientPanel/Compo/Documents/AddDocuments";
import DocumentUploadForm from "./Dashboard/ClientPanel/Test/Document";
import UserRegister from "./Dashboard/ClientPanel/Auth/ClientRegister";
import EmployeeRegister from "./Dashboard/AdminPanel/Employee/Auth/EmployeeRegister";
import PersonalInfo from "./Dashboard/ClientPanel/Test/PersonalInfo";
import BankInfo from "./Dashboard/ClientPanel/Test/BankInfo";
import Extrainfo from "./Dashboard/ClientPanel/Test/ExtraInfo";





function App() {
  return (
    <BrowserRouter>

         
        <Routes>

          <Route path="/admin-register" element={<AdminRegister/>} />
          <Route path="/user-register" element={<UserRegister/>} />
          <Route path="/employee-register" element={<EmployeeRegister/>} />

          <Route path="/login" element={<AdminLogin/>} />
        
          <Route path="/admin" element={<AdminHome />}>
            <Route path="dashboard" element={<DashB/>} />
            <Route path="clients" element={<Clients/>} />
            <Route path="employee" element={<Employee/>} />
            <Route path="add-employee" element={<AddEmployee/>} />
        
          </Route>


 
          <Route path="/client" element={<AdminHome />}>
            <Route path="dashboard" element={<ClientDashB/>} />
            <Route path="add-basics" element={<AddBasicInfo/>} />
            <Route path="add-bank-info" element={<FinancialInfo/>} />
            <Route path="add-documents" element={<AddDocuments/>} />
          
            

          </Route>

            <Route path="doc" element={<DocumentUploadForm/>} /> 
            <Route path="personal-info" element={<PersonalInfo/>} />
            <Route path="bank-info" element={<BankInfo/>} />
            <Route path="extra-info" element={<Extrainfo/>} />




            


      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
