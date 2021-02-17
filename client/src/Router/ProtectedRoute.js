import React, { Component } from 'react'
import {
    Route,
    Redirect,
} from "react-router-dom";

import {authPayload} from '../session'

export default class ProtectedRoute extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            auth: authPayload.value.auth,
            role: authPayload.value.role
        }
        this.subs = []
    }
    componentDidMount = () => {
        this.subs.push(authPayload.subscribe(
            authPayload=>this.setState({
                auth: authPayload.auth, 
                id: authPayload.id, 
                role: authPayload.role
            })
        ))
    }
    componentWillUnmount = () =>{
        this.subs.forEach(sub =>{ sub.unsubscribe() })  
    }

    render() {
        console.log(this.props)

        return (
            this.state.auth && ! this.props.rbac.includes(this.state.role) 
                ? <Redirect to='/unauthorized'/>
                :<Route
                {...this.props.rest}              
                render={(props) =>
                    this.state.auth
                        ?   <this.props.component {...props} />
                        :   <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: props.location }
                                }}
                            />
                }
            />
        )
    }
}
