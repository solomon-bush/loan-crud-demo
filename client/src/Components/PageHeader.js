import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import BreadCrumbs from './BreadCrumbs'
import SplitButton from './SplitButton'

// action => {name: string, link: path}
// title => String
// subtitle => String

export default withRouter(class PageHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    handleAction = (link) => { 
        this.props.history.push({
            pathname: `${this.props.location.pathname}/${link}`
        })
    }
    renderAction = () => { 
        if (this.props.actions) {

            if (this.props.actions.length <= 1) {
                return (
                    <div style={{ position: 'absolute', right: 0, top: 0 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={this.props.actions[0].icon}
                            onClick={() => this.handleAction(this.props.actions[0].link)}>
                            {this.props.actions[0].name}
                        </Button>
                    </div >
                )
            } else {
                return <SplitButton actions={this.props.actions} />
            }
            
        } else { return null}
        
    }

    render() {
        return (
            <Box marginTop={3} marginBottom={3}>
                <Box marginTop={2} marginBottom={2}>
                    <BreadCrumbs />
                </Box>
                <Divider />
                <Box display='flex' width='100%' position='relative' marginTop={2}>
                    <Box>
                        <Typography variant='h4' >{this.props.title}</Typography>
                        <Typography variant='subtitle2'>{this.props.subtitle}</Typography>
                    </Box>
                    {this.renderAction()}
                </Box>
            </Box>
        )
    }
})