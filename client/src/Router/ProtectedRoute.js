import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

export default class ProtectedRoute extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            auth: null
        }
    }
    
    
    componentDidMount(){

    }

    render() {
        return (
            null
        )
    }
}
