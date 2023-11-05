import React, { useMemo } from 'react'
import 'react-calendar/dist/Calendar.css';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LeafletMouseEvent, Marker, } from 'leaflet';
import { MapContainer, TileLayer, Marker as MapMarker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import useGetBookingsByRefId from '../../../../hooks/bookings/useGetBookingsByRefId';
const icon = require('../../../../assets/marker/start.png');
const destination = require('../../../../assets/marker/destination.png')


export default function ViewDestinationMaps() {
    const originIcon = new L.Icon({
        iconUrl:icon,
        iconSize:[50,50]
    });
    const destinationIcon = new L.Icon({
        iconUrl:destination,
        iconSize:[50,50]
    })
    const {id} = useParams();
    const {data} = useGetBookingsByRefId({refId:id?id:''});
   const newOrigin =  [10.3055615,123.8563657];
   const displayStartMarker = useMemo(() => {
    if(!data){
        return;
    }
    const coord = data?.booking?.origin.split(',') as LatLngExpression;
    return (
        <MapMarker position={coord} icon={originIcon}/>
    )
    
   }, [data, originIcon])
   

   const displayDestinationMarker = useMemo(()=>{
    if(!data){
        return;
    }

    const coord = data?.booking?.destination.split(',') as LatLngExpression;
    return (
        <MapMarker position={coord} icon={destinationIcon}/>
    )
   },[data, destinationIcon]);

   const displayCenter = useMemo(()=>{
    if(!data){
        return;
    }
    const coord = data?.booking?.origin.split(',') as LatLngExpression;
    return (
        <MapContainer center={coord}  zoom={13} className=' z-0 p-28' >                    
        <TileLayer
            className=' w-full'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {displayStartMarker}
        {displayDestinationMarker}
        </MapContainer>
    
    )
   },[data?.booking?.destination,displayStartMarker,displayDestinationMarker])
   
  return (
    <>
        {displayCenter}
    </>
    )
}
