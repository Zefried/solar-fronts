import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
import EmployeeDashboard from "./Dashboard/EmployeePanel/Components/EmployeeDashboard/EmployeeDashboard";
import { AuthAction } from "./CustomStateManage/OrgUnits/AuthState";
import AdminDashboard from "./Dashboard/AdminPanel/Components/AdminDashboard/AdminDashboard";
import HomePage from "./Website/Home";
import ProtectedRoute from "./Dashboard/Reusable/ProtectedRoutes/UserProtectedRoute";

function App() {
  const { role } = AuthAction.getState("solar");
  
  const redirectMap = {
        admin: "/admin",
        employee: "/employee",
        user: "/user",
  };
 
  return (
    <BrowserRouter>
      <Routes>

     
        {/* ROOT → MAIN WEBSITE */}
        <Route path="/" element={<HomePage />} />
     
        {/* ROLE REDIRECT */}
        <Route
          path="/redirect"
          element={<Navigate to={redirectMap[role] || "/login"} replace />}
        />


        {/* AUTH ROUTES */}
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/employee-register" element={<EmployeeRegister />} />
        <Route path="/login" element={<AdminLogin />} />

        {/* CLIENT PANEL (YOU WANTED THIS BLOCK) */}

        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/user" element={<AdminHome />}>
            <Route index element={<ClientDashboard />} />
            <Route path="upload-documents" element={<UploadDocs />} />
            <Route path="add-personal-info" element={<AddPersonalInfo />} />
            <Route path="add-bank-info" element={<AddBankInfos />} />
            <Route path="add-extra-info" element={<AddExtrainfo />} />
            <Route path="view-bank-info" element={<ViewBankInfo />} />
            <Route path="view-docs" element={<ViewDocs />} />
            <Route path="view-personal-info" element={<ViewPersonalInfo />} />
            <Route path="view-extra-info" element={<ViewExtraInfo />} />
          </Route>
        </Route>


        {/* ADMIN PANEL */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminHome />}>
            <Route index element={<AdminDashboard />} />
            <Route path="view-employee" element={<ViewEmployee />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="employee-users" element={<ViewEmployeeUser />} />
          </Route>
        </Route>


        {/* EMPLOYEE PANEL */}
        <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
          <Route path="/employee" element={<AdminHome />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="user-doc-info/:id" element={<UserDocInfo />} />
            <Route path="user-bank-info/:id" element={<UserBankInfo />} />
            <Route path="user-personal-info/:id" element={<UserPersonalInfo />} />
            <Route path="user-extra-info/:id" element={<UserExtraInfo />} />
          </Route>
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
