const API_URL = 'http://laravel4/api-file'

const f =  async (method, url, data= null, blob= null) => {
    let formData = null

    if ( data instanceof FormData) {
        formData = data
    } else if (data) {
        formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }
    }

    const token = localStorage.getItem('auth-token')

    const options = {
        method,
        headers: {
            'Accept-Control-Allow-Origin' : '*',
            'Authorization' : 'Bearer ' + token
        }
    }

    // Vlad

    if ( method === 'PATCH' || method === 'DELETE'){
        options.body = JSON.stringify(data)
        options.headers['Content-type'] = 'application/json'
    } else if (formData){
        options.body = formData
    }

    const response = await fetch(API_URL + url, options)

    if (blob) {
        return await response.blob()
    }

    try {
        return await response.json()
    }catch (error) {
        console.log(error)
    }
}

export async function registration(data) {
    return await f('POST', '/registration', data)
}
export async function login(data) {
    return await f('POST', '/authorization', data)
}
export async function logout(){
    return await f('GET', '/logout')
}
export async function loadFiles(data){
    return await f('POST', '/files', data)
}

export async function download(fileId) {
    return await f('GET', `/file/${fileId}`, null, true)
}

export async function myFiles() {
    return await f('GET', '/files/disk')
}

export async function deleteFile(fileId) {
    return await f('DELETE' ,`/files/${fileId}`)
}

export async function editFiles(fileId, data) {
    return await f('PATCH', `/files/${fileId}`, data)
}

export async function addAccess(fileId, data) {
    return await f('POST', `/files/${fileId}/accesses`, data)
}

export async function deleteAccess(fileId, data) {
    return await f('DELETE', `/files/${fileId}/accesses`, data)
}

export async function sharedFiles() {
    return await f('GET', '/shared')
}
