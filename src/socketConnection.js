import { io } from 'socket.io-client'
import React from 'react'
// import socket io client and react for the context
// only variables prefixed with VITE_ are exposed to the meta env import for vite !
const { VITE_LOCALAPIURL, VITE_REMOTEAPIURL, VITE_SECRET } = import.meta.env 
// get urls from .env
let socket = null
const options = {
	addTrailingSlash: true,
	auth: { secret: VITE_SECRET },
}
//detect whether we are on localhost 
if(!socket){
    if (
			location.hostname === 'localhost' ||
			location.hostname === '127.0.0.1'
		) {
			// if so we are in dev and we should use the local api url
			console.log('Using local')
			socket = io(VITE_LOCALAPIURL, options)
		} else {
			// otherwise we are in prod and we should use the remote api url
			console.log('Using remote')
			socket = io(VITE_REMOTEAPIURL, options)
		}

		socket.on('error', (data) => {
			console.log(data)
		})

}

const SocketContext = React.createContext()

export{socket, SocketContext}