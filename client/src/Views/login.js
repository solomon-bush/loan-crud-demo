import React, { Component } from 'react'
import { Container, Grid, MenuItem, Select, TextField, Button, Card, CardContent, CardHeader, CardActions, Icon, Typography} from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';

import Loan from '../API/Loan'
import User from '../API/User'
export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
            role: 'member',
            errorMsg: null,
            auth: false
        }
    }

    handleLogin = () => {
        
        User.login(this.state.username, this.state.role)
            .then(data =>{
                this.setState({auth: true})

                // redirect here
            })
            .catch(err =>{
                this.setState({errorMsg: err})
            })

    }
    
    render() {
        return (
            <Container maxWidth='sm' style={{marginTop: '50%'}}>
                <Card > 
                    <CardHeader title='Loan Crud Demo' action={<LockIcon fontSize='large'/>}/>
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
                    <CardActions >
                        <Button 
                            variant='contained'
                            label='Logins'
                            color='primary'
                            onClick={() =>{this.handleLogin()}}
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
                </Card>
            </Container>
        )
    }
}
