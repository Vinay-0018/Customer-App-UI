import React,{ useEffect, useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import { UnAuthApi } from '../common/Apis';
import { toast } from '../common/StylingConstants';
import Loading from '../common/Loading';
function LoginPage() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [userForm,setUserForm] = useState({
    username:"",
    password:""
  })
  useEffect(()=>{
    localStorage.clear()
  },[])
   const handleUserFormChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  };
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    UnAuthApi.post("/auth/login",userForm).then((response) => {
        if(response.status === 200){
          const { token, username, role } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          localStorage.setItem('role', role);
          setLoading(false)
          navigate('/dashboard');
      } else {
        setLoading(false)
        toast('!Invalid Credantials')
      }
    })
    .catch((error)=>{
          setLoading(false)
          console.error('Error:', error);
          toast('An error occurred while logging in. Please try again later.');
      });
  }
  return (
        <form className="w-3/4 sm:w-2/6 h-screen" onSubmit={(e)=>{handleUserSubmit(e)}}>
            {loading && <Loading />}
            <label className="block font-bold text-2xl text-maroon text-center mb-5">Welcome to Login Page</label>
            <label className="block font-bold text-xl text-maroon mt3-1">Username</label>
            <input
              type="text" className="border-0  border-b p-1 w-full mb-4"
              name='username'
              value={userForm.username}
              onChange={(e) => handleUserFormChange(e)}
            />
            <label className="block font-bold text-xl text-maroon mb-1">Password</label>
            <input
              type="password" className="border-0  border-b p-1 w-full"
              name='password'
              value={userForm.password}
              onChange={(e) => handleUserFormChange(e)}
            />
            <p className=" mt-3 font-normal">Forgot Password? <a className="font-medium text-maroon" href="/forgot-password">Reset Here</a></p>
            <button type='submit' onClick={(e)=>{handleUserSubmit(e)}} className=" mt-1 items-center rounded-lg bg-maroon b-700 px-10 py-2 text-center text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
              Login</button>
            <p className=" mt-5 font-normal">First Time User? <a className="font-medium text-maroon" href="/register/customer">Register Here</a></p>
          </form>
  )
}

export default LoginPage