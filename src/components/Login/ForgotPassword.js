import React, { useState } from 'react'
import { UnAuthApi } from '../common/Apis';
import { toast } from '../common/StylingConstants';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';
function ForgotPassword() {
    const [emailSent,setEmailSent] = useState(false);
    const [userForm,setUserForm] = useState({
        username:"",
        password:""
    })
    const [password,setPassword] = useState("")
    const [otpc,setOtpc] = useState(false)
    const [otpv,setOtpv] = useState("")
    const [otp,setOtp] = useState("")
    var otp_clone = null
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    function hideEmail(email) {
        const parts = email.split('@');
        if (parts.length !== 2 || parts[1] !== 'gmail.com') {
          return email;
        }
        
        const username = parts[0];
        const halfLength = Math.ceil(username.length / 2);
        const visiblePart = username.substr(0, halfLength);
        const hiddenPart = '*'.repeat(username.length - halfLength);
        
        return visiblePart + hiddenPart + '@' + parts[1];
      }
      function generateRandomDigits() {
        const min = 100000; 
        const max = 999999; 
        const randomDigits = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomDigits.toString();
      }
    const handleUsernameSubmit = (e) =>{
        e.preventDefault();
        setLoading(true)
        UnAuthApi.get("/register/"+userForm.username).then((response) => {
            if(response.status === 200){
              otp_clone = generateRandomDigits()
              setOtp(otp_clone)
                UnAuthApi.post("/email",{
                    recipient:response.data,
                    subject:"OTP - Forgot Password Axis Bank",
                    msgBody:"Your OTP for password reset is: "+otp_clone+".\nPlease use this code to reset your password. This OTP is valid for a limited time." 
                }).then(response1=>{
                    toast('OTP sent to '+ hideEmail(response.data))
                    setEmailSent(true)
                    setLoading(false)
                }).catch((error)=>{
                    console.error('Error:', error);
                    toast('An error occurred while logging in. Please try again later.');
                    setLoading(false)

                });
                toast('OTP sent to '+ hideEmail(response.data))
          } else {
            toast("ID not found")
            setLoading(false)

          }
        })
        .catch((error)=>{
              console.error('Error:', error);
              toast('An error occurred while logging in. Please try again later.');
              setLoading(false)

          });
    }
    const verifyOtp = (e) =>{
        e.preventDefault();
        console.log(otp,otpv,otp==otpv)
        if(otp==otpv){
            setOtpc(true);
        }
        return
    }
    const handlePasswordSubmit = (e) =>{
        e.preventDefault();
        if(password !== userForm.password){
            toast("Password Does Not Match")
            return
        }
        UnAuthApi.put("/register/forgot",userForm).then((response) => {
            if(response.status === 200){
                toast('Password Changed successfully')
                navigate('/login');
          } else {
            toast(response.data)
          }
        })
        .catch((error)=>{
              console.error('Error:', error);
              toast('An error occurred while logging in. Please try again later.');
          });
    }
    const handleUserFormChange = (e) => {
        setUserForm({
          ...userForm,
          [e.target.name]: e.target.value
        });
      };
  return (
    <div className=" h-3/4 w-3/4 sm:w-2/6 ">
        {loading && <Loading />}
        {!otpc && <form onSubmit={(e)=>{handleUsernameSubmit(e)}}>
            <label className="block font-bold text-lg text-center mb-5">Forgot Password</label>
            <label className="block font-normal mt2-1">Username</label>
            <input
            type="text" className="border-0  border-b p-1 w-full mb-4"
            name='username'
            value={userForm.username}
            onChange={(e) => handleUserFormChange(e)}
            />
            <button type='submit' onClick={(e)=>{handleUsernameSubmit(e)}} className=" mt-1 items-center rounded-lg bg-maroon b-700 px-10 py-2 text-center text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
            Get OTP</button>
            {emailSent &&  <div>
                <input className="border-0 border-b mt-5 p-1 w-full"
            value={otpv}
            placeholder='OTP'
            onChange={(e) => setOtpv(e.target.value)}
            />
            <button type='submit' onClick={(e)=>{verifyOtp(e)}} className=" mt-10 items-center rounded-lg bg-maroon b-700 px-10 py-2 text-center text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
            Verify</button></div>}
        </form>}
        {otpc && <form onSubmit={(e)=>{handlePasswordSubmit(e)}}>
            <input
            type="password" className="border-0  mt-5 border-b p-1 w-full"
            name='password'
            value={userForm.password}
            placeholder="Password"
            onChange={(e) => {handleUserFormChange(e)}}
            />
            <input
            type="password" className="border-0 border-b mt-5 p-1 w-full"
            name='password'
            value={password}
            placeholder='Confirm Password'
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit' onClick={(e)=>{handlePasswordSubmit(e)}} className=" mt-10 items-center rounded-lg bg-maroon b-700 px-10 py-2 text-center text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
            Change Password</button>
        </form>}
    </div>
  )
}

export default ForgotPassword