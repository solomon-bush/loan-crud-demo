import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import dark from './dark.json'
import BaseRouter from './Router/BaseRouter'
import { Container } from '@material-ui/core';
import {authPayload} from './session'

const darktheme = createMuiTheme({palette: dark.palette})


class App extends React.Component{
  constructor(){
    super()

    let theme = localStorage.getItem("theme") !== null ? parseInt(localStorage.getItem("theme")) : 0;

    this.state = {
      selection: theme
    }

  }

  render(){
    return (
        <MuiThemeProvider theme={darktheme}>
            <CssBaseline />
            <BaseRouter/>
        </MuiThemeProvider>
    );
  }
 
};



ReactDOM.render(
  <App />,
document.getElementById('root')
);