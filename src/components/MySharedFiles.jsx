import {sharedFiles} from "../API/routes";
import {useEffect, useState} from "react";


export default function MySharedFiles() {

    const [items, setItems] = useState([])

    const fetchData = async () => {
        const data = await sharedFiles()
        setItems(data)
    }

    useEffect(() => {
        fetchData()
    }, []);

    console.log(items)
    return (
        <main className="main">
            <div className="responsive-wrapper">
                <h1>Список файлов пользователя</h1>
                <div className="content-header">
                    <div className="content-header-actions">
                        <a href="#" className="base-button">
                            <span>+ Загрузить файл </span>
                        </a>
                    </div>
                </div>
                <div className="content">
                    <div className="content-panel">
                        <div className="vertical-tabs">
                            <a href="#">Мои файлы</a>
                            <a href="#" className="active">Доступные файлы</a>
                        </div>
                    </div>
                    <div className="content-main">
                        <div className="file-table">
                            <div className="file-table__row">
                                <div className="file-table__cell">id</div>
                                <div className="file-table__cell">Имя файла</div>
                                <div className="file-table__cell"></div>
                            </div>
                            {items.map((item, index) => (
                                <div className="file-table__row" key={index}>
                                    <div className="file-table__cell">{item.file_id}</div>
                                    <div className="file-table__cell">{item.name}</div>
                                    <div className="file-table__cell">
                                        <button className="icon-button">
                                            <img src="assets/img/download.png" alt="icon"/>
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