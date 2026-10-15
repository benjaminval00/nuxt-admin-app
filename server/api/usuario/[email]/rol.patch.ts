export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, "email");
  const { rol } = await readBody(event);

  const usuarioExiste = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!usuarioExiste) {
    throw createError({ statusCode: 404, statusMessage: "Usuario no encontrado" });
  }

  await prisma.usuario.update({
    where: { email },
    data: { rol },
  });

  return { ok: true };
});