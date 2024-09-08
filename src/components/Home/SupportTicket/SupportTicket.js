import Tickets from "./Tickets";
import { useState,useEffect,useRef } from "react";
import { AuthApi } from "../../common/Apis";
import { toast } from "../../common/StylingConstants";
import { useLocation, useNavigate } from "react-router-dom";
import TicketView from "./TicketView";
import { Tabs } from 'flowbite-react';
import { statuses } from "../../common/Constants";
export default function SupportTicket() {
    const [tickets,setTickets] = useState([]);
    const role = localStorage.getItem('role')
    const location = useLocation()
    const [activeTab, setActiveTab] = useState("All");
    useEffect(()=>{
        getTicketData()
    },[activeTab])
    const getTicketData = async () => {
      const queryArr = []
      if(activeTab!=="All"){
        queryArr.push("status="+activeTab)
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
      }
    }
  if(location.pathname==="/tickets"){
  return (
      <div className="px-10">
          <h1 className="my-10 text-2xl font-bold text-gray-900">
          Support Tickets</h1>
      <Tabs.Group  className="w-full"
        onActiveTabChange={(tab) => {setActiveTab(statuses[tab]);console.log(activeTab)}}
      >
        <Tabs.Item active title="All">
          <div className="flex flex-wrap">
          {tickets.length>0 ? <Tickets {...{tickets}} /> : <>No {activeTab} Tickets.</>}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Open">
          <div className="flex flex-wrap">
              {tickets.length>0 ? <Tickets {...{tickets}} /> : <>No {activeTab} Tickets.</>}
          </div>
        </Tabs.Item>
        <Tabs.Item title="In Progress">
          <div className="flex flex-wrap">
          {tickets.length>0 ? <Tickets {...{tickets}} /> : <>No {activeTab} Tickets.</>}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Waiting For Customer">
          <div className="flex flex-wrap">
          {tickets.length>0 ? <Tickets {...{tickets}} /> : <>No {activeTab} Tickets.</>}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Resolved">
          <div className="flex flex-wrap">
          {tickets.length>0 ? <Tickets {...{tickets}} /> : <>No {activeTab} Tickets.</>}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Closed">
          <div className="flex flex-wrap">
          {tickets.length>0 ? <Tickets {...{tickets}} /> : <>No {activeTab} Tickets.</>}
          </div>
        </Tabs.Item>
      </Tabs.Group>
      </div>
  )
} else {
  return(
    <div className="w-full h-screen bg-maroon-0">
    <TicketView />
    </div>
  )
    }}

