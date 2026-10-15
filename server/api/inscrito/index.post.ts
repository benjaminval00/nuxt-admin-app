export default defineEventHandler(async (event) => {
    const { nombre, apellido, email, eventoId } = await readBody(event);

    const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : '';
    const apellidoNormalizado = typeof apellido === 'string' ? apellido.trim() : '';
    const emailNormalizado = typeof email === 'string' ? email.trim() : '';
    const idEventoNumerico = Number(eventoId);

    const inscripcionPrev = await prisma.inscrito.findFirst({
        where: {
            email: emailNormalizado,
            eventoId: idEventoNumerico
        }
    });

    if (inscripcionPrev) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Este correo ya se encuentra inscrito en este evento.'
        });
    }

    const inscrito = await prisma.inscrito.create({
        data: {
            nombre: nombreNormalizado,
            apellido: apellidoNormalizado,
            email: emailNormalizado,
            eventoId: idEventoNumerico
        }
    });
    return {
        ok: true,
        inscrito
    };
});