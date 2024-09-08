import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import TicketsTable from './TicketsTable'
import { AuthApi } from '../../common/Apis'
import { toast } from '../../common/StylingConstants'
import TicketView from './TicketView'
import { useLocation, useParams } from 'react-router-dom'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UpdatedSupportTicket() {
  const categories = ["All","Open","In Progress","Waiting For Customer","Resolved","Closed"]
  const {pstatus} = useParams()
  const [status,setStatus] = useState("All")
  const [tickets,setTickets] = useState([])
  const role = localStorage.getItem('role')
  const location = useLocation()
  useEffect(()=>{
    getTicketData()
  },[status])

  const getTicketData = async () => {
    const queryArr = []
    if(status!=="All" || pstatus != null){
      queryArr.push("status="+status)
    }
    if(role==="EMPLOYEE"){
      AuthApi.get('/employee/'+localStorage.getItem('username')).then((response)=>{
        if(response.status===200){
          queryArr.push("level="+response.data.level)
          AuthApi.get("/tickets?"+queryArr.join("&")).then((response)=>{
            if(response.status===200){
              setTickets(response.data)
            }
          }
      )}
        }
    )}
    else if(role==="CUSTOMER"){
      queryArr.push("accountId="+localStorage.getItem('username'))
      AuthApi.get("/tickets?"+queryArr.join("&"))
      .then((response)=>{
        if(response.status===200){
          setTickets(response.data)
        } else {
          toast("Error Retriving Ticket's")
        }
      })
      .catch((e)=>{
        console.log(e)
      })
    } else {
      AuthApi.get("/tickets?"+queryArr.join("&"))
      .then((response)=>{
        if(response.status===200){
          setTickets(response.data)
        } else {
          toast("Error Retriving Ticket's")
        }
      })
      .catch((e)=>{
        console.log(e)
      })
    }
  }
  if(location.pathname==="/tickets"){
  return (
    <div className="px-10">
        <h1 className="mt-10 text-2xl font-bold text-gray-900">
        Support Tickets</h1>
        <div className="px-2 py-5 sm:px-0">
        <Tab.Group>
            <Tab.List className="rounded-xl p-3">
            {categories.map((category) => (
                <Tab
                onClick={()=>{setStatus(category)}}
                key={category}
                className={({ selected }) =>
                    classNames(
                    'px-8 rounded-lg py-2 text-lg font-bold leading-5 text-maroon',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                        ? 'bg-maroon shadow text-white'
                        : 'text-maroon hover:bg-white/[0.12]'
                    )
                }
                >
                {category}
                </Tab>
            ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
                <TicketsTable {...{tickets}}/>
            </Tab.Panels>
        </Tab.Group>
        </div>
    </div>
  )} else {
    return(
        <div className="w-full h-screen bg-maroon-0">
            <TicketView />
        </div>
    )
  }
}
