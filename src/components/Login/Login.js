import React from 'react'
import { useLocation} from 'react-router-dom';
import Slideshow from './Slideshow';
import CustomerRegister from './CustomerRegister';
import EmployeeRegister from './EmployeeRegister';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import appUseImg from "../../assets/appuseimg.png"
function Login() {
  const location = useLocation();
  const navigate = useNavigate();
    return (
      <div className=" bg-gradient-to-b from-background from-10% to-20% to-white">
        <div className="bg-maroon py-2 flex justify-between">
          <a href='/'><img
              alt="Axis Bank"
              className="mx-5 my-2 h-6 sm:h-9 bg-mar"
              // src="https://brandpalettes.com/wp-content/uploads/2021/12/Axis-Bank-Logo-768x209.png"
              src="https://www.axisbank.com/assets/images/logo-white.png"
            /></a>
            <div>
              {location.pathname.includes("customer") &&
              <button onClick={(e) => {navigate("/register/employee")}} className="rounded-lg bg-white m-2 px-4 py-1 mr-10 text-center font-medium text-maroon hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                         Employee Register</button>}
              {location.pathname.includes("employee") && <button onClick={(e) => {navigate("/register/customer")}} className="rounded-lg bg-white m-2 px-4 py-1 mr-10 text-center font-medium text-maroon hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                         Customer Register</button>}
              {location.pathname!="/login" && <button onClick={(e) => {navigate("/login")}} className="rounded-lg bg-white m-2 px-4 py-1 mr-10 text-center font-medium text-maroon hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                          Login</button>}
              {location.pathname=="/login" && <button onClick={(e) => {navigate("/register/customer")}} className="rounded-lg bg-white m-2 px-4 py-1 mr-10 text-center font-medium text-maroon hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Register</button>}
            </div>
        </div>
        <div>
          <div className="sm:flex p-20 sm:justify-between" >
            <div>
            <img height="300" src='https://www.axisbank.com/images/default-source/revamp_new/progresswithus/dil-de-open-05-09-22.jpg'></img>
            </div>
            <span></span>
            {location.pathname === "/login" && <LoginPage /> }
            {location.pathname === "/forgot-password" && <ForgotPassword/>}
            {location.pathname === "/register/customer" && <CustomerRegister/>}
            {location.pathname === "/register/employee" && <EmployeeRegister/>}
          </div>
          <img className="absolute top-3/2" src={appUseImg}></img>
        </div>
      </div>
    )
  
}

export default Login