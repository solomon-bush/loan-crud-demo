
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


export default withRouter(class SplitButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            anchorEl: null,
            isOpen: false
        }
    }
    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget, isOpen: true})

    };
    handleClose = () => {
        this.setState({anchorEl: null, isOpen: false})

    };
    handleAction = (link) => {
        this.props.history.push({
            pathname: `${this.props.location.pathname}/${link}`
        })
    }

    renderActions = () => { 
        if (this.props.actions) {
            return this.props.actions.map((v, i) => { 
                return <Button
                            key={i}
                            id={i}
                            style={{justifyContent: 'space-between'}}
                            fullWidth
                            endIcon={v.icon}
                            onClick={() => this.handleAction(v.link)}>
                            {v.name}
                        </Button>
            })
        }
        else { 
            return 'Error: No Actions'
        }
    }


    render() {
        return (
            <div style={{ position: 'absolute', right: 0, top: 0 }}>
                <Button variant="contained" color="primary" onClick={this.handleClick} endIcon={<ArrowDropDownIcon />}>
                    Actions
                </Button>
                <Popover
                    open={this.state.isOpen}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <ButtonGroup orientation='vertical' >
                        { this.renderActions()}
                    </ButtonGroup>
                </Popover>
            </div>
        )
    }
})