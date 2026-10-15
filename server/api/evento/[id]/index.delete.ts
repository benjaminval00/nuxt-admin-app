export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '', 10)

    if (isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: "ID inválido." })
    }

    await prisma.evento.delete({
        where: { id }
    })

    return { ok: true }
})