import React, { Component } from 'react'
import { Container, Grid, MenuItem, Select, TextField, Button, Card, CardContent, CardHeader, CardActions, Icon, Typography, Divider, CardActionArea} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import { Redirect, withRouter } from 'react-router-dom';
import User from '../API/User'

import {authPayload, login} from '../session'

export default withRouter(class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
            role: authPayload.value.role,
            errorMsg: null,
            auth: authPayload.value.auth,
            id: authPayload.value.id,

        }
        this.subs = []
    }
    componentDidMount = () => {
        this.subs.push(authPayload.subscribe(
            authPayload=>{
                this.setState({auth: authPayload.auth, id: authPayload.id, role: authPayload.role})
            }
        ))
    }
    componentWillUnmount = () =>{
        this.subs.forEach(sub =>{ sub.unsubscribe() })  
    }

    getRedirect = () =>{
        return  this.props.location.state || {from:{pathname:`/${this.state.role}/${this.state.id}`}}
    }

    handleLogin = () => {
        User.login(this.state.username, this.state.role)
            .then(data =>{
                login(data)
            })
            .catch(err =>{
                this.setState({errorMsg: err})
            })
    }
    
    render() {
        return this.state.auth ? <Redirect to={this.getRedirect().from.pathname} />  :
            (
                <Container maxWidth='sm'>
                    <Card> 
                        <CardHeader title='Login' action={<LockIcon fontSize='large'/>}/>
                        <Divider/>
                        <CardContent>
                            <Grid container spacing={5} direction='column'>
                                <Grid item xs={12} >
                                    <TextField 
                                        label='Username'
                                        value={this.state.username}
                                        onChange={e => this.setState({username: e.target.value, errorMsg: null })}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}  >
                                    <Select 
                                        fullWidth 
                                        defaultValue='member' 
                                        value={this.state.role}
                                        onChange={e => this.setState({role: e.target.value, errorMsg: null })}
                                    >
                                        <MenuItem value='member'>Member</MenuItem>
                                        <MenuItem value='admin'>Admin</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button 
                                variant='contained'
                                label='Logins'
                                color='primary'
                                onClick={this.handleLogin}
                            >
                                Login
                            </Button>
                            {this.state.errorMsg !== null 
                                ? 
                                <Typography color='error'>
                                    {this.state.errorMsg}
                                </Typography>
                                : null  
                            }
                            {this.state.auth === true 
                                ? 
                                <Typography style={{color: 'lawngreen'}}>
                                    Success. Logged In!
                                </Typography>
                                : null 
                            }  
                        </CardActions>
                        <Divider/>
                        <CardActionArea onClick={()=>{this.props.history.push('/register')}}>
                            <Typography variant='subtitle1' align='center'>Register</Typography>
                        </CardActionArea>
                    </Card>
                </Container>
            
        )
    }
})
