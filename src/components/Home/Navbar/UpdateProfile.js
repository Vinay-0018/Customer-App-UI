import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from '../../common/StylingConstants';
import { AuthApi, UnAuthApi } from '../../common/Apis';

function UpdateProfile() {
    const navigate = useNavigate()
    const [employeeForm,setEmployeeForm] = useState({})
    const [customerForm,setCustomerForm] = useState({})
    const id = localStorage.getItem('username');
    const role = localStorage.getItem('role')
    useEffect(()=>{
        if(role == 'EMPLOYEE'){
            getEmployee()
        }
        if(role == 'CUSTOMER'){
            getCustomer()
        }
    },[])
    const handleEmployeeFormChange = (e) => {
    setEmployeeForm({
      ...employeeForm,
      [e.target.name]: e.target.value
    });
  };
  const handleCustomerFormChange = (e) => {
    setCustomerForm({
      ...customerForm,
      [e.target.name]: e.target.value
    });
  };
  const getEmployee = () =>{
    AuthApi.get("/employee/"+id).then((response)=>{
        if(response.status==200){
            setEmployeeForm(response.data)
        }
        else{
            toast(response.data)
        }
    }).catch((error)=>{
        console.log(error);
    })
  }
  const getCustomer = () =>{
    AuthApi.get("/customer/"+id).then((response)=>{
        if(response.status==200){
            setCustomerForm(response.data)
        }
        else{
            toast(response.data)
        }
    }).catch((error)=>{
        console.log(error);
    })
  }
  const handleEmployeeSubmit = (e)=>{
    e.preventDefault();
    for (const key in employeeForm) {
        if (employeeForm.hasOwnProperty(key) && !employeeForm[key]) {
            toast(key.toUpperCase() +" field required")
            return
        }
    }
    if (!employeeForm["email"].includes("@") || !employeeForm["email"].includes(".com")) {
      toast("Enter a valid email");
      return
  }
  if (employeeForm["contactDetails"].length != 10) {
    toast("Enter a valid Contact");
    return
}
    AuthApi.put("/employee",employeeForm).then((response) => {
        if(response.status === 200){
            toast('Employee Updated successfully')
            navigate("/dashboard");
      } else {
        toast(response.data)
      }
    })
    .catch((error)=>{
          console.error('Error:', error);
          toast('An error occurred while logging in. Please try again later.');
      });
  }
  const handleCustomerSubmit = (e)=>{
    e.preventDefault();
    for (const key in customerForm) {
        if (customerForm.hasOwnProperty(key) && !customerForm[key]) {
            toast(key.toUpperCase() +" field required")
            return
        }
    }
    if (customerForm["contactDetails"].length != 10) {
      toast("Enter a valid Contact");
      return
  }
    if (!customerForm["email"].includes("@") || !customerForm["email"].includes(".com")) {
      toast("Enter a valid email");
      return
  }
    AuthApi.put("/customer",customerForm).then((response) => {
        if(response.status === 200){
            toast('Customer Updated successfully')
            navigate("/dashboard");
      } else {
        toast(response.data)
      }
    })
    .catch((error)=>{
          console.error('Error:', error);
          toast('An error occurred while logging in. Please try again later.');
      });
  }
  if(role == "EMPLOYEE"){
  return (
    <div className="w-screen h-screen bg-gradient-to-t from-maroon from-10% via-maroon-0 via-400% to-maroon-0  to-90% flex justify-center mt-20">
        <form className="w-3/4 sm:w-2/6 " onSubmit={(e)=>{handleEmployeeSubmit(e)}}>
            <label className="block font-bold text-l mb-1">Employee ID</label>
            <p className="p-1 w-full mb-4">{employeeForm.employeeId}</p>
            <label className="block font-bold text-l mb-1">Name</label>
            <p className="p-1 w-full mb-4">{employeeForm.name}</p>
            <label className="block font-bold text-l mb-1">Level</label>
            <p className="p-1 w-full mb-4">{employeeForm.level}</p>
            <label className="block font-bold text-l mb-1">Email</label>
            <input
              type="email" className="border-0  border-b p-1 w-full"
              name='email'
              value={employeeForm.email}
              onChange={(e) => handleEmployeeFormChange(e)}
            />
            <label className="block font-bold text-l mb-1">Contact Details</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='contactDetails'
              value={employeeForm.contactDetails}
              onChange={(e) => handleEmployeeFormChange(e)}
            />
            <label className="block font-bold text-l mb-1">Branch Location</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='branchLocation'
              value={employeeForm.branchLocation}
              onChange={(e) => handleEmployeeFormChange(e)}
            />
            <button type='submit' onClick={(e)=>{handleEmployeeSubmit(e)}} className=" mt-5 items-center rounded-lg bg-maroon b-700 px-10 py-2 text-center text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
              Update</button>
          </form>
        </div>
  )} else {
    return(
    <div className="w-screen h-screen bg-gradient-to-t from-maroon from-10% via-white via-400% to-white to-90% flex justify-center mt-20">
        <form className="w-3/4 sm:w-2/6 " onSubmit={(e)=>{handleCustomerSubmit(e)}}>
            <label className="block font-bold text-l mb-1">Account ID</label>
            <p className="p-1 w-full mb-4">{customerForm.accountId}</p>
            <label className="block font-bold text-l mb-1">Name</label>
            <p className="p-1 w-full mb-4">{customerForm.name}</p>
            <label className="block font-bold text-l mb-1">Email</label>
            <input
              type="email" className="border-0  border-b p-1 w-full"
              name='email'
              required
              value={customerForm.email}
              onChange={(e) => handleCustomerFormChange(e)}
            />
            <label className="block font-bold text-l mb-1">Contact Details</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='contactDetails'
              required
              value={customerForm.contactDetails}
              onChange={(e) => handleCustomerFormChange(e)}
            />
            <label className="block font-bold text-l mb-1">Address</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='address'
              required
              value={customerForm.address}
              onChange={(e) => handleCustomerFormChange(e)}
            />
            <button type='submit' onClick={(e)=>{handleCustomerSubmit(e)}} className=" mt-5 items-center rounded-lg bg-maroon b-700 px-10 py-2 text-center text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
              Update</button>
          </form>
        </div>
    )
  }
}

export default UpdateProfile