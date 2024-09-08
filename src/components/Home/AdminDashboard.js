import React, { useEffect, useState } from 'react'
import { Card } from 'flowbite-react'
import { AuthApi } from '../common/Apis';
import { toast } from '../common/StylingConstants';
import TicketsTable from './SupportTicket/TicketsTable';
import Plot from 'react-plotly.js';

function AdminDashboard() {
  const [tickets,setTickets] = useState([]);
  const statuses = ["Open", "In Progress", "Waiting For Customer", "Resolved", "Closed"];
  const [status,setStatus] = useState("All")
  const [statusCounts, setStatusCounts] = useState({});
  const [levelCounts, setLevelCounts] = useState({L1:0,L2:0,L3:0});
  const [load,setLoad] = useState(true)
  const [dataByDay,setDataByDay] = useState({})
  useEffect(()=>{
    getTickets();
    setLoad(false);
  },[])
  useEffect(()=>{
    if(!load){
      countLevelCounts();
      countStatusTickets();
      setLoad(true)
      aggregateDataByDay(tickets)
    }
  },[tickets])
  useEffect(()=>{
    if(status!=="All"){
      getTickets() 
    }
  },[status])
  const getTickets= () =>{
    const queryArr = []
    if(status!=="All"){
      queryArr.push("status="+status)
    }
    AuthApi.get("/tickets?"+queryArr.join("&"))
        .then((response)=>{
          if(response.status===200){
            setTickets(response.data);
          } else {
            toast("Error Retriving Ticket's")
          }
        })
        .catch((e)=>{
          console.log(e)
        })
      }
    const countStatusTickets = () => {
      const counts = {};
      for (const status of statuses) {
        counts[status] = 0;
      }
      for (const ticket of tickets) {
        const status = ticket.status;
        if (counts.hasOwnProperty(status)) {
          counts[status]++;
        } 
      }
      setStatusCounts(counts);
    };
    const countLevelCounts = () => {
      const levels = {};
      levels["L1"] = 0;
      levels["L2"] = 0;
      levels["L3"] = 0;
      for (const ticket of tickets) {
        levels[ticket.level]++;
      }
      setLevelCounts(levels);
    }
    const aggregateDataByDay = (tickets) => {
      const _dataByDay = {};
      tickets.forEach((ticket) => {
        const timestamp = ticket.timestamp;
        const date = new Date(timestamp);
        const dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`;
        if (!_dataByDay[dateString]) {
          _dataByDay[dateString] = 0;
        }
        _dataByDay[dateString] += 1;
      });
      setDataByDay(_dataByDay);
      console.log(_dataByDay)
    };
  return (
    <div>
      <div className="flex text-center justify-between">
        <Card className="mx-5 my-2.5 w-full overflow-clip bg-[#2F4858]">
          <button onClick={()=>{setStatus("Open")}} className="text-sm text-white font-light">Open</button>
          <h5 className="mb-1 text-l font-semibold text-white dark:text-white">{statusCounts["Open"]}</h5>
        </Card>
        <Card className="mx-5 my-2.5 w-full overflow-clip bg-[#2F4868]">
          <button onClick={()=>{setStatus("In Progress")}} className="text-sm text-white font-light">In Progress</button>
          <h5 className="mb-1 text-l font-semibold text-white dark:text-white">{statusCounts["In Progress"]}</h5>
        </Card>
        <Card className="mx-5 my-2.5 w-full overflow-clip bg-[#613B73]">
          <button onClick={()=>{setStatus("Waiting For Customer")}} className="text-sm text-white font-light">Waiting For Customer</button>
          <h5 className="mb-1 text-l font-semibold text-white dark:text-white">{statusCounts["Waiting For Customer"]}</h5>
        </Card>
        <Card className="mx-5 my-2.5 w-full overflow-clip bg-[#802B66]">
          <button onClick={()=>{setStatus("Resolved")}} className="text-sm text-white font-light">Resolved</button>
          <h5 className="mb-1 text-l font-semibold text-white dark:text-white">{statusCounts["Resolved"]}</h5>
        </Card>
        <Card className="mx-5 my-2.5 w-full overflow-clip bg-[#434473]">
          <button onClick={()=>{setStatus("Closed")}} className="text-sm text-white font-light">Closed</button>
          <h5 className="mb-1 text-l font-semibold text-white dark:text-white">{statusCounts["Closed"]}</h5>
        </Card>
      </div>
      <div className="flex">
      <Plot
        data={[
          {
            labels: Object.keys(statusCounts),
            values: Object.values(statusCounts),
            type: 'pie',
          },
        ]}
        layout={{ width: window.screen.width/3,height: window.screen.height/2, title: 'Ticket Status Distribution' , paper_bgcolor: 'transparent'}}
      />
      <Plot
        data={[
          {
            x: Object.keys(dataByDay),
            y: Object.values(dataByDay),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Total Values',
          },
        ]}
        layout={{width: window.screen.width/3,height: window.screen.height/2,
          title: 'Daily Created Tickets',
          xaxis: {
            title: 'Date',
            showgrid: false,
          },
          yaxis: {
            title: 'Total Value',
            showgrid: false,
          },
          showgrid: false,
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent'
        }}
      />
      <Plot
        data={[
          {
            x: Object.keys(levelCounts),
            y: Object.values(levelCounts),
            type: 'bar',
            marker: {
              color: '#97144d'
            }
          },
        ]}
        layout={{ width: window.screen.width/3,height: window.screen.height/2, title: 'Level Wise Distribution',
        xaxis: {
          title: 'Labels',
          showgrid: false,
          
        },
        yaxis: {
          title: 'Counts',
          showgrid: false
        },
        showgrid: false, 
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'}}
      />
    </div>
      <div className="mx-5">
        <TicketsTable {...{tickets}}/>
      </div>
    </div>
  )
}

export default AdminDashboard