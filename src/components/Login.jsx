import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../API/routes";


export default function Login(){

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const data = await login(form)

        if (data.success){
            localStorage.setItem('auth-token', data.token)
            navigate('/my-files')
            window.location.reload()
        } else {
            setError(data.message[0])
        }

        setLoading(false)
    }

    return(
        <main className="main">
            <div className="responsive-wrapper">
                <h1>Вход в систему</h1>
                <form className="registration card" onSubmit={handleSubmit}>
                    <label>Почта
                        <input type="email" name={'email'} value={form.email} onChange={handleChange}/>
                    </label>
                    <label>Пароль
                        <input type="password" name={'password'} value={form.password} onChange={handleChange}/>
                    </label>
                    <label>
                        {error ? error : ''}
                    </label>
                    <button className="base-button" disabled={loading}>Войти</button>
                </form>
            </div>
        </main>
    )
}