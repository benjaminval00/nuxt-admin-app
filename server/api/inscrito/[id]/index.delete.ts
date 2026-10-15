export default defineEventHandler(async (event) => {
    const params = event.context.params || {}
    let id = params.id || Object.values(params)[0]

    if (!id && event.node.req.url) {
        id = event.node.req.url.split('/').pop()
    }

    if (!id || isNaN(Number(id))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No se proporcionó el ID de la inscripción.'
        })
    }

    try {
        const inscripcionEliminada = await prisma.inscrito.delete({
            where: {
                id: parseInt(id as string)
            }
        })

        return {
            mensaje: 'Inscripción eliminada con éxito',
            registro: inscripcionEliminada
        }
        
    } catch (error) {
        console.error("Error en Prisma:", error)
        throw createError({
            statusCode: 500,
            statusMessage: 'No se pudo eliminar la inscripción en la base de datos.'
        })
    }
})