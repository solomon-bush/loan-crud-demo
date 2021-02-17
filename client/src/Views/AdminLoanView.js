import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Container, LinearProgress, Grid, Button, Card, CardHeader, CardActions, CardContent, Typography } from '@material-ui/core'
import PageHeader from '../Components/PageHeader'
import User from '../API/User'
import Loan from '../API/Loan'
import MUIDataTable from "mui-datatables";
import Tooltip from '@material-ui/core/Tooltip';

export default withRouter(class AdminLoanView extends Component {
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
            Loan.getAll().then(loans=>
                User.getAll().then(members =>{
                    this.setState({user, members, loans,isLoading: false})
                })
            )
        )
    }
    

    render() {
        return (
            <Container maxWidth='lg'>
                <PageHeader 
                    title='Admin Loan View'
                    subtitle={`TOTAL: ${this.state.loans.length}`}
                />
                {this.state.isLoading ? <LinearProgress/> :
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <MUIDataTable 
                                data={
                                    this.state.loans !== [] 
                                        ? this.state.loans.map(loan =>{return(loan)})
                                        : []
                                }
                                columns={[
                                    { label: 'ID', name: '_id', options: {display: false, filter: false}},
                                    { label: 'Variant', name: 'variant'},
                                    { label: 'Status', name: 'status'},
                                    { label: 'Amount', name: 'amount'},
                                    { label: 'Collected', name: 'collected'},
                                    { label: 'Outstanding', name: 'outstanding'},
                                    { label: '# Payments', name: 'payments.length'},
                                    { label: 'Member', name: 'borrower.username'},
                                    { label: 'Last Update', name: 'updatedAt',
                                        options: {
                                            filter: false,
                                            customBodyRenderLite: (dataIndex) => {
                                                return (
                                                    <Tooltip title={this.state.loans[dataIndex].updatedAt}>
                                                        <span>{this.state.loans[dataIndex].updatedAtFromNow}</span>
                                                    </Tooltip>
                                                )
                                            }
                                        }
                                    },
                                    { label: 'Created', name: 'createdAt',
                                        options: {
                                            filter: false,
                                            display: false,
                                            customBodyRenderLite: (dataIndex) => {
                                                return (
                                                    <Tooltip title={this.state.users[dataIndex].createdAt}>
                                                        <span>{this.state.users[dataIndex].createdAtFromNow}</span>
                                                    </Tooltip>
                                                )
                                            }
                                        }
                                    },
                                ]}
                                options={{
                                    filtering: true,
                                    responsive: 'vertical',
                                    exportButton: true,
                                    rowHover: true,
                                    enableNestedDataAccess: '.',
                                    // onRowClick: (data, meta) => { this.handleSelect({ data, meta }) },
                                    selectableRows: 'none',
                                    searchOpen: true
                                }}
                            />
                                
                        </Grid>

                    </Grid>
                }
            </Container>
        )
    }
})
