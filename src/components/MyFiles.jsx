import {useEffect, useState} from "react";
import {deleteFile, download, myFiles} from "../API/routes";
import {Link} from "react-router-dom";


export default function MyFiles(){

    const [fileList, setFileList] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        const data = await myFiles()
        setFileList(data)
    }

    useEffect(() => {
        fetchData()
    }, []);


    if(!fileList) {
        return <div>Загружается</div>
    }

    return(
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
                            <a href="#" className="active">Мои файлы</a>
                            <a href="#">Доступные файлы</a>
                        </div>
                    </div>
                    <div className="content-main">
                        <div className="file-table">
                            <div className="file-table__row">
                                <div className="file-table__cell">id</div>
                                <div className="file-table__cell">Имя файла</div>
                                <div className="file-table__cell"></div>
                            </div>
                            {fileList.map((item, index) => (
                                <div className="file-table__row" key={index}>
                                    <div className="file-table__cell">{item.file_id}</div>
                                    <div className="file-table__cell">{item.name}</div>
                                    <div className="file-table__cell">
                                        <button className="icon-button" onClick={async () => {
                                            const data = await download(item.file_id)
                                            console.log(data)
                                        }}>
                                            <img src="assets/img/download.png" alt="icon"/>
                                        </button>
                                        <button className="icon-button icon-button--secondary">
                                            <Link to={`/edit/${item.file_id}`}>
                                                <img src="assets/img/edit.png" alt="icon"/>
                                            </Link>
                                        </button>
                                        <button className="icon-button">
                                            <Link to={`/files/${item.file_id}/accesses`}>
                                                <img src="assets/img/user.png" alt="icon"/>
                                            </Link>
                                        </button>
                                        <button className="icon-button icon-button--delete" onClick={async () => {
                                            await deleteFile(item.file_id)
                                            await fetchData()
                                        }}>
                                            <img src="assets/img/delete.png" alt="icon"/>
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