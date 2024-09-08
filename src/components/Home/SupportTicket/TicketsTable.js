import { Rating, Table } from 'flowbite-react';
import { useNavigate,generatePath } from 'react-router-dom';
import { Badge } from 'flowbite-react';
import { useState } from 'react';
export default function TicketsTable({tickets}) {
  const navigate = useNavigate();
  const badges = {
    "Open":"failure",
    "In Progress":"default",
    "Waiting For Customer":"warning",
    "Resolved":"purple",
    "Closed":"success"
}
const [feedback,setFeedback] = useState({})
const role = localStorage.getItem('role')
  const calculateTimeElapsed = (timestamp) => {
    const currentDate = new Date();
    const createdDate = new Date(timestamp);
    const elapsedMilliseconds = currentDate - createdDate;
    if (elapsedMilliseconds < 1000) {
      return 'Just now';
    } else if (elapsedMilliseconds < 60000) {
      const seconds = Math.floor(elapsedMilliseconds / 1000);
      return `${seconds} Second${seconds !== 1 ? 's' : ''} ago`;
    } else if (elapsedMilliseconds < 3600000) {
      const minutes = Math.floor(elapsedMilliseconds / 60000);
      return `${minutes} Minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (elapsedMilliseconds < 86400000) {
      const hours = Math.floor(elapsedMilliseconds / 3600000);
      return `${hours} Hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      return '24+ Hours ago';
    }
  }
  function convertTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    const hours = date.getUTCHours() + 6; 
    const minutes = date.getUTCMinutes() + 30; 
    const adjustedHours = hours % 24;
    const adjustedMinutes = minutes % 60;
    const formattedTime = `${adjustedHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;
    return {
      date: formattedDate,
      time: formattedTime,
    };
  }
  return (
    <Table hoverable>
      <Table.Head className="text-sm">
        <Table.HeadCell>
          Created At
        </Table.HeadCell>
        <Table.HeadCell>
          Account ID
        </Table.HeadCell>
        <Table.HeadCell>
          Subject
        </Table.HeadCell>
        <Table.HeadCell>
          Description
        </Table.HeadCell>
        <Table.HeadCell>
          Status
        </Table.HeadCell>
        <Table.HeadCell>
          <div className="sr-only">
            edit
          </div>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {tickets.map(ticket => {
        return (<Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-maroon dark:text-white">
          <div className="text-center">
            <div>
              {(ticket.status == "Closed" && role=="ADMIN")?<Rating>
                  {Array(ticket.feedback.rating).fill(1).map((el, i) =>
                      <Rating.Star />
                  )}
                  {Array(5-ticket.feedback.rating).fill(1).map((el, i) =>
                      <Rating.Star filled={false}/>
                  )}
                  </Rating>:calculateTimeElapsed(ticket.timestamp)}
              </div>
              <div>
                <p>{convertTimestamp(ticket.timestamp).time} </p>
                <p>{convertTimestamp(ticket.timestamp).date}</p>
              </div>
            </div>
          </Table.Cell>
          <Table.Cell>
            {ticket.accountId}
          </Table.Cell>
          <Table.Cell>
            {ticket.subject}
          </Table.Cell>
          <Table.Cell>
            {ticket.description}
          </Table.Cell>
          <Table.Cell className="flex">
            <Badge color={badges[ticket.status]}>{ticket.status}</Badge>
          </Table.Cell>
          <Table.Cell>
            <div className="flex">
              {(ticket.status == "Resolved" && role=="CUSTOMER")? <a className=" text-red-600" onClick={()=> navigate(generatePath("/tickets/"+ticket.id))}>Give Feedback</a>:(role==="ADMIN")?  <a className=" text-red-600" onClick={()=> navigate(generatePath("/tickets/"+ticket.id))}>View</a> :
              <a className=" text-red-600" onClick={()=> navigate(generatePath("/tickets/"+ticket.id))}>Edit</a>}
            </div>
          </Table.Cell>
        </Table.Row>)})}
      </Table.Body>
    </Table>
  )
}


