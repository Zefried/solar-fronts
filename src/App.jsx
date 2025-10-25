import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./Dashboard/AdminPanel/Compo/Auth/AdminLogin";
import AdminRegister from "./Dashboard/AdminPanel/Compo/Auth/AdminRegister";
import AdminHome from "./Dashboard/AdminPanel/Layout/AdminHome/AdminHome";
import DocumentUploadForm from "./Dashboard/ClientPanel/Test/Document";
import UserRegister from "./Dashboard/ClientPanel/Auth/ClientRegister";
import EmployeeRegister from "./Dashboard/AdminPanel/Employee/Auth/EmployeeRegister";
import PersonalInfo from "./Dashboard/ClientPanel/Test/PersonalInfo";
import BankInfo from "./Dashboard/ClientPanel/Test/BankInfo";
import Extrainfo from "./Dashboard/ClientPanel/Test/ExtraInfo";
import UploadDocs from "./Dashboard/ClientPanel/Components/UploadDocs/UploadDoc";
import AddPersonalInfo from "./Dashboard/ClientPanel/Components/AddPersonalInfo/AddPersonalInfo";
import AddBankInfos from "./Dashboard/ClientPanel/Components/AddBankInfo/AddBankInfo";
import AddExtrainfo from "./Dashboard/ClientPanel/Components/AddExtraInfo/AddExtraInfo";
import ViewBankInfo from "./Dashboard/ClientPanel/Components/ViewBankInfo/ViewBankInfo";
import ViewDocs from "./Dashboard/ClientPanel/Components/ViewDocs/ViewDocs";
import ViewPersonalInfo from "./Dashboard/ClientPanel/Components/ViewPersonalInfo/ViewPersonalInfo";
import ViewExtraInfo from "./Dashboard/ClientPanel/Components/ViewExtraInfo/ViewExtraInfo";
import ClientDashboard from "./Dashboard/ClientPanel/Components/Dashboard/ClientDashboard";
import FetchUser from "./Dashboard/EmployeePanel/Components/FetchUsers/FetchUser";
import SearchEmployee from "./Dashboard/EmployeePanel/Components/FetchEmployee/FetchEmployee";





function App() {
  return (
    <BrowserRouter>

         
        <Routes>

          <Route path="/admin-register" element={<AdminRegister/>} />
          <Route path="/user-register" element={<UserRegister/>} />
          <Route path="/employee-register" element={<EmployeeRegister/>} />

          <Route path="/login" element={<AdminLogin/>} />
        
                <Route path="/test" element={<SearchEmployee/>} />
          
          
          <Route path="/employee" element={<AdminHome />}>
            
            <Route index element={<ClientDashboard />} />  {/* default dashboard */}
         
      
          </Route>


 
          <Route path="/" element={<AdminHome />}>

            <Route index element={<ClientDashboard />} />  {/* default dashboard */}

            <Route path="/client/upload-documents" element={<UploadDocs/>} />
            <Route path="/client/add-personal-info" element={<AddPersonalInfo/>} />
            <Route path="/client/add-bank-info" element={<AddBankInfos/>} />
            <Route path="/client/add-extra-info" element={<AddExtrainfo/>} />

            <Route path="/client/view-bank-info" element={<ViewBankInfo/>} />
            <Route path="/client/view-docs" element={<ViewDocs/>} />
            <Route path="/client/view-personal-info" element={<ViewPersonalInfo/>} />
            <Route path="/client/view-extra-info" element={<ViewExtraInfo/>} />

          </Route>

          

            <Route path="doc" element={<DocumentUploadForm/>} /> 
            <Route path="personal-info" element={<PersonalInfo/>} />
            <Route path="bank-info" element={<BankInfo/>} />
            <Route path="extra-info" element={<Extrainfo/>} />
            <Route path="test" element={<FetchUser/>} />



            


      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
