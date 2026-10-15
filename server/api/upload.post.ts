import { promises as fs } from 'node:fs'

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)
    
    console.log("FormData recibido en el servidor:", formData)
    if (!formData || formData.length === 0) {
        throw createError({ statusCode: 400, statusMessage: 'No hay archivo.' })
    }

    const archivo = formData[0]
    if (!archivo || !archivo.filename) {
        throw createError({ statusCode: 400, statusMessage: 'Archivo inválido.' })
    }

    const nombreArchivo = 'evento-' + Date.now() + '-' + archivo.filename.replace(/[^a-zA-Z0-9.]/g, '')
    const uploadPath = './public/uploads'

    await fs.mkdir(uploadPath, { recursive: true })
    await fs.writeFile(uploadPath + '/' + nombreArchivo, archivo.data)

    return {
        url: '/uploads/' + nombreArchivo
    }
})