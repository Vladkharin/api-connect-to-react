import {useState} from "react";
import {download, loadFiles} from "../API/routes";


export default function LoadFiles(){

    const [formData, setFormData] = useState(null)
    const [fileList, setFileList] = useState([])
    const [prepareFiles, setPrepareFiles] = useState([])
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        const fd = new FormData()
        const array = []

        for (const file of e.target.files){
            fd.append('files[]', file)
            array.push(file)
        }

        setFormData(fd)
        setPrepareFiles(array)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        setFileList(await loadFiles(formData))

        setLoading(true)
    }
    return(
        <main className="main">
            <div className="responsive-wrapper">
                <h1>Загрузить файлы</h1>
                <div className="content">
                    <div className="content-panel content-panel--success">
                        <form className="success card" onSubmit={handleSubmit}>
                            <div className="file-loader">
                                <label>Перетащите файлы сюда
                                    <input type="file" name={'files'} multiple onChange={handleChange}/>
                                </label>
                            </div>
                            <div className="file-table">
                                {prepareFiles.map((item, index) => (
                                    <div className="file-table__row" key={index}>
                                        <div className="file-table__cell">{item.name}</div>
                                    </div>
                                ))}

                            </div>
                            <button className="base-button">Загрузить файлы</button>
                        </form>
                    </div>
                    <div className="content-main">
                        <div className="file-table">
                            <div className="file-table__row">
                                <div className="file-table__cell">Имя файла</div>
                                <div className="file-table__cell">Загружен</div>
                                <div className="file-table__cell"></div>
                            </div>
                            {fileList.map((item, index) => (
                                <div className="file-table__row" key={index}>
                                    <div className="file-table__cell">{item.name}</div>
                                    <div className="file-table__cell">{item.success ? 'Да' : 'Нет'}</div>
                                    <div className="file-table__cell">
                                        <button className="icon-button" onClick={async () => {
                                            const data = await download(item.file_id)
                                            const file = window.URL.createObjectURL(data)
                                            window.location.assign(file)
                                        }}>
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