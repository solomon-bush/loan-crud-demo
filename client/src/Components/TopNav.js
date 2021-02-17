import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'

//ICONS
import UserAvatar from '@material-ui/icons/AccountCircle';
import MonetizationOnSharpIcon from '@material-ui/icons/MonetizationOnSharp';

//MAT-UI
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import {authPayload, logout} from '../session'



const useStyles = theme => ({
   appBar: {
      zIndex: theme.zIndex.drawer + 1,
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   logo: {
      height: 40,
      width: 'auto'
   },
   title: {
    flexGrow: 1,
    textAlign: 'center'
 }
});


class TopNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          anchorEl: null,
          username: localStorage.getItem('username'),
          role: localStorage.getItem('role')
        }
        this.subs = []

    }
    componentDidMount = () => {
        this.subs.push(authPayload.subscribe(
            ()=>this.setState({
                username: localStorage.getItem('username'),
                role: localStorage.getItem('role')
            })
        ))
    }
    componentWillUnmount = () =>{
        this.subs.forEach(sub =>{ sub.unsubscribe() })  
    }



    hanldleLogout = () =>{
        logout()
        this.setState({username: '', role: ''})
    }



    handleClick = e => {
        this.setState({anchorEl: e.currentTarget});
        };

        handleClose = () => {
        this.setState({anchorEl: null});
        };
        handleToggle = () => {
        this.setState({
            open: !this.state.open 
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Toolbar>
                <MonetizationOnSharpIcon className={classes.logo}  alt="Loan CRUD LOGO"/>      
                <Typography variant="h6" className={classes.title}>
                    LOAN CRUD DEMO
                </Typography>
                <React.Fragment>
                    <Typography>{this.state.role ? this.state.role.toUpperCase() : ''}</Typography>
                    <IconButton variant='circle' onClick={this.handleClick} >
                        <UserAvatar style={{color: '#FFF'}}/>
                    </IconButton>
                    <Menu
                        id="account-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem id="userName" divider  disabled>
                            {this.state.username}
                        </MenuItem>
                        <MenuItem id="logout">
                            <Button variant='contained' fullWidth color='primary' onClick={this.hanldleLogout}>  
                                Logout
                            </Button>
                        </MenuItem>
                    </Menu>
                </React.Fragment>
                
            </Toolbar>
        )
   }
}
export default withStyles(useStyles)(TopNav)