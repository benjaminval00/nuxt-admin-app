export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, "email")

  console.log("-> Email recibido en el servidor:", email)
  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'El email es requerido en la ruta.'
    })
  }

return await prisma.inscrito.findMany({
    where: { email: email.trim() },
    include: { evento: true },
    orderBy: { id: 'desc' }
  })
})
