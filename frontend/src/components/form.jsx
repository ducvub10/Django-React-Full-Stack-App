import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }){ //create from for login and register | route: url to send request to | method: login or register
    const[username, setUsername] = useState("") //state to store username
    const[password, setPassword] = useState("") //state to store password
    const [loading, setLoading] = useState(false) //state to store loading status
    const navigate = useNavigate() //useNavigate hook to navigate to different pages

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true) //set loading to true when form is submitted
        e.preventDefault()

        //send request to route
        try{
            const res = await api.post(route, {username, password}) //send post request to route with username and password
            if (method === "login"){ //if method is login
                localStorage.setItem(ACCESS_TOKEN, res.data.access) //store access token in local storage
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh) //store refresh token in local storage
                navigate("/") //navigate to home page
            }else{
                navigate("/login") //navigate to login page
            }
        
        }
        catch(error){
            alert(error)
        }finally{
            setLoading(false)
        }
    }
    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input 
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} //update username state when input changes
            placeholder="Username"
        />
        <input 
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} //update username state when input changes
            placeholder="Password"
        />
        {loading && <p>Loading...</p>}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}

export default Form
