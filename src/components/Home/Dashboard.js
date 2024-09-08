import { useEffect,useState} from 'react'
import CustomerFaq from './Faq/CustomerFaq';
import NavbarWithDropdown from './Navbar/Navbar';
import { useLocation,useNavigate } from 'react-router-dom';
import SupportTicket from './SupportTicket/SupportTicket';
import Faqs from './Faq/Faqs';
import UpdateProfile from '../Home/Navbar/UpdateProfile';
import FooterWithSocialMediaIcons from '../common/DefaultFooter';
import UpdatedSupportTicket from './SupportTicket/UpdatedSupportTicket';
import AdminDashboard from './AdminDashboard';
import LevelAssigner from './LevelAssigner';
function Dashboard() {
  const [loggedIn,setLoggedIn] = useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const role = localStorage.getItem('role')
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setLoggedIn(true)
    }
    else{
      navigate('/login')
    }
  },[])
  return (
    <div className="bg-maroon-0">
    {loggedIn && <div>
      <NavbarWithDropdown />
      <div className="w-screen h-screen overflow-scroll">
      {location.pathname==="/dashboard" && (role==="ADMIN"?<AdminDashboard/>:<CustomerFaq />)}
      {location.pathname.includes("/tickets") && <UpdatedSupportTicket />}
      {location.pathname=="/faqs" && <Faqs />}
      {location.pathname === "/update-profile" && <UpdateProfile/>}
      {location.pathname === "/level" && <LevelAssigner/>}
      </div>
    </div>}
    
    <FooterWithSocialMediaIcons />
    </div>
  )
}
export default Dashboard;