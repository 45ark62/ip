import {validateIp,addTileLayer,addOffset} from './helpers'
import { API_KEY } from './helpers/api-key.js'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon  from '../images/icon-location.svg'
const ipInput=document.querySelector('.search-bar__input')
const btn=document.querySelector('.search-bar__btn')

const ipInfo=document.querySelector('#ip')
const locationInfo=document.querySelector('#location')
const timezoneInfo=document.querySelector('#timezone')
const ispInfo=document.querySelector('#isp')
const mapArea =document.querySelector('.map')
const map=L.map(mapArea,{
    center:[51.505,-0.09],
    zoom:13,
    zoomControl:false,
})
const markerIcon=L.icon({
    iconUrl:icon,
    iconSize:[30,40],
   

})
addTileLayer(map)
L.marker([51.505,-0.09],{icon:markerIcon}).addTo(map)
btn.addEventListener('click',getData)
ipInput.addEventListener('keydown',handleKey)
function getData(){
    if(validateIp(ipInput.value)){
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipInput.value}`)
        .then(response=>response.json())
        .then(setInfo)
    }

}
function handleKey(evt){
    if(evt.key === 'Enter'){
        getData()
    }
}
function setInfo(mapData){
    const {lat,lng,country,region,timezone} =mapData.location
    console.log(mapData)
    ipInfo.innerText=mapData.ip
    locationInfo.innerText=country + " "+ region
    timezoneInfo.innerText=timezone
    ispInfo.innerHTML=mapData.isp

    map.setView([lat,lng])
    L.marker([lat,lng],{icon:markerIcon}).addTo(map)
    if (matchMedia('(max-width:1023px)').matches){
        addOffset(map)
    }
    
}
document.addEventListener('DOMContentLoaded',()=>{
    ipInput.value='217.29.49.255'
    getData().then(setInfo)
})