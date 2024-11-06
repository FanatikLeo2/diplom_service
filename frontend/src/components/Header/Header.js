import './Header.css';
import SignIn from "../SignIn/SignIn";
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = function() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate('/');
    };

    const isHomePage = location.pathname === '/';

    return (
        <>
            <div className="main-header-cont">
                <div className="header-top-cont">
                    <img className="logo" src={require("./icon/Logotype-accent-RGB-2.jpg")} alt="silant logo"/>
                    <div className="teleg-cont">
                        <span>+7-8352 20-12-09, </span><span>telegram</span>
                    </div>
                    <div className="sign-in-btn-cont">
                        <SignIn />
                    </div>
                </div>
                {!isHomePage && <button onClick={handleClick}>На главную</button>}
                <div className="header-bottom-cont">
                    Электронная сервисная книжка "Мой Силант"
                </div>
            </div>
        </>
    );
}