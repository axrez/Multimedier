import React from 'react';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/styles';
import EventIcon from '@material-ui/icons/LocalPlay';
import ParkingIcon from '@material-ui/icons/LocalParking';
import OfferIcon from '@material-ui/icons/LocalOffer';
import StoreIcon from '@material-ui/icons/StoreMallDirectory';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/ExpandMore';
import PlaceholderImage from './placeholder-image.png';

const apiKey = '';
const googleMapDir = ({lat,lng}) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

const _default = {
    center:{
        lat: 55.405,
        lng: 11.355
    },
    zoom: 16
}


const markerTypes = {
    store:{
        icon:StoreIcon,
        color:'#33f'
    },
    parking:{
        icon:ParkingIcon,
        color:'#44c'
    },
    event:{
        icon:EventIcon,
        color:'#f3f'
    },
    offer:{
        icon:OfferIcon,
        color:'#ee3'
    }
}

const Markers = [
    {
        ...markerTypes.store,
        header:'Shop',
        subheader:'The best shop',
        body:'Swag shop, buy for big money',
        lat: 55.405,
        lng:11.355,
        image:PlaceholderImage
    },
    {
        ...markerTypes.parking,
        header:'Parking',
        subheader:'Parking for all!',
        body:'250 parkingspots!',
        lat: 55.405,
        lng:11.358,
        image:PlaceholderImage
    },
    {
        ...markerTypes.event,
        header:'Big event!',
        subheader:'Best event i the world!!!',
        body:'Price: 5kr',
        lat: 55.407,
        lng:11.354,
        image:PlaceholderImage
    },
    {
        ...markerTypes.offer,
        header:'Best Offer!',
        subheader:'- 100%, all is FREE!',
        body:'Discount: 100%',
        lat: 55.406,
        lng:11.3555,
        image:PlaceholderImage
    },
]

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
    locationMarker:{
        width:14,
        height:14,
        borderRadius:'50%',
        background:'#00f',
        border:'3px solid #fff'
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
    },
    display:{
        animation:"opening 300ms linear",
        position:"absolute",
        top:0,
        left:0,
        right:0,
        bottom:0,
        background:"#fff",
        zIndex:100,
        maxWidth:600,
        margin:"auto",
        textAlign:"center",
        "& h3":{
            fontSize: 46,
            margin: '1rem 0',
            fontWeight:500
        },
        "& h4":{
            fontSize:26,
            margin:'1.25rem 0',
            fontWeight:400
        },
    },
    nav:{
        background:"#00000022",
        padding:'6px 28px',
        display:"flex",
        justifyContent:"flex-end"
    },
    displayImage:{
        maxWidth:'100%',
        margin:'auto'
    },
    displayFooter:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        padding:15
    },
    directionButton:{
        display:'inline-block',
        padding: '16px 42px',
        fontSize: 21,
        borderRadius:'32px',
        textDecoration: 'none',
        margin:'auto',
        color:'#fff',   
        background:'#33f',
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

const LocationMarker = props => {
    const {classes} = props;

    return(
        <div className={classes.locationMarker} />
    )
}

const getGeoLocation = cb => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                cb(position.coords);
            }
        )
    }else{
        cb(undefined);
    }
}

const map = props => {
    const classes = useStyles();
    const [display,setDisplay] = React.useState(null);
    const [location,setLocation] = React.useState();

    React.useEffect(()=>{
        getGeoLocation(coords => {
            setLocation(coords);
        })
    },[]);

    const onClose = e => {
        setDisplay(null);
    }

    const ShowDisplay = e => event => {
        setDisplay(e);   
    }

    return(
        <div className={classes.root}>
            {display &&
                <Display
                    item={display}
                    classes={classes}
                    onClose={onClose}
                    />}
            <div className={classes.mapContent}>
                <GoogleMapReact
                    bootstrapURLKeys={{key:apiKey}}
                    defaultCenter={_default.center}
                    defaultZoom={_default.zoom}
                >
                    {location && <LocationMarker
                        lat={location.latitude}
                        lng={location.longitude}
                        classes={classes}
                    />}

                    {Markers.map((e,i) => 
                        <Marker
                            key={i}
                            {...e}
                            onClick={ShowDisplay(e)}
                            classes={classes}
                        />
                    )}
                </GoogleMapReact>
            </div>
        </div>
    )
}

const Display = props => {
    const {classes,item} = props;
    const {header,subheader,body} = item;

    return(
        <div className={classes.display}>
            <div className={classes.nav}>
                <IconButton onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <h3>{header}</h3>
            <h4>{subheader}</h4>
            {item.image && <img className={classes.displayImage} src={item.image} alt="display" />}
            <p>{body}</p>
            <div className={classes.displayFooter}>
                <a className={classes.directionButton} target='_blank' rel="noopener noreferrer" href={googleMapDir(item)}>Get directions</a>
            </div>
        </div>
    )
}

export default map;