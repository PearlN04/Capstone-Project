import './App.css';
import FacultyAdminDashboard from './components/FacultyAdminDashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import FacultyAdmin from './components/FacultyAdmin';
import ManageAdvisors from './components/ManageAdvisors'
import AddAdvisorForm from './components/AddAdvisorForm';
import RemoveAdvisorForm from './components/RemoveAdvisorForm';



import SDashboard from './components/SDashboard';
import ViewAppointments from './components/ViewAppointments';
import ViewAdvisors from './components/ViewAdvisors';
import BookAppointment from './components/BookAppointment';
import StudentProfile from './components/SProfile';
import Login from './components/Login';
import SmartAdvisor from './components/SmartAdvisor';
import FacAdDash from './components/FacAdDash';


import AdvisorDashboard from './components/Advisor';
import MyAppointments from './components/MyAppointment';
import CourseManagement from './components/Courses';  
import AppointmentDetails from './components/AppointmentDetails';
import AddCourse from './components/AddCourses';
import Profile from './components/Profile';
import Majors from './components/Majors';
import MajorDetails from './components/MajorDetails';
import SystemAdminDash from './components/SystemAdminDash'
import SignUp from './components/SignUp';

import ManageUsers from './components/ManageUsers'
import Appbar from './components/Appbar';
import User from './components/User';
import AdvisorDashboardLut from './components/AdvisorDashBoard';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/manageadvisors" element={<ManageAdvisors />} />
        <Route path="/FacultyAdminDashboard" element={<FacultyAdminDashboard/>}/>
        <Route path='/facAdDash' element={<FacAdDash/>}/>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/SDashboard" element={<SDashboard />} />
        <Route path="/ViewAppointments" element={<ViewAppointments />} />
        <Route path="/ViewAdvisors" element={<ViewAdvisors />} />
        <Route path="/BookAppointment" element={<BookAppointment />} />
        <Route path="/SProfile" element={<StudentProfile />} />
        <Route path="/SmartAdvisor" element={<SmartAdvisor />} />
        <Route path="/facultyadmin" element={<FacultyAdmin/>}/>
        <Route path="/advisorDashboard" element={<AdvisorDashboard />} />
        <Route path="/advisorDashboardLut" element={<AdvisorDashboardLut />} />
        {/* Route for appointments */}
        <Route path="/appointments" element={<MyAppointments />} />
        <Route path="/appointment-details" element={<AppointmentDetails />} />
        {/* Route for managing courses */}
        <Route path="/courses" element={<CourseManagement />} />
        <Route path="/add-course" element={<AddCourse />} />
	      <Route path="/profile" element={<Profile />} />
        {/*Route for managing majors*/}
        <Route path="/majors" element={<Majors />} />
        <Route path="/major-details" element={<MajorDetails />} />
        <Route path="/systemadmindash" element={<SystemAdminDash/>}/>
        <Route path ="/manageusers" element={<ManageUsers/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
    </Router>
  );
}

export default App;
