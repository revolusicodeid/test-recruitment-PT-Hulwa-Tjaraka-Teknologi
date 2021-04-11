import React from 'react'
import {
  List, 
  ListItem, 
  ListItemIcon , 
  ListItemText,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import {capitalizeFirstLetter} from "../../Service/Util/String";

const MenuList = ({data}) => {
    const history = useHistory();
    return (
        <List>
          {data.map((item, index) => (
            item.access ? 
            (<ListItem button key={index} onClick={() => item.location === null ? toast.error("under maintenance") : history.push(`${item.location}`)}>
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={capitalizeFirstLetter(item.text)} />
            </ListItem>) :
            ""
          ))}
        </List>
    )
}
export default MenuList;
