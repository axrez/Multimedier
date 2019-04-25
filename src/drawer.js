import React from 'react';
import { makeStyles } from '@material-ui/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    button:{
      position:'absolute',
      left:12,
      top:12,
      zIndex:100,
      background:'#fff',
      borderRadius:24,
      display:'flex',
      alignItems: 'center',
      paddingRight:24,
      cursor:'pointer'
    }
  });
  

const Drawer = props => {

    const classes = useStyles();
    const [isOpen,setIsOpen] = React.useState(false);
  
  
  const sideList = (
      <div className={classes.list}>
        <List>
            <ListItem>
                <ListItemText primary='Liste' />
            </ListItem>
            <Divider />
            {[{name:'Butikker',type:'store'},{name:'Events',type:'event'},{name:'Cafeer',type:'cafe'}].map((e, index) => (
            <ListItem button key={index} onClick={()=>props.onClick(e)}>
                <ListItemText primary={e.name} />
            </ListItem>
            ))}
        </List>
    </div>
  );
  

  return (
    <>
        <div className={classes.button} onClick={()=>setIsOpen(true)}>
            <IconButton aria-label="Menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="button" >Liste</Typography>
        </div>
      <SwipeableDrawer
        open={isOpen}
        onClose={()=>setIsOpen(false)}
        onOpen={()=>setIsOpen(true)}
        >
        <div
          tabIndex={0}
          onClick={()=>setIsOpen(false)}
          onKeyDown={()=>setIsOpen(false)}
          >
          {sideList}
        </div>
      </SwipeableDrawer>

    </>
  );
}

export default Drawer;