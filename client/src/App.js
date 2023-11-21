  import MainContainer from "./components/MainContainer";
  import LoginContainer from "./components/LoginContainer";
  import {Routes,Route} from 'react-router-dom';
  import Welcome from "./components/Welcome";
  import ChatArea from "./components/ChatArea";
  import Users from './components/Users'
  import Groups from './components/Groups'
  import CreateGroups from "./components/CreateGroups";
import { useSelector } from "react-redux";



function App() {
    const currentTheme = useSelector((state) => state.themeKey);
    
  return (
    <div className={`${currentTheme ? 'dark' : ''}`}>   
      <div className={`bg-slate-200  dark:bg-slate-800 min-h-screen justify-center items-center flex font-sans`}>
        <Routes>
          <Route path="/" element={ <LoginContainer/>} />
          <Route path="app" element={<MainContainer/>}>
            <Route path="welcome" element={<Welcome/>}></Route>
            <Route path="chat" element={<ChatArea/>}></Route>
            <Route path="users" element={<Users/>}></Route>
            <Route path="groups" element={<Groups/>}></Route>
            <Route path="create-group" element={<CreateGroups/>}></Route>
          </Route>
        </Routes>
      </div>
    </div>
    );
  }

  export default App;
