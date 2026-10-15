export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '', 10)

    if (isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: "ID inválido." })
    }

    const inscritos = await prisma.inscrito.findMany({
        where: {
            eventoId: id
        },
        orderBy: {
            nombre: 'asc' 
        }
    })

    return inscritos
})