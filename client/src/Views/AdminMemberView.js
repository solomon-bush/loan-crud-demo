import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import { Container, LinearProgress, Grid, Button, Card, CardHeader, CardActions, CardContent, Typography } from '@material-ui/core'
import PageHeader from '../Components/PageHeader'
import User from '../API/User'
import Loan from '../API/Loan'
import MUIDataTable from "mui-datatables";
import Tooltip from '@material-ui/core/Tooltip';

export default withRouter(class AdminMemberView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: null,
            members: [],
            isLoading: true
        }
    }

    componentDidMount(){
        User.getById(this.props.location.pathname.split('/')[2]).then(user => 
            User.getAll().then(members =>{
                this.setState({user, members, isLoading: false})
            })
        )
    }
    

    render() {
        return (
            <Container maxWidth='lg'>
                <PageHeader 
                    title='Admin Member View'
                    subtitle={`TOTAL: ${this.state.members.length}`}
                />
                {this.state.isLoading ? <LinearProgress/> :
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <MUIDataTable 
                                data={
                                    this.state.members !== [] 
                                        ? this.state.members.map(member =>{return(member)})
                                        : []
                                }
                                columns={[
                                    { label: 'ID', name: '_id', options: {display: false, filter: false}},
                                    { label: 'Username', name: 'username'},
                                    { label: 'First Name', name: 'firstName'},
                                    { label: 'Last Name', name: 'lastName'},
                                    { label: 'Role', name: 'role'},
                                    {
                                        label: 'Is Active', name: 'isActive', options: {
                                            customBodyRenderLite: (dataIndex) => {
                                                return this.state.members[dataIndex].isActive === true ? 'Yes' : 'No'                                    }
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
