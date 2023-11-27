  import MainContainer from "./components/MainContainer";
  import LoginContainer from "./components/LoginContainer";
  import {Routes,Route, Navigate} from 'react-router-dom';
  import Welcome from "./components/Welcome";
  import ChatArea from "./components/ChatArea";
  import Users from './components/Users'
  import Groups from './components/Groups'
  import CreateGroups from "./components/CreateGroups";
  import { useSelector } from "react-redux";
  import PrivateRoute from "./components/PrivateRoute";

function App() {
  const currentTheme = useSelector((state) => state.themeKey);
   const currentUser = useSelector((state) => state.userKey.currentUser);
  return (
    <div className={`${currentTheme ? 'dark' : ''}`}>   
      <div className={`bg-slate-200  dark:bg-slate-900 min-h-screen justify-center items-center flex font-sans`}>
        <Routes>
         <Route path="/" element={currentUser ? <Navigate to="/app/welcome" /> : <LoginContainer />} />
          <Route path="app" element={<MainContainer />}>
            <Route element={<PrivateRoute />}>
              <Route path="welcome" element={<Welcome />}></Route>
              <Route path="chat/:id" element={<ChatArea/>}></Route>
              <Route path="users" element={<Users/>}></Route>
              <Route path="groups" element={<Groups/>}></Route>
              <Route path="create-group" element={<CreateGroups />}></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
    );
  }

  export default App;
