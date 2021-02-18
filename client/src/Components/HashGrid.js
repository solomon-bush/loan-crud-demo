import React, { Component } from 'react'

//MAT-UI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider  from '@material-ui/core/Divider'
import Card  from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'


export default class HashGrid extends Component {
    constructor(props) {
        super(props)
        this.hiddenDetails = this.props.hiddenDetails || []
    }

    
    render() {
        return (
            
            <React.Fragment>
                    {this.props.data !== null ?
                        Object.entries(this.props.data).map(i => {
                            return (
                                this.hiddenDetails.includes(i[0]) ?
                                null : 
                                <React.Fragment key={i[0]}>
                                    <Grid container>
                                        <Grid item xs={5}>
                                            <Typography variant='body1' color='textSecondary'>
                                                {i[0].toUpperCase()}</Typography>
                                    
                                        </Grid>
                                        <Grid item xs={1}><Divider orientation="vertical" /></Grid>
                                        <Grid item xs={6}>
                                            
                                            <Typography variant='body2' >{'boolean' === typeof(i[1]) ? String(i[1]) : i[1] || '-'}</Typography>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                        )})
                    : 'n/a'}
            </React.Fragment>
        )
    }
}