import React, { Component } from 'react'
import { Container, Grid, MenuItem, Select, TextField, Button, Card, CardContent, CardHeader, CardActions, Icon, Typography, Divider} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import { withRouter } from 'react-router-dom';
import User from '../API/User'

export default withRouter(class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            role: 'member',
            errorMsg: null
        }
    }
    
    handleRegistration = () => {
        User.create({
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            role: this.state.role
        }).then(()=>{
            this.props.history.push('/')
        }).catch(err => {
            this.setState({errorMsg: 'Invalid Submission'})
        })
    }
    
    render() {
        return (
            <Container maxWidth='sm'>
                <Card>
                    <CardHeader title='Register' action={<AddBoxIcon fontSize='large'/>}/>
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={5} >
                            <Grid item xs={12}>
                                <TextField 
                                    label='Username'
                                    value={this.state.username}
                                    onChange={e => this.setState({username: e.target.value, errorMsg: null })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    label='First Name'
                                    value={this.state.firstName}
                                    onChange={e => this.setState({firstName: e.target.value, errorMsg: null })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField 
                                    label='Last Name'
                                    value={this.state.lastName}
                                    onChange={e => this.setState({lastName: e.target.value, errorMsg: null })}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            onClick={() =>{
                                this.handleRegistration()
                            }}
                        >
                            Submit
                        </Button>

                        {this.state.errorMsg !== null 
                            ? 
                            <Typography color='error'>
                                {this.state.errorMsg}
                            </Typography>
                            : null 
                        }
                    </CardActions>
                </Card>
            </Container>
        )
    }
})
