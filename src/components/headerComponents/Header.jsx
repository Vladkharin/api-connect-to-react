import {Link} from "react-router-dom";
import Nav from './Nav'


export default function Header({isAuth}){
    return (
        <header className="header">
            <div className="header-content responsive-wrapper">
                <div className="header-logo">
                    <a href="#">
                        <h3>File cloud</h3>
                    </a>
                </div>
                <div className="header-navigation">
                    <Nav isAuth={isAuth}/>
                </div>
                <a href="#" className="button">
                    <i className="ph-list-bold"></i>
                    <span>Menu</span>
                </a>
            </div>
        </header>
    )
}