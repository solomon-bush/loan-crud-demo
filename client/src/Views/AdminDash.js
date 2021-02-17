import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Container, LinearProgress, Grid, Button, Card, CardHeader, CardActions, CardContent, Typography } from '@material-ui/core'
import PageHeader from '../Components/PageHeader'
import User from '../API/User'
import Loan from '../API/Loan'
import ViewListIcon from '@material-ui/icons/ViewList';
import PeopleIcon from '@material-ui/icons/People';
import BarChart from '../Components/BarChart'

export default withRouter(class AdminDash extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: null,
            loans: [],
            members: [],
            isLoading: true
        }
    }

    componentDidMount(){
        User.getById(this.props.location.pathname.split('/')[2]).then(user => 
            Loan.getAll().then(loans=>
                User.getAll().then(members =>{
                    this.setState({user, members, loans,isLoading: false})
                })
            )
        )
    }
    
    handleRouteSwitch(route) { 
        this.props.history.push({
            pathname: `${this.props.location.pathname}/${route}`
        })
    }

    getTotalLoans = () =>{
        return this.state.loans.length
    }
    getTotalMembers = () =>{
        return this.state.members.length
    }
    getTotalLended = () =>{
        let totalLended = 0
        if (this.state.loans.length !== 0) {
            this.state.loans.map(v =>{
                totalLended += v.amount
            })
        }
        return totalLended.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    getTotalCollected = () =>{
        let totalCollected = 0
        if (this.state.loans.length !== 0) {
            this.state.loans.map(v =>{
                v.payments.map(p=>{
                    totalCollected += p.amount
                })
            })
        }

        return totalCollected.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    buildChartData = () =>{
        let homeShard = {
                variant: 'Home',
                totalLend: 0,
                totalCollect: 0,
                totalOutstanding: 0
            }
        let personalShard = {
                variant: 'Personal',
                totalLend: 0,
                totalCollect: 0,
                totalOutstanding: 0
            }
        let paydayShard = {
                variant: 'Payday',
                totalLend: 0,
                totalCollect: 0,
                totalOutstanding: 0
            }
        
        if (this.state.loans.length !== 0) {
            this.state.loans.map(v =>{
                let collected = 0
                v.payments.map(p=>{
                    collected += p.amount
                })
                if(v.variant === 'Home'){
                    homeShard.totalLend += v.amount
                    homeShard.totalCollect += collected
                    homeShard.totalOutstanding += (v.amount - collected)
                }
                if(v.variant === 'Personal'){
                    personalShard.totalLend += v.amount
                    personalShard.totalCollect += collected
                    personalShard.totalOutstanding += (v.amount - collected)
                }
                if(v.variant === 'Payday'){
                    paydayShard.totalLend += v.amount
                    paydayShard.totalCollect += collected
                    paydayShard.totalOutstanding += (v.amount - collected)
                }
            })
        }

        return([homeShard, personalShard, paydayShard])
    }



    render() {
        return (
            <Container maxWidth='lg'>
                <PageHeader 
                    title='Admin Dash'
                    subtitle={
                        this.state.user !== null ? `${this.state.user.firstName} ${this.state.user.lastName}` : ''
                    }
                
                    actions={this.state.user !== null ? 
                        [
                            { name: 'View Loans', link: 'loan', icon: <ViewListIcon /> },
                            { name: 'View Members', link: 'member', icon: <PeopleIcon /> }
                        ]
                        : null }
                />
                {this.state.isLoading ? <LinearProgress/> :
                    <Grid container spacing={3} >
                        {/* Snapshot / Overview  */}
                        <Grid item xs={6} md={3} >
                            {/* Total Loans */}
                            <Card style={{height: '100%'}}>
                                <CardHeader title='# of Loans'/>
                                <CardContent>
                                    <Typography align='center' variant='h3'>{this.getTotalLoans()}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            {/* Total Members */}
                            <Card style={{height: '100%'}}>
                                <CardHeader title='# of Members'/>
                                <CardContent>
                                    <Typography align='center' variant='h3'>{this.getTotalMembers()}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            {/* Total Lent */}
                            <Card style={{height: '100%'}}>
                                <CardHeader title='Total Loans'/>
                                <CardContent>
                                    <Typography align='center' variant='h4'>{this.getTotalLended()}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            {/* Total Outstanding */}
                            <Card style={{height: '100%'}} > 
                                <CardHeader title='Total Collected'/>
                                <CardContent>
                                    <Typography align='center' variant='h4'>{this.getTotalCollected()}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12}>
                            {/* Loan Chart  */}
                            <Card>
                                {/* <CardHeader title='Lending Chart'/> */}
                                <CardContent>
                                    <BarChart title='Loan Type - Totals' data={this.buildChartData()}/>
                                </CardContent>
                            </Card>
                        </Grid>
                        
                        <Grid item xs={12}>
                            {/* Actions */}
                            <Card>
                                <CardHeader title='Actions'/>
                                <CardActions>
                                    {/* View Loans */}
                                    <Button variant='contained' color='primary'
                                        onClick={() => { this.handleRouteSwitch('loan') }}
                                    >
                                        View Loans
                                    </Button>
                                    {/* View Members */}
                                    <Button variant='contained' color='primary'
                                        onClick={() => { this.handleRouteSwitch('member') }}
                                    >
                                        View Members
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                    </Grid>
                }
            </Container>
        )
    }
})
