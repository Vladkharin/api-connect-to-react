import {Link, useNavigate} from "react-router-dom";
import {logout} from "../../API/routes";


export default function Nav({isAuth}) {

    const navigate = useNavigate()
    if(isAuth) {
        return (
            <nav className="header-navigation-links">
                <Link to={'/my-files'} children={'Мои файлы'}/>
                <Link to={'/my-shared-files'} children={'Чужие файлы'}/>
                <Link to={'/load-files'} children={'Загрузка файлов'}/>
                <a href={'#'} onClick={async () => {
                    await logout()
                    localStorage.removeItem('auth-token')
                    navigate('load-files')
                    window.location.reload()
                }}>Выход</a>
            </nav>
        )
    } else {
        return (
            <nav className="header-navigation-links">
                <Link to={'/registration'} children={'Регистрация'}/>
                <Link to={'/login'} children={'Вход в систему'}/>
                <Link to={'/load-files'} children={'Загрузка файлов'}/>
            </nav>
        )
    }
}