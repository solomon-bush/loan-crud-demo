import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Card, CardActions, CardHeader,CardContent, Container } from '@material-ui/core'
import {logout} from '../session'

export default withRouter(class Unauthorized extends Component {
    render() {
        return (
            <Container maxWidth='sm' style={{marginTop: '20vh'}}>
                <Card>
                    <CardHeader title='You are not authorized to view this page'/>
                    <CardContent>
                        If you have found this page by accident... Leave and tell no one
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' onClick={() =>{
                            this.props.history.push('/')
                        }}>
                            Home
                        </Button>
                        <Button onClick={() =>{
                            logout()
                            this.props.history.push('/')
                        }}>
                            Logout
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        )
    }
}) 
