import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./Dashboard/AdminPanel/Compo/Auth/AdminLogin";
import AdminRegister from "./Dashboard/AdminPanel/Compo/Auth/AdminRegister";
import AdminHome from "./Dashboard/AdminPanel/Layout/AdminHome/AdminHome";
import UserRegister from "./Dashboard/ClientPanel/Auth/ClientRegister";
import EmployeeRegister from "./Dashboard/AdminPanel/Employee/Auth/EmployeeRegister";
import UploadDocs from "./Dashboard/ClientPanel/Components/UploadDocs/UploadDoc";
import AddPersonalInfo from "./Dashboard/ClientPanel/Components/AddPersonalInfo/AddPersonalInfo";
import AddBankInfos from "./Dashboard/ClientPanel/Components/AddBankInfo/AddBankInfo";
import AddExtrainfo from "./Dashboard/ClientPanel/Components/AddExtraInfo/AddExtraInfo";
import ViewBankInfo from "./Dashboard/ClientPanel/Components/ViewBankInfo/ViewBankInfo";
import ViewDocs from "./Dashboard/ClientPanel/Components/ViewDocs/ViewDocs";
import ViewPersonalInfo from "./Dashboard/ClientPanel/Components/ViewPersonalInfo/ViewPersonalInfo";
import ViewExtraInfo from "./Dashboard/ClientPanel/Components/ViewExtraInfo/ViewExtraInfo";
import ClientDashboard from "./Dashboard/ClientPanel/Components/Dashboard/ClientDashboard";
import UserList from "./Dashboard/EmployeePanel/Components/UserList/UserList";
import UserBankInfo from "./Dashboard/EmployeePanel/Components/UserData/UserBankInfo";
import UserDocInfo from "./Dashboard/EmployeePanel/Components/UserData/UserDocInfo";
import UserPersonalInfo from "./Dashboard/EmployeePanel/Components/UserData/UserPersonalInfo";
import UserExtraInfo from "./Dashboard/EmployeePanel/Components/UserData/UserExtraInfo";
import ViewEmployee from "./Dashboard/AdminPanel/Components/ViewEmployee";
import AddEmployee from "./Dashboard/AdminPanel/Components/AddEmployee";
import ViewEmployeeUser from "./Dashboard/AdminPanel/Components/ViewEmployeeUser";





function App() {
  return (
    <BrowserRouter>

         
        <Routes>

          <Route path="/admin-register" element={<AdminRegister/>} />
          <Route path="/user-register" element={<UserRegister/>} />
          <Route path="/employee-register" element={<EmployeeRegister/>} />

          <Route path="/login" element={<AdminLogin/>} />
        
         

          <Route path="/user-doc-info/:id" element={<UserDocInfo/>} />
          <Route path="/user-bank-info/:id" element={<UserBankInfo/>} />
          <Route path="/user-personal-info/:id" element={<UserPersonalInfo/>} />
          <Route path="/user-extra-info/:id" element={<UserExtraInfo/>} />

          <Route path="employee" element={<AdminHome />}>
            <Route index element={<ClientDashboard />} />  {/* default dashboard */}
            <Route path="user-list" element={<UserList/>} />

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

          
          <Route path="admin" element={<AdminHome />}>
            <Route index element={<ClientDashboard />} />
            <Route path="view-employee" element={<ViewEmployee />} />
            <Route path="add-employee" element={<AddEmployee />} />  
            <Route path="user-list" element={<UserList/>} />

          </Route>



 <Route path="test" element={<ViewEmployeeUser/>} />

            



            


      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
