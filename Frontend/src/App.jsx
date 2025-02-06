import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline ,Box} from '@mui/material';
import PropTypes from 'prop-types';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import RoleSelection from './Pages/Sign-up/RoleSelection';
import SignupForm from './Pages/Sign-up/SignupForm';
import LoginForm from './Pages/Login/LoginForm';
import MainContent from './Pages/Home/MainContent';
import Client from './Pages/Client';
import Freelancer from './Pages/Freelancer';
import ProtectedRoute from './common/ProtectedRoute';

import FreelancerProfile from './Components/Profile/FreelancerProfile';
import ClientProfile from './Components/Profile/ClientProfile';

import ProjectTitle from './Components/PostProject/ProjectTitle';
import ProjectSkill from './Components/PostProject/ProjectSkill';
import ProjectScope from './Components/PostProject/ProjectScope';
import ProjectBudget from './Components/PostProject/ProjectBudget';
import ProjectDescription from './Components/PostProject/ProjectDescription';
import ProjectDetails from './Components/PostProject/ProjectDetails';
import PostProjectLayout from './Components/PostProject/PostProjectLayout';

import Projects from './Pages/Freelancer/Projects';
import ProjectList from './Components/Projects/ProjectList';
import ProjectView from './Components/Projects/ProjectView';
import SaveProject from './Components/Projects/SaveProject';

import PostedProjects from './Pages/Client/postedProjects';
import ForgotPassword from './Pages/Forget-Password/forget-password';
import ProposalForm from './Pages/Freelancer/ProposalForm';
import ViewProposal from './Pages/Client/ViewProposal';
import ProposalsList from './Pages/Freelancer/ProposalsList';
import LiveChat from './Components/LiveChat/LiveChat';
import MilestoneManager from './Components/Milestone/MilestoneManager';

// import MilestoneList from './Components/Milestone/MilestoneList';

const customTheme = createTheme({
  palette: {
    secondary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
  },
});

const Layout = ({ role }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar userType={role} />
      <Box
        sx={{
          flexGrow: 1,  // This makes the Outlet take up remaining space
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

// PropTypes validation should be outside of the `App` function
Layout.propTypes = {
  role: PropTypes.string.isRequired, // Ensures 'role' is a required string
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<MainContent />} />
          <Route path='/signup' element={<RoleSelection />} />
          <Route path='/signup-form' element={<SignupForm />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='/login-form' element={<LoginForm />} />

          <Route path='/project-title' element={<ProjectTitle />} />
          <Route path='/project-skill' element={<ProjectSkill />} />
          <Route path='/project-scope' element={<ProjectScope />} />
          <Route path='/project-budget' element={<ProjectBudget />} />
          <Route path='/project-description' element={<ProjectDescription />} />
          <Route path='/project-details' element={<ProjectDetails />} />
          
          {/* <Route path='/milestone-list' element={<MilestoneList />} /> */}
          

          
          {/* Protected Route Freelancer*/}
          <Route element={<ProtectedRoute allowedRole='freelancer' />}>
            <Route element={<Layout role={'freelancer'} />}>
              <Route path='/freelancer' element={<Freelancer />} />
              <Route path='/project/all' element={<Projects />} />
              <Route path='/project' element={<ProjectList />} />
              <Route path='/project/:projectId' element={<ProjectView />} />
              <Route path='/proposal-form/:projectId' element={<ProposalForm/>} />
              <Route path='/freelancer/profile' element={<FreelancerProfile />}/>
              <Route path='/freelancer/save-project' element={<SaveProject />}/>
              <Route path='/freelancer/all-proposal' element={<ProposalsList />}/>
              <Route path='/live-chat' element={<LiveChat />} />
              <Route path='/milestone-manager/:projectId' element={<MilestoneManager />} />
            </Route>
          </Route>

          {/* Protected Route Client*/}
          <Route element={<ProtectedRoute allowedRole='client' />}>
            <Route path='/post-project-layout'element={<PostProjectLayout />}/>
            <Route element={<Layout role={'client'} />}>
              <Route path='/client' element={<Client />} />
              <Route path='/client/profile' element={<ClientProfile />} />
              <Route path='/client/posted-project'element={<PostedProjects />}/>
              <Route path='/view-proposal/:projectId' element={<ViewProposal/>} />
              <Route path='/live-chat' element={<LiveChat />} />
              <Route path='/milestone-manager-client/:projectId' element={<MilestoneManager />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
