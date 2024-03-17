import {useNavigate, useParams} from "react-router-dom";
import {editFiles, myFiles} from "../API/routes";
import {useEffect, useState} from "react";


export default function Edit() {

    const {file_id} = useParams()
    const [item, setItem] = useState({})
    const [form, setForm] = useState({
        name: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const fetchData = async () => {
        const data = await myFiles()
        for (const file of data) {
            if(file.file_id === file_id){
                setItem(file)
                setForm({
                    name: file.name
                })
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [file_id]);

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const data = await editFiles(file_id, form)

        if(data.success) {
            navigate('/my-files')
        } else {
            setError(data.message.name[0])
        }

        setLoading(false)
    }

    if (!item) {
        return <div>Загружается</div>
    }
    console.log(item)
    console.log(form)
    return (
        <main className="main">
            <div className="responsive-wrapper">
                <h1>Файл {item.name}</h1>
                <form className="registration card" onSubmit={handleSubmit}>
                    <label>Имя
                        <input type="name" name={'name'} value={form.name} onChange={handleChange}/>
                    </label>
                    <label>
                        {error ? error : ''}
                    </label>
                    <button className="base-button" disabled={loading}>Обновить</button>
                </form>
            </div>
        </main>
    )
}