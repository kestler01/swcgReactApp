import {socket} from './socketConnection'

// emit type must be a string matching the socket emit listed in the server
// data must be an anonymous object containing all relevant properties
const isSocketPromiseOk = async function( emitType, data){
    const res = await new Promise((resolve) => {socket.emit(emitType, data, res => resolve(res))})
    if(res.status === 'ok'){
        return(res)
    } else { 
        return(false) // server currently will throw it's own error and emit an error event that is handled separately 
    }
}

export default isSocketPromiseOk