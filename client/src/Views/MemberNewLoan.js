import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import { Container, LinearProgress, Grid, MenuItem, Select, TextField, Button, Card, CardContent, CardHeader, CardActions, Icon, Typography, Divider} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import PageHeader from '../Components/PageHeader'
import User from '../API/User'
import Loan from '../API/Loan'

export default withRouter(class MemberNewLoan extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            user: null,
            isLoading: true,
            amount: null,
            status: 'Active',
            variant: 'Home'
        }
    }
    
    componentDidMount(){
        User.getById(this.props.location.pathname.split('/')[2]).then(user => 
            this.setState({user, isLoading: false})
        )
    }
    handleSubmit = () =>{
        if(this.state.variant !== null && this.state.amount > 0){
            Loan.create(({
                amount: this.state.amount,
                variant: this.state.variant,
                status: this.state.status,
                borrower: this.state.user._id
            })).then(() =>{
                this.props.history.push(`/member/${this.state.user._id}`)
            }).catch(() =>{
                this.setState({errorMsg: 'Invalid Input'})    
            })
            
        }else{
            this.setState({errorMsg: 'Invalid Input'})
        }
    }

    render() {
        return (
            <Container maxWidth='lg'>
                <PageHeader 
                    title='New Loan'
                    subtitle={
                        this.state.user !== null ? `${this.state.user.firstName} ${this.state.user.lastName}` : ''
                    }
                />
                {this.state.isLoading ? <LinearProgress/> :
                <Grid container>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader 
                                title='Get your money'
                            />
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Typography variant='h6'>Loan Variant</Typography>
                                        <Select 
                                            fullWidth
                                            variant='outlined'
                                            value={this.state.variant}
                                            onChange={e => this.setState({variant: e.target.value, errorMsg: null })}
                                        >
                                            <MenuItem value='Home'>Home</MenuItem>
                                            <MenuItem value='Personal'>Personal</MenuItem>
                                            <MenuItem value='Payday'>Payday</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12}>

                                        <Typography variant='h6'>Amount</Typography>
                                        <TextField 
                                            label='Amount'
                                            value={this.state.amount}
                                            type="Number"
                                            onChange={e => this.setState({amount: e.target.value, errorMsg: null })}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    variant='contained'
                                    onClick={() =>{
                                        this.handleSubmit()
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
                    </Grid>
                </Grid> 
                }
            </Container>
        )
    }   
})