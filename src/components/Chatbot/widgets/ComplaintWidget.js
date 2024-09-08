import React, { useEffect, useState } from 'react'

function ComplaintWidget() {
    const [loggedin,setLoggedIn] = useState();
    const role = localStorage.getItem('role')
    useEffect(()=>{
        setLoggedIn(localStorage.getItem('token')==null?false:true);
    },[])
    const steps = [
        'Login with your credentials i.e Customer ID and Password.',
        'Select Create New Ticket Button on Navigation Bar.',
        'Add Subject and Description for your respective Complaint.',
        'Track the progress of the Ticket using the Ticket ID sent to your mail or directly from Dashboard - View Tickets.'
    ]
  return (
    <div className="p-3 mb-2 text-sm bg-gray-100 rounded-lg">
        {!loggedin && steps.map((step,id) =>{
            return(
                <div className="bg-gray-300 p-1 my-2 rounded-lg">
                    <p className='my-2'>{String(id+1)+". "+step}</p>
                    {id == 0 && <a href="/login" className="bg-maroon rounded-lg px-3 py-1 text-white" >Login</a>}
                </div>
            )
        })}
        {loggedin && role=="CUSTOMER" && steps.slice(1).map((step,id) =>{
            return(
                <div className="bg-gray-300 p-1 my-2 rounded-lg">
                    <p className='my-2'>{String(id+1)+". "+step}</p>
                    {id == 0 && <a href="/tickets/new" className="bg-maroon rounded-lg px-3 py-1 text-white" >Create New Ticket</a>}
                </div>
            )
        })}
        {loggedin && (role=="EMPLOYEE" || role == "ADMIN") &&
                <div className="bg-gray-300 px-1 py-2 my-2 rounded-lg">
                    <p className='my-2'>View the Assigned Tickets in</p>
                    <a href="/tickets" className="bg-maroon rounded-lg px-3 py-1 text-white" >Tickets Panel</a>
                </div>
        }
    </div>
  )
}

export default ComplaintWidget