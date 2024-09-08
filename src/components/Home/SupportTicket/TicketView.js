import React, { useEffect, useState } from 'react'
import { useNavigate, useParams,useLocation } from 'react-router-dom'
import { AuthApi,MlApi } from '../../common/Apis';
import { Badge ,Rating} from 'flowbite-react';
import { toast } from '../../common/StylingConstants';
import Loading from '../../common/Loading';
import ReactStars from "react-rating-stars-component";

function TicketView() {
    const {id} = useParams();
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const role = localStorage.getItem('role')
    const navigate = useNavigate()
    const [ticketData,setTicketData] = useState({status:"Open"})
    const [feedback,setFeedback] = useState({});
    const [newTicketData,setNewTicketData]=useState({
        subject:"",
        description:"",
        level:"",
        accountId:localStorage.getItem("username")
    })
    const badges = {
        "Open":"failure",
        "In Progress":"default",
        "Waiting For Customer":"warning",
        "Resolved":"purple",
        "Closed":"success"
    }
    useEffect(()=>{
        if(!location.pathname.includes("new")){
            getTicketData()
        }
    },[id])
    const getTicketData = ()=>{
        AuthApi.get("/tickets/"+id).then((response)=>{
            if(response.status===200){
                setTicketData(response.data)
                setFeedback(response.data.feedback)
            }
            else{
              navigate('/dashboard')
              console.log("Ticket Not Found")
              toast("Ticket Not Found. Please Enter Correct Ticket ID.")
            }
        }).catch((e)=>{
          navigate('/dashboard')
          console.log(e)
          toast("Ticket Not Found. Please Enter Correct Ticket ID.")
        })}
  
        const handleFeedbackSubmit = (e) => {
          e.preventDefault();
          AuthApi.put("/feedback/"+feedback.id,feedback).then((response)=>{
              if(response.status===200){
                  toast("Successully Updated Feedback")
                  getTicketData()
                  ticketData.status = "Closed"
                  handleTicketSubmit(e)
                  navigate('/tickets');
                  navigate(0);
              }
              else{
                console.log("Feedback Not Found")
                toast("Feedback Not Found. Please Enter Correct Ticket ID.")
              }
          }).catch((e)=>{
            console.log(e)
            toast("Feedback Not Found. Please Enter Correct Ticket ID.")
          })}
  

        const handleTicketChange = (e) => {
            setTicketData({
              ...ticketData,
              [e.target.name]: e.target.value
            });
    };
    const handleFeedbackChanges = (e) => {
      setFeedback({
        ...feedback,
        [e.target.name]: e.target.value
      });
};
    const handleNewTicketChange = (e) => {
        setNewTicketData({
          ...newTicketData,
          [e.target.name]: e.target.value
        });
};
const ratingChanged = (newRating) => {
  console.log(newRating)
  setFeedback({
    ...feedback,
    ["rating"]: newRating
  });
};
          const handleTicketSubmit = async (e) => {
            e.preventDefault();
            setLoading(true)
            await AuthApi.put("/tickets/"+id,ticketData).then((response) => {
              console.log(ticketData)
                if(response.status === 200){
                  setLoading(false)
                  toast("Successully Updated Ticket")
                  navigate('/tickets');
                  navigate(0);
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
          const handleNewTicketSubmit = async (e) => {
            e.preventDefault();
            setLoading(true)
            if(newTicketData.description.length==0){
              toast("Enter Description")
              return
            }
            MlApi.post("/ticket-classification",{
              complaint : newTicketData.subject+" "+newTicketData.description
            }).then(response=>{
              newTicketData.level = response.data.assigned_level
              AuthApi.post("/tickets",newTicketData).then((response) => {
                if(response.status < 205){
                  setLoading(false)
                  AuthApi.get("/register/"+newTicketData.accountId).then((response1) => {
                    if(response1.status === 200){
                      let time = "2"
                      if(response.data.level == "L2"){
                        time = "4"
                      }
                      else if(response.data.level == "L3"){
                        time="24"
                      }
                        AuthApi.post("/email",{
                            recipient:response1.data,
                            subject:`Ticket Raised Axis Bank - ${response.data.subject}`,
                            msgBody:`Dear ${response.data.accountId},\nWe hope this message finds you well. This email is to confirm that your recent complaint has been successfully registered with Axis Bank. We take your concerns seriously and are committed to addressing them promptly.\n\nHere are the details of your complaint:\n\nComplaint Reference Number: ${response.data.id}\n\nAssigned Ticket to ${response.data.level} Engineer\n\nETA: ${time} Hours\n\nDescription of Complaint: ${response.data.subject}\n\nOur dedicated team is already reviewing your case, and we will work diligently to resolve the matter in a timely manner. You can expect further communication from us as we make progress.\nPlease feel free to reach out to our Customer Support team at 1860 419 5555 if you have any additional questions or require further assistance.\nWe appreciate your trust in Axis Bank and thank you for bringing this matter to our attention. Your satisfaction is our priority, and we will do our best to ensure a satisfactory resolution.\nThank you for being a valued customer.` 
                        }).then((ans)=>{
                          toast("Successully Raised Ticket")
                          navigate('/tickets');
                          navigate(0)
                          setLoading(false)
                        })
                        .catch((error)=>{
                            console.error('Error:', error);
                            toast('An error occurred while logging in. Please try again later.');
                            setLoading(false)
                        });
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
          })};
          const deleteTicket = async (e) => {
            e.preventDefault();
            AuthApi.delete("/tickets/"+ id).then((response) => {
                if(response.status === 200){
                  console.log("Successully Deleted Ticket")
                  navigate('/tickets');
                  navigate(0)
              } else {
                console.error('Not deleted');
              }
            })
            .catch((error)=>{
                  console.error('Error:', error);
              });
          }
    if(location.pathname.includes("new")){
        return(
            <form className="p-20"  onSubmit={(e)=>{handleNewTicketSubmit(e)}}>
            {loading && <Loading />}
            <div className="flex justify-center al">
                <div className="my-10 text-center text-3xl font-bold text-gray-900">
                    Customer Support Ticket </div>
                    <Badge className=" mx-3 my-10 text-center text-2xl font-bold text-gray-900" color={badges.status}>#{id}</Badge>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                <h2 className=" text-2xl mb-3 font-semibold leading-7 text-gray-900">Raise New Support Ticket</h2>            

                <div className="sm:col-span-4">
                <label htmlFor="subject" className="block text-lg font-bold text-xl leading-6 text-gray-900">
                    Subject
                </label>
                <div className="mt-2">
                <select
              id="subject"
              name="subject"
              autoComplete="subject"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={newTicketData.subject}
              defaultValue=""
              onChange={(e)=>{handleNewTicketChange(e)}}>
              <option> </option>
              <option>Credit reporting, repair, or other</option>
              <option>Debt collection</option>
              <option>Consumer Loan</option>
              <option>Credit card or prepaid card</option>
              <option>Mortgage</option>
              <option>Vehicle loan or lease</option>
              <option>Student loan</option>
              <option>Payday loan, title loan, or personal loan</option>
              <option>Checking or savings account</option>
              <option>Bank account or service</option> 
              <option>Money transfer, virtual currency, or money service </option>
              <option>Money transfers</option>
              <option>Other financial service</option>
            </select>
                </div>
            </div>
            <div className="mt-2 col-span-full">
              <label htmlFor="description" className="block text-lg font-bold text-xl leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={newTicketData.comment}
                  onChange={(e)=>{handleNewTicketChange(e)}}
                />
              </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={()=>{navigate("/tickets");navigate(0)}} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                    </button>
                    <button
                    onClick={(e)=>{handleNewTicketSubmit(e)}}
                    type="submit"
                    className="rounded-md bg-maroon px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Create Ticket
                    </button>
                </div>
            </form>
        )
    }else{
  return (
  <form className="p-20"  onSubmit={(e)=>{handleTicketSubmit(e)}}>
    {loading && <Loading />}
    <div className="flex justify-center al">
    <div className="my-3 text-center text-3xl font-bold ">
        Customer Support Ticket </div>
        <Badge className=" mx-3 my-3 text-center text-2xl font-bold " color={badges.status}>#{id}</Badge>
    </div>
    <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="font-bold text-xl ">Subject:</p>
          <h2 className="text-xl  text-black-900">{ticketData.subject}</h2>
          <p className="mt-5 text-xl font-bold">Description:</p>
          <p className="text-black-900 text-xl">{ticketData.description}.</p>
          <p className="mt-5 text-xl font-bold">Status: <p className="font-extrabold" name="status" onChange={(e)=>{handleTicketChange(e)}}>{ticketData.status}</p></p>
          {role==="EMPLOYEE" && ticketData.customerComment!=null && ticketData.customerComment.length > 0 && <div><p className="mt-5 text-xl font-bold">Customer Comment</p>
            <p className="text-xl" name="customerComment" >{ticketData.customerComment}</p></div>
            }
            <div className="sm:col-span-3">
                {role==="EMPLOYEE" && <div>
                    <p className=" mt-5 font-bold text-xl">Update Status </p>
                    <div className="mt-2">
                        <select
                        id="country"
                        name="status"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-lg sm:leading-6"
                        value={ticketData.status}
                        onChange={(e)=>{handleTicketChange(e)}}>
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Waiting For Customer</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                        </select>
                    </div>
                    <div className="mt-2 col-span-full">
                    <p htmlFor="about" className="mt-5 text-xl font-bold">Comment</p>
                    <div className="mt-2">
                        <textarea
                        id="about"
                        name="employeeComment"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                        value={ticketData.employeeComment}
                        onChange={(e)=>{handleTicketChange(e)}}/>
                    </div>
                </div>
            </div>}
            {role==="CUSTOMER" && ticketData.employeeComment!=null && ticketData.employeeComment.length > 0 && <div><p className=" mt-5 text-xl font-bold">Employee Comment:</p>
            <p className="text-xl" name="employeeComment" >{ticketData.employeeComment}</p></div>
            }
            {role==="CUSTOMER" && ticketData.status==="Waiting For Customer" && 
            <div><p className=" mt-5 text-xl font-bold">Comment:</p>
                    <div className="mt-2">
                        <textarea
                        id="about"
                        name="customerComment"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={ticketData.customerComment}
                        onChange={(e)=>{handleTicketChange(e)}}/>
                    </div></div>
            }
            {ticketData.status=="Resolved" && role=="CUSTOMER" && <div>
            <form onSubmit={(e)=>{handleFeedbackSubmit(e)}}>
            <p className="mt-5 text-xl font-bold">Feedback: </p>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={40}
              value={feedback.rating}
              emptyIcon={<i className="far fa-star"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            />
            <input
                    type="text"
                    className="border rounded p-1 w-1/2 mb-2"
                    name='content'
                    value={feedback.content}
                    onChange={(e) => handleFeedbackChanges(e)}
                  />
              <button onClick={(e)=>{handleFeedbackSubmit(e)}} className="inline-flex mt-5 ml-2 mb-20 items-center rounded-lg bg-maroon px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
              Submit Feedback</button>
              </form>
          </div>}
        </div>
        </div>   
    </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button onClick={()=>{navigate("/tickets");navigate(0)}} type="button" className="text-lg font-bold leading-8 text-gray-900">
          Cancel
        </button>
        {role==="EMPLOYEE" && <button
        onClick={(e)=>{handleTicketSubmit(e)}}
          type="submit"
          className="rounded-md bg-maroon px-3 py-2 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>}
        {role==="CUSTOMER" && ticketData.status === "Waiting For Customer" && <a
        onClick={(e)=>{ticketData.status = "Resolved";handleTicketSubmit(e);}}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Resolved
        </a>}
        {role==="CUSTOMER" && ticketData.status === "Waiting For Customer" && <a
        onClick={(e)=>{ticketData.status = "Open";handleTicketSubmit(e);}}
          type="submit"
          className="rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
        >
          Not Resolved
        </a>}
        {role==="CUSTOMER" && <button 
        onClick={(e)=>{deleteTicket(e)}}
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Delete
        </button>}
        
      </div>
    </form>
  )
}
}

export default TicketView