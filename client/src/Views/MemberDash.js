import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Container, LinearProgress, Grid, Button, Card, CardHeader, Box, CardActionArea, CardContent, Typography, Divider } from '@material-ui/core'
import PageHeader from '../Components/PageHeader'
import User from '../API/User'

export default withRouter(class MemberDash extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            user: null,
            loans: [],
            isLoading: true
        }
    }
    
    componentDidMount(){
        User.getById(this.props.location.pathname.split('/')[2]).then(user => 
            User.getLoans(user._id).then(loans=>
                {
                    let totalBorrowed = 0
                    let totalPaid = 0
                    let totalRemaining = 0

                    loans.map(i =>{
                        totalBorrowed += i.amount
                        i.payments.map(p =>{
                            totalPaid += p.amount
                        })
                    })
                    totalRemaining = totalBorrowed - totalPaid
                    this.setState({user, loans, isLoading: false, totalBorrowed, totalPaid, totalRemaining})
                }
            )
        )
    }

    
    handleRouteSwitch(route) { 
        this.props.history.push({
            pathname: `${this.props.location.pathname}/${route}`
        })
    }


    render() {
        return (
            <Container maxWidth='lg'>
                <PageHeader 
                    title='Member Dash'
                    subtitle={
                        this.state.user !== null ? `${this.state.user.firstName} ${this.state.user.lastName}` : ''
                    }
                />
                {this.state.isLoading ? <LinearProgress/> :
                <Grid container spacing={3} >
                    <Grid item xs={9} container spacing={3}>
                        {/* Stats */}
                        <Grid item xs={6} md={3} >
                            {/* Total Loans */}
                            <Card style={{height: '100%'}}>
                                <CardHeader subheader='# of Loans'/>
                                <Divider variant='middle'/>
                                <CardContent>
                                    <Typography align='center' variant='h4' noWrap>{this.state.loans.length}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            {/* Total Borrowed */}
                            <Card style={{height: '100%'}}>
                                <CardHeader subheader='Borrowed'/>
                                <Divider variant='middle'/>
                                <CardContent>
                                    <Typography align='center' variant='h5' noWrap>
                                        {this.state.totalBorrowed.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).split('.')[0]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            {/* Total Paid */}
                            <Card style={{height: '100%'}}>
                                <CardHeader subheader='Paid'/>
                                <Divider variant='middle'/>
                                <CardContent>
                                    <Typography align='center' variant='h5' noWrap>
                                        {this.state.totalPaid.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).split('.')[0]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            {/* Total Remaining */}
                            <Card style={{height: '100%'}}>
                                <CardHeader subheader='Remaining'/>
                                <Divider variant='middle'/>
                                <CardContent>
                                    <Typography align='center' variant='h5' noWrap>
                                        {this.state.totalRemaining.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).split('.')[0]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                    <Grid item xs={3} container spacing={3} >
                        {/* Actions */}
                        <Grid item xs={12}>
                            <Button 
                                fullWidth 
                                variant='contained' 
                                color='primary'
                                style={{height:'100%'}}
                                onClick={()=>{this.handleRouteSwitch('new-loan')}}
                            >
                                New Loan
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                        {
                            this.state.loans.length !== 0 ?
                                <Button 
                                    fullWidth 
                                    variant='contained' 
                                    color='default' 
                                    style={{height:'100%'}}
                                    onClick={()=>{this.handleRouteSwitch('payment')}}
                                >
                                    Make Payment
                                </Button>
                                : null
                        }
                        </Grid>
                    </Grid>

                    <Grid item xs={12} >
                        <Divider />
                    </Grid>
                    
                    <Grid item xs={12} container spacing={4} >
                        <Grid item xs={12}>
                            <Typography variant='h4' align='center'>
                                {this.state.loans.length === 0 ? 'No Loans' : 'Loans'}
                            </Typography>
                        </Grid>
                        {this.state.loans.map(loan=>{
                            return (
                                <Grid item xs={6} md={3} >
                                    <Card style={{height: '100%'}}>
                                        <CardActionArea>
                                            <CardHeader 
                                                subheader={loan.variant.toUpperCase()} 
                                                title={loan.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                />
                                            <Divider/>
                                            <CardContent>
                                                <Typography><b>Started: </b>{loan.createdAt}</Typography>
                                                <Typography><b>Paid: </b>{loan.collected.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
                                                <Typography><b>Remaining: </b>{loan.outstanding.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                }
            </Container>
        )
    }
})
