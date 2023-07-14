import { io } from 'socket.io-client'
//import socket io client 

const { VITE_LOCALAPIURL, VITE_REMOTEAPIURL } = import.meta.env 
// get urls from .env
let socket = null
const options = {
    addTrailingSlash: true
}
//detect whether we are on localhost 
if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
    // if so we are in dev and we should use the local api url
    console.log("Using local")
    socket = io(VITE_LOCALAPIURL, options)
} else {
    // otherwise we are in prod and we should use the remote api url
    console.log('Using remote')
    socket = io(VITE_REMOTEAPIURL, options)
}

export default socket