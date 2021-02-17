import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from 'react-router-dom'

// This was taken from a personal repo of Solomon Bush
// Do not use or reproduce without consent. 

export default class BreadCrumbs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            crumbs: [],
            currentPath: ''
        }
    }
    componentDidMount() {
        this.generateCrumbs()
    }
    componentDidUpdate() {
        if (this.state.currentPath !== window.location.pathname) { 
            this.generateCrumbs()
        }
    }

    generateCrumbs = () => {
        let currentPath = window.location.pathname
        let currentLocation = window.location.pathname.split('/').slice(1);
        let crumbs = [];
        for (var i = 0; i < currentLocation.length; i++) {
            let crumb = currentLocation[i];
            let text = crumb.toUpperCase();
            let link = '/' + currentLocation.slice(0, i + 1).join('/');
            crumbs.push({ "text": text, "link": link });
        }
        this.setState({ crumbs, currentPath })
    }
    render() {

        return (
            <Breadcrumbs aria-label="breadcrumb">
                {this.state.crumbs.map(crumb => {
                    return `${crumb.link}` === window.location.pathname ?
                        <Typography key={crumb.link} color="textPrimary">{crumb.text}</Typography> :
                        <Link key={crumb.link} color="inherit" to={`${crumb.link}`}>
                            {crumb.text}
                        </Link>
                })}
            </Breadcrumbs>
        );
    }
}