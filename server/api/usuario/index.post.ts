import bcrypt from "bcryptjs";


export default defineEventHandler(async (event) => {
  const { email, password, nombre, apellido, rol } = await readBody(event);
  
  const emailNormalizado = typeof email === 'string' ? email.trim() : '';
  const passwordNormalizada = typeof password === 'string' ? password : '';
  const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : '';
  const apellidoNormalizado = typeof apellido === 'string' ? apellido.trim() : '';
  const rolNormalizado = typeof rol === 'string' ? rol.trim() : 'Staff';
  
  if (!emailNormalizado || !passwordNormalizada) {
    throw createError({
        statusCode: 400,
        statusMessage: "El correo y la contraseña son obligatorios."
    });
  }

  const hash = await bcrypt.hash(password, 12);

  await prisma.usuario.create({
    data: {
      email: email.trim(),
      password: hash,
      nombre: nombre.trim(),
      apellido:apellido.trim(),
      rol: rol,
    },
  });

  return { ok: true };
});

