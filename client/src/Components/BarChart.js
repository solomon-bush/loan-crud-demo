import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';

const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
    },
});
const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
    };
  }

  render() {
    const { data: chartData } = this.state;
    if(!this.state.data){
        return null
    }else{
        return (
            <Paper>
                <Chart
                data={chartData}
                >
                <ArgumentScale factory={scaleBand} />
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                    valueField="totalLend"
                    argumentField="variant"
                    name="Total Loan Ammount"
                />
                <BarSeries
                    valueField="totalOutstanding"
                    argumentField="variant"
                    name="Total Outstanding"
                />
                <BarSeries
                    valueField="totalCollect"
                    argumentField="variant"
                    name="Total Collected"
                />
                <Stack />
                <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                <Title text={this.props.title} />
                </Chart>
            </Paper>
            );
        }
    }
}