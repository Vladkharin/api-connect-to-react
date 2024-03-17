import {addAccess, deleteAccess, myFiles} from "../API/routes";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Success() {

    const {file_id} = useParams()
    const [accesses, setAccesses] = useState([])
    const [loading, setLoading] = useState([])
    const [form, setForm] = useState({
        email: ''
    })


    const fetchData = async () => {
        const data = await myFiles()
        for (const file of data) {
            if (file.file_id === file_id) {
                setAccesses(file.access)
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
        try {
            await addAccess(file_id, form)
        } catch (error) {
            console.log(error)
        }

        fetchData()
        setLoading(false)
    }

        if
    (!accesses)
    {
        return <div>Загружается</div>
    }
    return (
        <main className="main">
            <div className="responsive-wrapper">
                <div className="content">
                    <div className="content-panel content-panel--success">
                        <form className="success card" onSubmit={handleSubmit}>
                            <h3>Добавить права на файл</h3>
                            <label>Почта
                                <input type="email" name={'email'} onChange={handleChange}/>
                            </label>
                            <button className="base-button">Добавить</button>
                        </form>
                    </div>
                    <div className="content-main">
                        <div className="file-table">
                            <div className="file-table__row">
                                <div className="file-table__cell">Полное имя</div>
                                <div className="file-table__cell">Email</div>
                                <div className="file-table__cell"></div>
                            </div>
                            {accesses.map((item, index) => (
                                <div className="file-table__row" key={index}>
                                    <div className="file-table__cell">{item.fullname}</div>
                                    <div className="file-table__cell">{item.email}</div>
                                    <div className="file-table__cell">
                                        <button className="icon-button icon-button--delete" onClick={async () => {
                                            await deleteAccess(file_id, {email :item.email})
                                            fetchData()
                                        }}>
                                            <img src="/assets/img/delete.png" alt="icon"/>
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}