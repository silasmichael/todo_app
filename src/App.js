import React, { useState } from 'react';
import './App.css';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Main from './Main';
import SignUp from './SignUp';
import SignIn from './SingIn';

function App() {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(true);
  // const [appContext, setAppContext] = useState(<SignIn/>)
  if(login===false){
    var appContext=<SignIn/>
  } else
  if (register===false) {
    var appContext=<SignUp/>
  } else if(login===true&&register===true){
    var appContext=<Main name = "Michael Silas"/>
  }
  
  return (
    // <Main name = "Michael Silas"/>
    <div className="App">
      {appContext}
    </div>
    
  );
}

export default App;
