<script setup lang="ts">
import { z } from 'zod'
definePageMeta({
    middleware: ['admin'],
    layout: 'administrador'
})

import type { Evento } from '~/types/Evento'
import type { Usuario } from '../types/Usuario'
import { formBtnCTOUi, formBtnOutlineCTOUi, formBtnError } from '~/utils/formStyle'

const { data: usuarios, pending, error, refresh } = await useFetch<Usuario[]>('/api/usuario')
const { data: eventos, pending: pendingEventos, error: errorEventos, refresh: refreshEventos } = await useFetch<Evento[]>('/api/evento')

const mostrarFormAgregar = ref(false)
const errorFormAgregar = ref('')
const guardandoNuevoUsuario = ref(false)

const schemaNuevoUsuario = z.object({
    email: z.email({ message: 'Ingresa un correo válido' }),
    password: z.string().min(6, 'La contraseña debe tener 6 caracteres como mínimo'),
    nombre: z.string().min(5, 'El nombre debe tener al menos 5 caracteres.').max(100, 'El nombre debe tener maximo 100 caracteres.'),
    apellido: z.string().min(5, 'El apellido debe tener al menos 5 caracteres.').max(100, 'El apellido debe tener maximo 100 caracteres.'),
})

const formNuevoUsuario = reactive({
    nombre: '',
    apellido: '',
    password: '',
    rol: 'Staff',
    email: ''
})

function resetFormAgregar() {
    formNuevoUsuario.nombre = ''
    formNuevoUsuario.apellido = ''
    formNuevoUsuario.rol = 'Staff'
    formNuevoUsuario.email = ''
    errorFormAgregar.value = ''
}

function abrirModalUsuario() {
    mostrarFormAgregar.value = true
}

function cerrarFormAgregar() {
    mostrarFormAgregar.value = false
    resetFormAgregar()
}

async function guardarUsuario() {
    guardandoNuevoUsuario.value = true
    errorFormAgregar.value = ''
    try {
        await $fetch('/api/usuario', {
            method: 'POST',
            body: formNuevoUsuario
        })
        cerrarFormAgregar()
        await refresh()
    }
    catch (err: any) {
        errorFormAgregar.value = getApiErrorMessage(err, 'No se pudo guardar el usuario.')
    }
    finally {
        guardandoNuevoUsuario.value = false
    }
}

const mostrarFormContrasena = ref(false)
const errorContrasena = ref('')
const guardandoContrasena = ref(false)
const usuarioContrasena = ref<Usuario | null>(null)
const formContrasena = reactive({
    nueva: '',
    confirmar: ''
})

function resetFormContrasena() {
    formContrasena.nueva = ''
    formContrasena.confirmar = ''
    errorContrasena.value = ''
}

function abrirModalContrasena(usuario: Usuario) {
    usuarioContrasena.value = usuario
    resetFormContrasena()
    mostrarFormContrasena.value = true
}

function cerrarModalContrasena() {
    mostrarFormContrasena.value = false
    usuarioContrasena.value = null
    resetFormContrasena()
}

async function cambiarContrasena() {
    guardandoContrasena.value = true
    errorContrasena.value = ''

    try {
        await $fetch(`/api/usuario/${usuarioContrasena.value?.email}/password`, {
            method: 'PATCH',
            body: {
                password: formContrasena.nueva
            }
        })
        cerrarModalContrasena()
    }
    catch (err: any) {
        errorContrasena.value = getApiErrorMessage(err, 'No se pudo cambiar la constraseña.')
    }
    finally {
        guardandoContrasena.value = false
    }
}

async function alternarSuspension(usuario: Usuario) {
    const nuevoRol = usuario.rol === 'Suspendido' ? 'Staff' : 'Suspendido'

    try {
        await $fetch(`/api/usuario/${usuario.email}/rol`, {
            method: 'PATCH',
            body: { rol: nuevoRol }
        })
        await refresh()

        useToast().add({
            duration: 2000,
            icon: nuevoRol === 'Suspendido' ? 'i-lucide-lock' : 'i-lucide-lock-open',
            title: nuevoRol === 'Suspendido' ? 'Usuario Suspendido' : 'Acceso Restaurado',
            description: `El estado de ${usuario.nombre} ahora es: ${nuevoRol}`
        })
    } catch (err: any) { }
}

const mostrarConfirmBorrar = ref(false)
const borrandoUsuario = ref(false)
const usuarioBorrar = ref<Usuario | null>(null)

function confirmarBorrarUsuario(usuario: Usuario) {
    usuarioBorrar.value = usuario
    mostrarConfirmBorrar.value = true
}

function cerrarConfirmBorrar() {
    usuarioBorrar.value = null
    mostrarConfirmBorrar.value = false
}

async function borrarUsuario() {
    borrandoUsuario.value = true
    try {
        await $fetch(`/api/usuario/${usuarioBorrar.value?.email}`, { method: 'DELETE' })
        const nombre = usuarioBorrar.value?.nombre
        const apellido = usuarioBorrar.value?.apellido
        cerrarConfirmBorrar()
        await refresh()
        useToast().add({
            duration: 2000,
            icon: 'i-lucide-trash-2',
            title: 'Borrado de Usuario',
            description: `Se borró el usuario ${nombre} ${apellido}`
        })
    }
    catch (err: any) { }
    finally {
        borrandoUsuario.value = false
    }
}

async function eliminarEvento(id: number) {
    try {
        await $fetch('/api/evento/' + id, { method: 'DELETE' })

        await refreshEventos()

        useToast().add({
            duration: 2000,
            icon: 'i-lucide-trash-2',
            title: 'Evento Eliminado',
            description: 'El evento se ha borrado correctamente.'
        })
    } catch (err: any) {
        console.error("No se pudo eliminar el evento:", err)
    }
}

const mostrarFormAgregarEvento = ref(false)
const errorFormAgregarEvento = ref('')
const guardandoNuevoEvento = ref(false)
const imagenEvento = ref<File | null>(null)

const schemaNuevoEvento = z.object({
    titulo: z.string().min(3, 'El título debe tener al menos 3 letras.'),
    lugar: z.string().min(3, 'El lugar debe tener al menos 3 letras.'),
    fecha: z.string().min(1, 'Debes seleccionar una fecha y hora.'),
    valor: z.number().min(0, 'El valor no puede ser negativo.')
})

const formNuevoEvento = reactive({
    titulo: '',
    lugar: '',
    fecha: '',
    valor: 0
})

const archivoImagen = ref<File | null>(null)

function capturarArchivo(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        archivoImagen.value = target.files[0] || null
    }
}

function resetFormEvento() {
    formNuevoEvento.titulo = ''
    formNuevoEvento.lugar = ''
    formNuevoEvento.fecha = ''
    formNuevoEvento.valor = 0
    archivoImagen.value = null
    errorFormAgregarEvento.value = ''
}

function abrirModalEvento() {
    resetFormEvento()
    mostrarFormAgregarEvento.value = true
}

function cerrarFormEvento() {
    mostrarFormAgregarEvento.value = false
    resetFormEvento()
}


async function guardarEvento() {
    guardandoNuevoEvento.value = true
    errorFormAgregarEvento.value = ''

    try {
        let imagenUrl = ''

        const fileToUpload = Array.isArray(archivoImagen.value)
            ? archivoImagen.value[0]
            : archivoImagen.value

        if (fileToUpload) {
            const formData = new FormData()
            formData.append('file', fileToUpload)

            const resultado = await $fetch<{ url: string }>('/api/upload', {
                method: 'POST',
                body: formData
            })
            imagenUrl = resultado.url
        }

        await $fetch('/api/evento', {
            method: 'POST',
            body: {
                titulo: formNuevoEvento.titulo,
                lugar: formNuevoEvento.lugar,
                fecha: formNuevoEvento.fecha,
                valor: formNuevoEvento.valor,
                imagen: imagenUrl
            }
        })

        const tituloGuardado = formNuevoEvento.titulo
        cerrarFormEvento()
        await refreshEventos()

        useToast().add({
            duration: 3000,
            icon: 'i-heroicons-check-circle',
            color: 'primary',
            title: 'Evento Creado',
            description: `El evento "${tituloGuardado}" se publicó correctamente.`
        })
    }
    catch (err: any) {
        errorFormAgregarEvento.value = getApiErrorMessage(err, 'No se pudo guardar el evento.')
    }
    finally {
        guardandoNuevoEvento.value = false
    }
}

async function manejarEliminarInscrito(inscritoId: number) {
    try {
        await $fetch(`/api/inscrito/` + inscritoId, { method: 'DELETE' })

        await refreshEventos()

        useToast().add({
            duration: 2000,
            icon: 'i-heroicons-check-circle',
            title: 'Inscripción eliminada',
            description: 'El usuario ha sido desinscrito correctamente.'
        })
    } catch (err: any) {
        useToast().add({
            duration: 5000,
            color: 'error',
            icon: 'i-heroicons-exclamation-circle',
            title: 'Fallo al eliminar',
            description: err.message || 'Error desconocido en el servidor.'
        })
        console.error("Detalle técnico del error:", err)
    }
}
</script>

<template>
    <div class="space-y-8">
        <section class="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <h1 class="text-3xl font-extrabold tracking-tight text-brand-yellow sm:text-4xl">
                    Usuarios del sistema
                </h1>
                <p class="mt-3 max-w-2xl text-base leading-7 text-brand-yellow">
                    Visualice y administre los usuarios del sistema.
                </p>
            </div>

            <UButton @click="abrirModalUsuario" variant="outline" color="neutral" icon="i-heroicons-plus"
                :ui="formBtnOutlineCTOUi">
                Agregar Usuario
            </UButton>
        </section>

        <section class="grid gap-4 md:grid-cols-2">
            <UsuarioCard v-for="usuario in usuarios" :key="usuario.email" :usuario="usuario"
                @cambiar-contrasena="abrirModalContrasena" @borrar-usuario="confirmarBorrarUsuario"
                @toggle-suspension="alternarSuspension" />
        </section>

    </div>

    <BaseFormModal v-model:open="mostrarFormAgregar" title="Agregar Usuario"
        description="Completa los datos para registrar un nuevo usuario.">
        <UForm class="space-y-4" :state="formNuevoUsuario" :schema="schemaNuevoUsuario" @submit="guardarUsuario">
            <UFormField label="Nombre" name="nombre">
                <UInput v-model="formNuevoUsuario.nombre" color="neutral" variant="outline" class="w-full"
                    placeholder="Ej: Federico" />
            </UFormField>

            <UFormField label="Apellido" name="apellido">
                <UInput v-model="formNuevoUsuario.apellido" color="neutral" variant="outline" class="w-full"
                    placeholder="Ej: Santa Maria" />
            </UFormField>

            <UFormField label="Email" name="email">
                <UInput v-model="formNuevoUsuario.email" color="neutral" variant="outline" class="w-full"
                    placeholder="Ej: usuario@empresa.test" />
            </UFormField>

            <UFormField label="Contraseña" name="password">
                <UInput type="password" v-model="formNuevoUsuario.password" color="neutral" variant="outline"
                    class="w-full" placeholder="Al menos 6 caracteres" />
            </UFormField>

            <UAlert v-if="errorFormAgregar" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                :title="errorFormAgregar" />

            <div class="flex justify-end gap-3 pt-2">
                <UButton type="button" color="neutral" variant="subtle" @click="cerrarFormAgregar">
                    Cancelar
                </UButton>
                <UButton type="submit" color="neutral" icon="i-heroicons-check" :loading="guardandoNuevoUsuario"
                    :ui="formBtnCTOUi">
                    Agregar Usuario
                </UButton>
            </div>
        </UForm>
    </BaseFormModal>

    <BaseFormModal v-model:open="mostrarFormContrasena" title="Cambiar Contraseña" :description="usuarioContrasena
        ? `Actualiza la contraseña de ${usuarioContrasena.nombre} ${usuarioContrasena.apellido}.`
        : 'Actualiza la contraseña del usuario seleccionado.'">
        <form class="space-y-4" @submit.prevent="cambiarContrasena">
            <UFormField label="Nueva contraseña" name="nueva">
                <UInput v-model="formContrasena.nueva" type="password" color="neutral" variant="outline" class="w-full"
                    placeholder="Ingresa la nueva contraseña" />
            </UFormField>

            <UFormField label="Confirmar contraseña" name="confirmar">
                <UInput v-model="formContrasena.confirmar" type="password" color="neutral" variant="outline"
                    class="w-full" placeholder="Repite la nueva contraseña" />
            </UFormField>

            <UAlert v-if="errorContrasena" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                :title="errorContrasena" />

            <div class="flex justify-end gap-3 pt-2">
                <UButton type="button" color="neutral" variant="subtle" @click="cerrarModalContrasena">
                    Cancelar
                </UButton>
                <UButton type="submit" color="neutral" icon="i-heroicons-key" :loading="guardandoContrasena"
                    :ui="formBtnCTOUi">
                    Guardar contraseña
                </UButton>
            </div>
        </form>
    </BaseFormModal>

    <BaseFormModal v-model:open="mostrarConfirmBorrar" title="Borrar Usuario" :description="usuarioBorrar
        ? `¿Estás seguro que deseas borrar a ${usuarioBorrar.nombre} ${usuarioBorrar.apellido}? Esta acción no se puede deshacer.`
        : ''">
        <div class="flex justify-end gap-3 pt-2">
            <UButton type="button" color="neutral" variant="subtle" @click="cerrarConfirmBorrar">
                Cancelar
            </UButton>
            <UButton type="button" icon="i-lucide-trash-2" :loading="borrandoUsuario" :ui="formBtnError"
                @click="borrarUsuario">
                Borrar Usuario
            </UButton>
        </div>
    </BaseFormModal>

    <div class="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between mt-12 border-t border-white/10 pt-8">
        <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-brand-yellow sm:text-4xl">
                Eventos del sistema
            </h1>
            <p class="mt-3 max-w-2xl text-base leading-7 text-brand-yellow">
                Visualice las personas inscritas o elimine las actividades publicadas.
            </p>
        </div>

        <div class="flex gap-3">
            <UButton variant="solid" color="neutral" icon="i-heroicons-plus" :ui="formBtnCTOUi"
                @click="abrirModalEvento">
                Agregar Evento
            </UButton>
        </div>
    </div>

    <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <GestionarCartas v-for="evento in eventos" :key="evento.id" :evento="evento" @eliminar="eliminarEvento"
            @eliminar-inscrito="manejarEliminarInscrito" />
    </section>

    <BaseFormModal v-model:open="mostrarFormAgregarEvento" title="Agregar Evento"
        description="Registra una nueva actividad. Si no subes una imagen, se asignará una por defecto.">
        <UForm class="space-y-4" :state="formNuevoEvento" :schema="schemaNuevoEvento" @submit="guardarEvento">

            <UFormField label="Título del Evento" name="titulo">
                <UInput v-model="formNuevoEvento.titulo" color="neutral" variant="outline" class="w-full"
                    placeholder="Ej: Buceo Nocturno" />
            </UFormField>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UFormField label="Fecha y Hora" name="fecha">
                    <UInput v-model="formNuevoEvento.fecha" type="datetime-local" color="neutral" variant="outline"
                        class="w-full" />
                </UFormField>

                <UFormField label="Costo del ticket" name="valor">
                    <UInput v-model.number="formNuevoEvento.valor" type="number" color="neutral" variant="outline"
                        class="w-full" placeholder="Ej: 5000" />
                </UFormField>
            </div>

            <UFormField label="Lugar" name="lugar">
                <UInput v-model="formNuevoEvento.lugar" color="neutral" variant="outline" class="w-full"
                    placeholder="Ej: Playa Las Torpederas" />
            </UFormField>

            <UFormField label="Imagen" name="imagen">
                <UFileUpload v-model="archivoImagen" accept="image/png, image/jpeg, image/jpg" color="neutral"
                    variant="button" class="w-full" />
            </UFormField>

            <UAlert v-if="errorFormAgregarEvento" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                :title="errorFormAgregarEvento" />

            <div class="flex justify-end gap-3 pt-2">
                <UButton type="button" color="neutral" variant="subtle" @click="cerrarFormEvento">
                    Cancelar
                </UButton>
                <UButton type="submit" color="neutral" icon="i-heroicons-check" :loading="guardandoNuevoEvento"
                    :ui="formBtnCTOUi">
                    Publicar Evento
                </UButton>
            </div>
        </UForm>
    </BaseFormModal>
</template>