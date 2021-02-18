import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

import { Container, LinearProgress, Grid, TextField, Button, Card, CardContent, CardHeader, CardActions, Icon, Typography, Divider} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PageHeader from '../Components/PageHeader'
import User from '../API/User'
import Loan from '../API/Loan'

export default withRouter(class MemberNewPayment extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            user: null,
            isLoading: true,
            amount: null,
            loan: null,
            loans: []
        }
    }
    
    componentDidMount(){
        User.getById(this.props.location.pathname.split('/')[2]).then(user => 
            User.getLoans(user._id).then(loans =>{
                this.setState({user, loans, isLoading: false})
            })
        )
    }
    handleSubmit = () =>{
        if(this.state.loan !== null && this.state.amount > 0){
            Loan.makePayment(this.state.loan._id,
                ({amount: this.state.amount})
            ).then(() =>{
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
                                title='Give us your money'
                            />
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        {/* Loan */}
                                        <Typography variant='h6'>Loan</Typography>
                                            <Autocomplete
                                                id="loans"
                                                value={this.state.loan}
                                                options={this.state.loans}
                                                getOptionLabel={(option) => 
                                                    `${option.variant} - ${option.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).split('.')[0]}` || ''}
                                                onChange={(event, newValue) => {
                                                    if (newValue !== null) {
                                                        this.setState({ loan: newValue,  errorMsg: null });
                                                    } else {
                                                        this.setState({ laon: null,  errorMsg: null  })
                                                    }
                                                }}
                                                renderInput={(params) =>
                                                    <TextField {...params} label="Select Loan" variant="outlined" />
                                                }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Amount */}
                                        <Typography variant='h6'>Amount</Typography>
                                        <TextField 
                                            id='amount'
                                            label='Input Amount'
                                            variant='outlined'
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