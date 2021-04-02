import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Typography 
} from '@material-ui/core';
const useStyles = makeStyles({
  chart_item: {
    margin : '0 20px 40px 20px'
  },

});

const BenefitChart = (data) => {
    const classes = useStyles();
    const labels = data.data.map(items=>items.label);
    const bg_color = data.data.map(items=>items.bg_color);
    const ho_color = data.data.map(items=>items.ho_color);
    const data_val = data.data.map(items=>items.data_val);
    const chart_data = {
        labels : labels,
        datasets : [
            {
                data : data_val,
                backgroundColor: bg_color,
                hoverBackgroundColor: ho_color
            }
        ]
    }
    
    return (
        <div className={classes.chart_item}>
            <Typography variant="h5" noWrap>
                Benefit Report
            </Typography>
            <Doughnut data={chart_data} />
        </div>
    )
}

export default BenefitChart;
