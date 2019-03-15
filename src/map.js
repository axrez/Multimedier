import React from 'react';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/styles';
import EventIcon from '@material-ui/icons/LocalPlay';
import ParkingIcon from '@material-ui/icons/LocalParking';
import OfferIcon from '@material-ui/icons/LocalOffer';
import StoreIcon from '@material-ui/icons/StoreMallDirectory';

const apiKey = '';

const _default = {
    center:{
        lat: 55.405,
        lng: 11.355
    },
    zoom: 16
}


const useStyles = makeStyles({
    root: {
    },
    mapContent:{
        height:'100vh',
        width:'100%'
    },
    markerRoot:{
        position:"relative",
        transform: 'translateY(-55px)'
    },
    markerArrow:{
        zIndex:20,
        width:38,
        height:38,
        position:'absolute',
        bottom:-28,
        left:4,
        clipPath: 'polygon(0 0, 50% 50%, 100% 0)'
    },
    markerCircle:{
        borderRadius:'50%',
        background:"#fff",
        height:36,
        width:36,
        alignItems:'center',
        display:'flex',
        justifyContent:'center',
        border:'5px solid #fff',
        zIndex:21,
        position:'relative'
    }
  });

const Marker = props => {
    const {classes} = props;

    return(
        <div className={classes.markerRoot} onClick={props.onClick}>
            <div className={classes.markerArrow} style={{background: props.color}} />
            <div className={classes.markerCircle} style={{color:props.color, borderColor:props.color,}}>
                <props.icon color='inherit' />
            </div>
        </div>
    )
}

const map = props => {
    const classes = useStyles();
    return(
        <>
            <div style={{}}>
                <h3>Header</h3>
                <h4>Subheader</h4>
                <p>lorem25 </p>
            </div>
            <div className={classes.mapContent}>
                <GoogleMapReact
                    bootstrapURLKeys={{key:apiKey}}
                    defaultCenter={_default.center}
                    defaultZoom={_default.zoom}
                >
                    <Marker
                        lat={_default.center.lat}
                        lng={_default.center.lng}
                        icon={StoreIcon}
                        color='#33f'
                        classes={classes}
                    />

                </GoogleMapReact>
            </div>
        </>
    )
}

export default map;