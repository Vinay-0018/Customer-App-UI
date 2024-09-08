import { Dropdown, Navbar,Avatar} from 'flowbite-react';
import {HiUserCircle} from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
export default function NavbarWithDropdown() {
  const role = localStorage.getItem('role')
  const navigate = useNavigate()
  return (
    <Navbar
      fluid
      className='p-4 bg-maroon'
    >
      <Navbar.Brand href="/dashboard">
        <img
          alt="Axis Bank"
          className="mr-3 h-6 sm:h-9"
          src="https://www.axisbank.com/assets/images/logo-white.png"
        />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={<Avatar alt="User settings" img={HiUserCircle}/>}
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {"Hello, " + localStorage.getItem('username')}
            </span>
            <span className="block truncate text-sm font-medium">
              {role}
            </span>
          </Dropdown.Header>
          {role!="ADMIN" && <Dropdown.Item href="/update-profile">
            Update Profile
          </Dropdown.Item>}
          <Dropdown.Divider/>
          <Dropdown.Item href="/" className="text-red-700 hover:text-red-900">
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/dashboard">
            <p className="p-2 text-lg text-white">Home</p>
        </Navbar.Link>
        
        { (role === "EMPLOYEE"||role=="ADMIN") && <Navbar.Link href="/tickets">
        <p className="p-2 text-lg text-white">Tickets Panel</p>
        </Navbar.Link>}
        { role==="CUSTOMER" && <Navbar.Link href="/tickets">
        <p className="p-2 text-lg text-white">View Tickets</p>
      </Navbar.Link> }
      { role==="ADMIN" && <Navbar.Link href="/level">
        <p className="p-2 text-lg text-white">Employee Level Assigner</p>
      </Navbar.Link> }
        { (role === "EMPLOYEE"||role=="ADMIN") && <Navbar.Link href="/faqs">
        <p className="p-2 text-lg text-white">FAQ Editor</p>
        </Navbar.Link>}
        { role==="CUSTOMER" && <Navbar.Link>
        <button onClick={(e) => {navigate("/tickets/new")}} className="rounded-lg bg-white m-1 px-4 py-2 ml-20 text-center font-medium text-maroon hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Create New Ticket</button>
      </Navbar.Link> }
      </Navbar.Collapse>
    </Navbar>
  )
}


