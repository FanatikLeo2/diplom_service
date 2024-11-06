import { useDispatch, useSelector } from "react-redux";
import './SignIn.css'
import { useEffect, useState } from "react";
import { login, getUser } from "../../reducers/currentUserReducer/login";
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const reduxState = useSelector(state => state.user)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleLogin = async() => {
        setLoading(true);
        const result = await dispatch(login(username, password));
        await sleep(1000);
        setLoading(false);
        if (localStorage.getItem('silantToken')) {
            setIsLogged(true);
            window.location.reload();
            console.log(localStorage.getItem('silantToken'))
            console.log(reduxState)
        }
    }

    const handleLogout = () => {
        navigate('/')
        localStorage.removeItem('silantToken');
        setIsLogged(false)
        window.location.reload();
    }

    return (
        
        <div className="signin-main-cont">
            {reduxState.id
            ?  
                <div>
                    <p>{reduxState.first_name} {reduxState.last_name} / {reduxState.groups_details[0]?.name}</p>
                    <button onClick = {handleLogout} className="signin-input">Выйти</button>
                </div>
            : 
                <div>
                    <p>Необходима авторизация</p>
                    <input
                        className="signin-input"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                    />
                    <input
                        className="signin-input"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <button onClick={handleLogin} className="signin-input" disabled={loading}>
                        {loading ? "Загрузка..." : "Войти"}
                    </button>
                </div>
            }
        </div>
    )    
}

export default SignIn;