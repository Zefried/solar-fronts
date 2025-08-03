import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./Dashboard/AdminPanel/Compo/Auth/AdminLogin";
import AdminRegister from "./Dashboard/AdminPanel/Compo/Auth/AdminRegister";
import AdminHome from "./Dashboard/AdminPanel/Layout/AdminHome/AdminHome";
import DashB from "./Dashboard/AdminPanel/Compo/DashB/DashB";





function App() {
  return (
    <BrowserRouter>

         
        <Routes>

          <Route path="/login" element={<AdminLogin/>} />
          <Route path="/register" element={<AdminRegister/>} />
        
        
          <Route path="/admin" element={<AdminHome />}>
            <Route path="dashboard" element={<DashB/>} />
          
            

          </Route>



     

  


            


      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
