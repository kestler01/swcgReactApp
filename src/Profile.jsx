/* eslint-disable react/prop-types */
import { useState} from "react"

import isSocketPromiseOk from "./socketPromiseHelper.js"

const Profile = (props) => {
    const [profileChangeState, setProfileState] = useState('')
    const [psChangeState, setPSChangeState] = useState({
        password:'',
        newPassword:''
    })
    const {user, setUser} = props



    const handleInputChangePW= (event) => {
        setPSChangeState({
            ...psChangeState,
            [event.target.name]: event.target.value
        })
    }
    const handleInputChangeProfile = (event) => {
        setProfileState( event.target.value ) 
    }

    const handleChangePWSubmit = async (event) => {
        event.preventDefault()
        console.log('submitted pw change')
        const data = {...user, ...psChangeState }
        const resOk = await isSocketPromiseOk('changePassword',{...data})
        console.log(resOk)
        if(resOk) {
            setPSChangeState({
        password:'',
        newPassword:''
    })
        }
        
    }
    const handleChangeProfileNameSubmit = async (event) => {
        event.preventDefault()
        const data = {...user, newProfileName: profileChangeState}
        console.log('submitted profile change', data)
        const resOk = await isSocketPromiseOk('changeProfileName', {...data})
        if(resOk) {
            setProfileState('')
            setUser({...user, profileName: profileChangeState})
            
        }
    }

    return (
        <>
            <h4>profile name: </h4>
            <p>{user.profileName} </p>
            
            <form onSubmit={handleChangeProfileNameSubmit}>
                <label> change profile name :
                    <input type="text" name="newProfileName" onChange={handleInputChangeProfile} value={profileChangeState}/>
                </label>
                <button type='submit'>submit</button>
            </form>
            <br></br>
            <label> change password </label>
            <form onSubmit={handleChangePWSubmit}>
                <label> old password :
                    <input type="password" name="password" onChange={handleInputChangePW} value={psChangeState.password}/>
                </label>
                <br></br>
                <label> new password :
                    <input type="password" name="newPassword" onChange={handleInputChangePW}value={psChangeState.newPassword}/>
                </label>
                <button type='submit'>submit</button>

            </form>
        </>
    )
}

export default Profile