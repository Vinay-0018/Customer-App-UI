import React,{useState} from 'react'
import { UnAuthApi } from '../common/Apis';
import { useNavigate } from 'react-router-dom';
import { toast } from '../common/StylingConstants';
function CustomerRegister() {
    const navigate = useNavigate();
    const [passwordCopy,setPasswordCopy] = useState("")
    const [customerForm,setCustomerForm] = useState({
        accountId:"",
        name:"",
        email:"",
        contactDetails:"",
        address:"",
        password:""
    })
    const handleCustomerFormChange = (e) => {
        setCustomerForm({
          ...customerForm,
          [e.target.name]: e.target.value
        });
      };

      const handleCustomerSubmit = (e)=>{
        e.preventDefault();
        if(passwordCopy !== customerForm.password){
            toast("Password Does Not Match")
            return
        }
        for (const key in customerForm) {
            if (customerForm.hasOwnProperty(key) && !customerForm[key]) {
                toast(key.toUpperCase() +" field required")
                return
            }
        }
        if (!customerForm["email"].includes("@") || !customerForm["email"].includes(".com")) {
          toast("Enter a valid email");
          return
      }
      if (customerForm["contactDetails"].length != 10) {
        toast("Enter a valid Contact");
        return
    }
        UnAuthApi.post("/register/customer",customerForm).then((response) => {
            if(response.status === 200){
                toast('Customer created successfully')
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
        <form className="w-3/4 items-center sm:w-2/6 " onSubmit={(e)=>{handleCustomerSubmit(e)}}>
            <label className="block font-bold text-xl text-maroon text-center mb-5">Welcome to Customer Registration Page</label>
            <p className=" mt-3 font-bold">Are You an Employee? <a className="font-medium text-maroon" href="/register/employee">Register Here</a></p>
            <label className="block font-bold text-l text-maroon mb-1">Account ID</label>
            <input
              type="text" className="border-0  border-b p-1 w-full mb-4"
              name='accountId'
              required
              value={customerForm.accountId}
              onChange={(e) => handleCustomerFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Name</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='name'
              required
              value={customerForm.name}
              onChange={(e) => handleCustomerFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Email</label>
            <input
              type="email" className="border-0  border-b p-1 w-full"
              name='email'
              required
              value={customerForm.email}
              onChange={(e) => handleCustomerFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Contact Details</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='contactDetails'
              required
              value={customerForm.contactDetails}
              onChange={(e) => handleCustomerFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Address</label>
            <input
              type="text" className="border-0  border-b p-1 w-full"
              name='address'
              required
              value={customerForm.address}
              onChange={(e) => handleCustomerFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Password</label>
            <input
              type="password" className="border-0  border-b p-1 w-full"
              name='password'
              required
              value={customerForm.password}
              onChange={(e) => handleCustomerFormChange(e)}
            />
            <label className="block font-bold text-l text-maroon mb-1">Confirm Password</label>
            <input
              type="password" className="border-0  border-b p-1 w-full"
              value={passwordCopy}
              required
              onChange={(e) => setPasswordCopy(e.target.value)}
            />
            <button type='submit' onClick={(e)=>{handleCustomerSubmit(e)}} className=" mt-5 items-center rounded-lg bg-maroon b-700 px-10 py-2 text-center text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
              Register</button>
          </form>
    )
}

export default CustomerRegister