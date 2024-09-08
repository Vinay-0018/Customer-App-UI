import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from '../common/StylingConstants';
import { UnAuthApi } from '../common/Apis';

function EmployeeRegister() {
    const navigate = useNavigate()
    const [passwordCopy,setPasswordCopy] = useState("")
    const [employeeForm,setEmployeeForm] = useState({
    employeeId:"",
    name:"",
    email:"",
    contactDetails:"",
    branchLocation:"",
    password:"",
    level:"L1"
  })
  const handleEmployeeFormChange = (e) => {
    setEmployeeForm({
      ...employeeForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleEmployeeSubmit = (e)=>{
    e.preventDefault();
    if(passwordCopy !== employeeForm.password){
        toast("Password Does Not Match")
        return
    }
    if (!employeeForm["email"].includes("@") || !employeeForm["email"].includes(".com")) {
      toast("Enter a valid email");
      return
  }
  if (employeeForm["contactDetails"].length != 10) {
    toast("Enter a valid Contact");
    return
}
    for (const key in employeeForm) {
        if (employeeForm.hasOwnProperty(key) && !employeeForm[key]) {
            toast(key.toUpperCase() +" field required")
            return
        }
    }
    UnAuthApi.post("/register/employee",employeeForm).then((response) => {
        if(response.status === 200){
            toast('Employee created successfully')
            navigate('/');
      } else {
        toast(response.data)
      }
    })
    .catch((error)=>{
          console.error('Error:', error);
          toast('An error occurred while logging in. Please try again later.');
      });
  }
  return (
        <form className="w-3/4 sm:w-2/6 " onSubmit={(e)=>{handleEmployeeSubmit(e)}}>
            <label className="block font-bold text-xl text-maroon text-center mb-5">Welcome to Employee Registration Page</label>
            <p className=" mt-3 font-bold">Are You a Customer? <a className="font-medium text-maroon" href="/register/customer">Register Here</a></p>
            <label className="block font-bold text-l text-maroon mb-1">Employee ID</label>
            <input
              type="text" className="border-0  border-b p-1 w-full mb-4"
              name='employeeId'
              value={employeeForm.employeeId}
              onChange={(e) => handleEmployeeFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Name</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='name'
              value={employeeForm.name}
              onChange={(e) => handleEmployeeFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Email</label>
            <input
              type="email" className="border-0  border-b p-1 w-full"
              name='email'
              value={employeeForm.email}
              onChange={(e) => handleEmployeeFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Contact Details</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='contactDetails'
              value={employeeForm.contactDetails}
              onChange={(e) => handleEmployeeFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Branch Location</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='branchLocation'
              value={employeeForm.branchLocation}
              onChange={(e) => handleEmployeeFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Level</label>
            <select
              id="level"
              name="level"
              autoComplete="level"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={employeeForm.level}
              defaultValue="L1"
              onChange={(e)=>{handleEmployeeFormChange(e)}}>
              <option>L1</option>
              <option>L2</option>
              <option>L3</option>
            </select>
            <label className="block font-bold text-l text-maroon mb-1">Password</label>
            <input
              type="password" className="border-0  border-b p-1 w-full"
              name='password'
              value={employeeForm.password}
              onChange={(e) => handleEmployeeFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Confirm Password</label>
            <input
              type="password" className="border-0  border-b p-1 w-full"
              value={passwordCopy}
              onChange={(e) => setPasswordCopy(e.target.value)}
            />
            <button type='submit' onClick={(e)=>{handleEmployeeSubmit(e)}} className=" mt-5 items-center rounded-lg bg-maroon b-700 px-10 py-2 text-center text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
              Register</button>
          </form>
  )
}

export default EmployeeRegister