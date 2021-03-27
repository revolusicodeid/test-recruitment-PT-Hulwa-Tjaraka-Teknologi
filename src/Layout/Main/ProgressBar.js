import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useMyStyles = makeStyles(() => ({
    root: {
        width: '100%',
      },
    backenabled: {
        padding : 0,
        margin: 0,
        position: 'absolute',
        top:0,
        left:0,
        height: '100vh',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        visibility: 'visible',
        display: 'flex',
        justifyContent:'center',
        alignItems: "center",
    },
    backdisabled: {
        visibility: 'hidden',
    },
  }));

const ProgressBar = (props) => {
    const {showProgress } = props;
    const classes = useMyStyles();
    
    return (
        <div className={showProgress ? classes.backenabled : classes.backdisabled}>
            <CircularProgress />
        </div>
    )
}

export default ProgressBar;
