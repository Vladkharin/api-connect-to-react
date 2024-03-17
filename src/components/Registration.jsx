import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {registration} from "../API/routes";


export default function Registration(){

    const [form, setForm] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    })

    const [errors, setErrors] = useState([])
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

        const data = await  registration(form)

        if (data.success){
            localStorage.setItem('auth-token', data.token)
            navigate('/my-files')
            window.location.reload()
        } else {
            setErrors(data.message)
        }

        setLoading(false)
    }
    return (
        <main className="main">
            <div className="responsive-wrapper">
                <h1>Регистрация</h1>
                <form className="registration card" onSubmit={handleSubmit}>
                    <label>Фамилия
                        <input type="text" name={'last_name'} value={form.last_name} onChange={handleChange}/>
                    </label>
                    <label>
                        {errors ? errors.last_name : ''}
                    </label>
                    <label>Имя
                        <input type="text" name={'first_name'} value={form.first_name} onChange={handleChange}/>
                    </label>
                    <label>
                        {errors ? errors.first_name : ''}
                    </label>
                    <label>Почта
                        <input type="email" name={'email'} value={form.email} onChange={handleChange}/>
                    </label>
                    <label>
                        {errors ? errors.email : ''}
                    </label>
                    <label>Пароль
                        <input type="password" name={'password'} value={form.password} onChange={handleChange}/>
                    </label>
                    <label>
                        {errors ? errors.password : ''}
                    </label>
                    <button className="base-button" disabled={loading}>Зарегистрироваться</button>
                </form>
            </div>
        </main>
    )
}