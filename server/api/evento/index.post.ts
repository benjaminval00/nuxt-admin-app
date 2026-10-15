
export default defineEventHandler(async (event) => {
  const { titulo, lugar, fecha, valor, imagen } = await readBody(event);
  
  const tituloNormalizado = typeof titulo === 'string' ? titulo.trim() : '';
  const lugarNormalizado = typeof lugar === 'string' ? lugar.trim() : '';
  const fechaNormalizada = typeof fecha === 'string' ? fecha.trim() : '';
  const valorNumerico = Number(valor) || 0;
  
  const imagenNormalizada = typeof imagen === 'string' && imagen.trim() ? imagen.trim() : '/images/default-evento.jpg';
  
  if (!tituloNormalizado || !lugarNormalizado || !fechaNormalizada) {
    throw createError({
        statusCode: 400,
        statusMessage: "El título, el lugar y la fecha son obligatorios."
    });
  }

  const nuevoEvento = await prisma.evento.create({
    data: {
      titulo: tituloNormalizado,
      lugar: lugarNormalizado,
      fecha: new Date(fechaNormalizada),
      valor: valorNumerico,
      imagen: imagenNormalizada,
    },
  });

  return { ok: true, evento: nuevoEvento };
});