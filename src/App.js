import {BrowserRouter, Route, Routes} from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import LoadFiles from "./components/LoadFiles";
import MyFiles from "./components/MyFiles";
import Header from "./components/headerComponents/Header";
import {useEffect, useState} from "react";
import MySharedFiles from "./components/MySharedFiles";
import Edit from "./components/Edit";
import Success from "./components/Success";

function App() {

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        if (token) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, []);
    return (
        <BrowserRouter>
            <Header isAuth={isAuth}/>
            <Routes>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/load-files'} element={<LoadFiles/>}/>
                <Route path={'/my-files'} element={<MyFiles/>}/>
                <Route path={'/my-shared-files'} element={<MySharedFiles/>}/>
                <Route path={'/edit/:file_id'} element={<Edit/>}/>
                <Route path={'/files/:file_id/accesses'} element={<Success/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
