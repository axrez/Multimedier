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

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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


const skålImg = 'https://bentbrandt.imgix.net/11323521/11323521_1.jpg?max-h=75&max-w=400&modified=1900-01-01T00:00:00.0000000';
const kopImg = 'https://shop0851.hstatic.dk/upload_dir/shop/kop-chubby-chubbykop-blaa.jpg';
const kandeImg = 'https://www.royalcopenhagen.com/rc/mediaweb/?context=cmN8aW1hZ2VzfDQyMjc5MHxpbWFnZS9wbmd8aW1hZ2VzL2g2Zi9oMTEvODgwNDU5ODQ4MDkyNi5wbmd8YTI0ZDY3NDc2MTFhYzM3NTUwOTUxODhmYmNhNDFlZTYxZWQzZTkzNWMzOTE1ZTc4MTNhMmNmZDA0ZTc4MGQyZA';

const Markers = [
    {
        ...markerTypes.store,
        header:'Bahne',
        address:'Galleriet Slagelse, Nytorv 9D',
        openingHours: '8:00 - 16:00',
        body: classes =>
            (<div className={classes.grid}>
                <GridList className={classes.gridList}>
                  {[{img:skålImg,title:'SKÅL!!!'},{img:kopImg,title:'KOP!!!'},{img:kandeImg,title:'KANDE!!!'}].map(tile => (
                    <GridListTile key={tile.img}>
                      <img src={tile.img} alt={tile.title} />
                      <GridListTileBar
                        title={tile.title}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </div>),
        lat: 55.4045,
        lng:11.354,
        image:'https://lh5.googleusercontent.com/p/AF1QipNgkUS-_0rJyBHKgtZc98nqUg6hHIoCO2Z2Miid=w408-h306-k-no'
    },
    {
        ...markerTypes.parking,
        header:'Parking',
        body:'250 parkingspots!',
        lat: 55.405,
        lng:11.358,
        image:PlaceholderImage
    },
    {
        ...markerTypes.event,
        header:'Big event!',
        body:'Price: 5kr',
        lat: 55.407,
        lng:11.354,
        image:PlaceholderImage
    },
    {
        ...markerTypes.offer,
        header:'Best Offer!',
        body:'Discount: 100%',
        lat: 55.406,
        lng:11.3555,
        image:PlaceholderImage
    },
]

const useStyles = makeStyles(theme => ({
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
        "& h4":{
            fontSize:26,
            margin:'1.25rem 0',
            fontWeight:400
        },
    },
    nav:{
        padding:'6px 28px',
        display:"flex",
        justifyContent:"space-between"
    },
    displayHeader:{
        fontSize:32,
        margin: '1rem 0',
        fontWeight:400
    },
    displayImage:{
        height: 300,
        objectFit: 'cover',
        width: '100%'
    },
    displayFooter:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        padding:15
    },
    directionButton:{
        // display:'inline-block',
        // padding: '16px 42px',
        fontSize: 21,
        // borderRadius:'32px',
        textDecoration: 'none',
        // margin:'auto',
        // color:'#fff',   
        // background:'#33f',
    },
    displayContent:{
        padding: 24
    },

    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        'ul&':{
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        }
    },
    title: {
        // color: theme.palette.primary.light,
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
  }));

const Marker = props => {
    const {classes} = props;

    return (
        <div className={classes.markerRoot} onClick={props.onClick}>
            <div className={classes.markerArrow} style={{ background: props.color }} />
            <div className={classes.markerCircle} style={{ color: props.color, borderColor: props.color, }}>
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
    const {header,body} = item;

    return(
        <div className={classes.display}>
            <div className={classes.nav}>
                <h3 className={classes.displayHeader}>{header}</h3>
                <IconButton onClick={props.onClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            
            {item.image && <img className={classes.displayImage} src={item.image} alt="display" />}
            <div className={classes.displayContent}>
                <a className={classes.directionButton} target='_blank' rel="noopener noreferrer" href={googleMapDir(item)}>{item.address}</a>
                <p>Åbningstid: {item.openingHours}</p>
                {typeof(body) == 'function' ? body(classes) : body}
            </div>
        </div>
    )
}

export default map;