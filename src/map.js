import React from 'react';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/styles';
import EventIcon from '@material-ui/icons/LocalPlay';
import ParkingIcon from '@material-ui/icons/LocalParking';
import OfferIcon from '@material-ui/icons/LocalOffer';
import StoreIcon from '@material-ui/icons/StoreMallDirectory';
import CafeIcon from '@material-ui/icons/LocalCafe';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/ExpandMore';
import PlaceholderImage from './placeholder-image.png';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Drawer from './drawer';

const apiKey = 'AIzaSyAKYHrxqd8T3vIBnm3LrA5MWFfBt829EQ8';
const googleMapDir = ({lat,lng}) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

const _default = {
    center:{
        lat: 55.405,
        lng: 11.355
    },
    zoom: 16.5
}

const markerTypes = {
    store:{
        icon:StoreIcon,
        color:'#33f',
        type:'store'
    },
    parking:{
        icon:ParkingIcon,
        color:'#44c',
        type: 'parking'
    },
    event:{
        icon:EventIcon,
        color:'#f3f',
        type: 'event'
    },
    offer:{
        icon:OfferIcon,
        color:'#d6d60a',
        type: 'offer'
    },
    cafe:{
        icon:CafeIcon,
        color:'#583b03',
        type: 'cafe'
    }
}


//Menu
// - lists of event&store/offer


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
        lat: 55.4046037,
        lng:11.3548422,
        image:'https://lh5.googleusercontent.com/p/AF1QipNgkUS-_0rJyBHKgtZc98nqUg6hHIoCO2Z2Miid=w408-h306-k-no'
    },
    {
        ...markerTypes.store,
        header:'H&M',
        address:'Nytorv 9L, Slagelse',
        openingHours:'10:00 - 18:00',
        lat:55.4049316,
        lng:11.3546833,
        image:'https://lh5.googleusercontent.com/p/AF1QipMBo0kLQGCJf9vyiPTTiuYaFYlQfFKN6aqsJZni=w426-h240-k-no'
    },
    {
        ...markerTypes.store,
        header:'Rådhuspladsen Ure og Guld',
        address:'Rådhuspladsen 1, Slagelse',
        openingHours:'9:30 - 18:00',
        lat:55.404662,
        lng:11.3561981,
        image:'https://lh5.googleusercontent.com/p/AF1QipNmuEHPqQ_zhcnEjLwwur_XvTUzbNJPrgHQEIwV=w408-h408-k-no'
    },
    {
        ...markerTypes.store,
        header:'Matas',
        address:'Nytorv 4, Slagelse',
        openingHours:'10:00 - 18:00',
        lat:55.4038206,
        lng:11.355923,
        image:'https://lh5.googleusercontent.com/p/AF1QipN7QxDC5_sgz2qqg9N1yuk3aykJDwqNTFZjNAXL=w408-h306-k-no'
    },
    {
        ...markerTypes.parking,
        header:'Parkeringsplads',
        address:'Østerbro 4B, Slagelse',
        lat: 55.4071611,
        lng:11.3549093,
        image:'https://geo3.ggpht.com/cbk?panoid=gB8WKIk0X3X6B7Ej5bmkyg&output=thumbnail&cb_client=search.TACTILE.gps&thumb=2&w=408&h=240&yaw=263.39462&pitch=0&thumbfov=100'
    },
    {
        ...markerTypes.parking,
        header:'Rådhuspladsen',
        address:'Rådhuspladsen, Slagelse',
        lat: 55.4050892,
        lng:11.3567302,
        image:'https://lh5.googleusercontent.com/p/AF1QipNIJRxDnvIrDY6OCtbScEClbPjURFhQJ2xhXzrC=w426-h240-k-no'
    },
    {
        ...markerTypes.parking,
        header:'Parkeringsplads',
        address:'Træskogården 2, Slagelse',
        lat: 55.405955,
        lng:11.3519199
    },
    {
        ...markerTypes.event,
        header:'OplevelsesTorvet – med naturen i fokus',
        body:'Der er fokus på naturen og forskellige typer af naturoplevelser, når Forskningens Døgn rykker ind i VestsjællandsCentret fredag den 26. april.',
        address:'VestsjællandsCentret 10, Slagelse',
        lat: 55.4062739,
        lng:11.3547145,
        image:PlaceholderImage
    },
    {
        ...markerTypes.event,
        header:'Panorama Biograferne',
        address:'Træskogården 2, Slagelse',
        lat: 55.4061071,
        lng:11.35154,
        image:'https://lh5.googleusercontent.com/p/AF1QipP-Wq1rV3VxXVAadt5jfN9705eH4gSfbM-dIZ0B=w408-h725-k-no'
    },
    {
        ...markerTypes.event,
        header:'Lystanlægget Slagelse',
        address:'Parkvej, Slagelse',
        lat: 55.401601,
        lng:11.3602205,
        image:'https://lh5.googleusercontent.com/p/AF1QipMSAqMsuVjmCJ0DJ23zjjQLf60Uijo4_AP8Bud_=w426-h240-k-no'
    },
    {
        ...markerTypes.offer,
        header:'Bog & idé',
        body:'20% rabat på alle bog',
        openingHours:'10:00 - 19:00',
        address:'Jernbanegade 10a, st 10, Slagelse',
        lat: 55.406,
        lng:11.3555,
        image:'https://lh5.googleusercontent.com/p/AF1QipMUwMi2hGqj7phvFDXXCg4pTHPHkrMYhgCZz-4C=w410-h240-k-no'
    },
    {
        ...markerTypes.cafe,
        header:'Café Vivaldi',
        openingHours:'10:00 - 22:00',
        address:'Rosengade 6, Slagelse',
        lat:55.4036746,
        lng:11.3537165,
        image:'https://lh5.googleusercontent.com/p/AF1QipOFP5WTVMbad8VdvCog3qDNZ9ipedswdYb6uVM-=w530-h240-k-no'
    },
    {
        ...markerTypes.cafe,
        header:'Cafe Bella',
        openingHours:'11:00 - 22:00',
        address:'Casinotorvet 4 E, Slagelse',
        lat: 55.4054047,
        lng:11.3545352,
        image:'https://lh5.googleusercontent.com/p/AF1QipNDc5AUfg0KXFP0EBKPk9jNfCA9JZUqjGHPWWOT=w408-h306-k-no'
    },
    {
        ...markerTypes.cafe,
        header:'Café ZigZag',
        openingHours:'9:30 - 22:00',
        address:'Schweizerpladsen 3, Slagelse',
        lat: 55.4045019,
        lng:11.353177,
        image:'https://lh5.googleusercontent.com/p/AF1QipMsk-F09UUTtJrHrAuQnbvwflGGCztjSoamyKfS=w408-h272-k-no'
    },
    {
        ...markerTypes.cafe,
        header:'Café Caramel',
        openingHours:'9:30 - 22:00',
        address:'Schweizerpladsen 1B, Slagelse',
        lat: 55.4043275,
        lng:11.3531098,
        image:'https://lh5.googleusercontent.com/p/AF1QipOS9aX3I571VZgjrfgbZY-_y6eca5Gz19aAQX7q=w408-h272-k-no'
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
        transform: 'translate(-23px,-55px)'
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
        justifyContent:"space-between",
        alignItems: 'center'
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
        display:'block',
        // margin:'auto',
        // color:'#fff',   
        // background:'#33f',
        '& small':{
            whiteSpace: 'nowrap'
        }
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

    const ShowDisplayList = ({name,type}) => {
        const arr = Markers.filter(e => e.type === type);
        setDisplay({
            header:name,
            body:<List>
                {arr.map(e => <ListItem button >
                    <ListItemText primary={e.header} secondary={e.address} onClick={ShowDisplay(e)} />
                </ListItem>)}
            </List>
        })
    }

    return(
        <div className={classes.root}>
            <Drawer onClick={ShowDisplayList} />
            {display &&
                <Display
                    item={display}
                    classes={classes}
                    onClose={onClose}
                    />}
            <div className={classes.mapContent}>
                <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals 
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
                <div>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
            
            {item.image && <img className={classes.displayImage} src={item.image} alt="display" />}
            <div className={classes.displayContent}>
                {item.address && <a className={classes.directionButton} target='_blank' rel="noopener noreferrer" href={googleMapDir(item)}>{item.address} <small>(Vis vej)</small></a>}
                {item.openingHours && <p>Åbningstid: {item.openingHours}</p>}
                {typeof(body) == 'function' ? body(classes) : body}
            </div>
        </div>
    )
}

export default map;