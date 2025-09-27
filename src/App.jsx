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
import UploadDocs from "./Dashboard/ClientPanel/Components/UploadDocs/UploadDoc";
import AddPersonalInfo from "./Dashboard/ClientPanel/Components/AddPersonalInfo/AddPersonalInfo";
import AddBankInfo from "./Dashboard/ClientPanel/Components/AddBankInfo/AddBankInfo";
import AddBankInfos from "./Dashboard/ClientPanel/Components/AddBankInfo/AddBankInfo";
import AddExtrainfo from "./Dashboard/ClientPanel/Components/AddExtraInfo/AddExtraInfo";
import ViewBankInfo from "./Dashboard/ClientPanel/Components/ViewBankInfo/ViewBankInfo";
import ViewDocs from "./Dashboard/ClientPanel/Components/ViewDocs/ViewDocs";
import ViewPersonalInfo from "./Dashboard/ClientPanel/Components/ViewPersonalInfo/ViewPersonalInfo";
import ViewExtraInfo from "./Dashboard/ClientPanel/Components/ViewExtraInfo/ViewExtraInfo";





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

            <Route path="upload-documents" element={<UploadDocs/>} />
            <Route path="add-personal-info" element={<AddPersonalInfo/>} />
            <Route path="add-bank-info" element={<AddBankInfos/>} />
            <Route path="add-extra-info" element={<AddExtrainfo/>} />

            <Route path="view-bank-info" element={<ViewBankInfo/>} />
            <Route path="view-docs" element={<ViewDocs/>} />
            <Route path="view-personal-info" element={<ViewPersonalInfo/>} />
            <Route path="view-extra-info" element={<ViewExtraInfo/>} />

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
