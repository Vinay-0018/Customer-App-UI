import React, { useEffect, useState } from 'react'
import { AuthApi } from '../common/Apis'
import { Rating, Table } from 'flowbite-react';
import { toast } from '../common/StylingConstants';


function LevelAssigner() {
    const [employees,setEmployees] = useState([])
    const [level,setLevel] = useState("")
    useEffect(()=>{
        getEmployees();
    },[])
    const getEmployees = () =>{
        AuthApi.get("/employee").then((response)=>{
            if(response.status==200){
                setEmployees(response.data);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
    const handleLevelSubmit = (employeeId,level) => {
        AuthApi.put("/employee/level?employeeId="+employeeId+"&level="+level).then((response)=>{
            if(response.status==200){
                toast("Employee: "+employeeId+" , Assigned: "+level)
                return level
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div className="m-5">
        <div className="mx-3 mb-5">
        <p className="text-2xl">Level Assigner</p>
        <p>*L1 - 2 Hours</p>
        <p>*L2 - 4 Hours</p>
        <p>*L3 - 24 Hours</p>
        </div>
    <Table hoverable>
      <Table.Head className="text-sm">
        <Table.HeadCell>
            Level
        </Table.HeadCell>
        <Table.HeadCell>
          Employee ID
        </Table.HeadCell>
        <Table.HeadCell>
          Name
        </Table.HeadCell>
        <Table.HeadCell>
          Email
        </Table.HeadCell>
        <Table.HeadCell>
          Contact
        </Table.HeadCell>
        <Table.HeadCell>
            <span className="sr-only">
                submit
            </span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {employees.map(employee => {
        return (<Table.Row className="bg-white text-black dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell>
          <select
              id="level"
              name="level"
              autoComplete="level"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              value={employee.level}
              defaultValue="L1"
              onChange={(e)=>{employee.level = e.target.value ;setLevel(e.target.value)}}>
              <option>L1</option>
              <option>L2</option>
              <option>L3</option>
            </select>
          </Table.Cell>
          <Table.Cell>
            {employee.employeeId}
          </Table.Cell>
          <Table.Cell>
            {employee.name}
          </Table.Cell>
          <Table.Cell>
            {employee.email}
          </Table.Cell>
          <Table.Cell>
            {employee.contactDetails}
          </Table.Cell>
          <Table.Cell>
            <button onClick={()=>{employee.level = handleLevelSubmit(employee.employeeId,level)}} className="bg-maroon rounded-lg text-white p-2">Submit</button>
          </Table.Cell>
        </Table.Row>)})}
      </Table.Body>
    </Table>
    </div>
  )
}

export default LevelAssigner