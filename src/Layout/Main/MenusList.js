import React, { Fragment } from 'react'
import { 
    makeStyles,
    Divider, 
    Typography,
} from '@material-ui/core'
import MenuList from './MenuList'
import {capitalizeLetter,capitalizeFirstLetter} from "../../Service/Util/String";

const useStyles = makeStyles( () => ({
    title_menu: {
        backgroundColor:"#2c2c2c",
        paddingLeft: 20
    },
    
  }));

const MenusList = ({data}) => {
    const classes = useStyles();
    return (
        <Fragment>
            {
                data.map((item,index) => (
                    <Fragment>
                    <Divider key={index} />
                    <Typography 
                    className={classes.title_menu} 
                    variant="h6" 
                    noWrap>
                        {item.text === "hrd" || item.text === "crm" ? 
                        capitalizeLetter(item.text) : 
                        capitalizeFirstLetter(item.text)}
                    </Typography>
                    <MenuList data={item.menu}/>
                    </Fragment>
                ))
            }
        </Fragment>
    )
}

export default MenusList;
