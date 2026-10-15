<script setup lang="ts">
const route = useRoute()
const eventoId = route.query.eventoId

const registrando = ref(false)
const errorFormulario = ref('')

const formInscripcion = reactive({
    nombre: '',
    apellido: '',
    email: '',
})

function limpiarFormulario() {
    formInscripcion.nombre = ''
    formInscripcion.apellido = ''
    formInscripcion.email = ''
    errorFormulario.value = ''
}

async function guardarInscripcion() {
    errorFormulario.value = ''

    if (!formInscripcion.nombre.trim() || !formInscripcion.apellido.trim() || !formInscripcion.email.trim()) {
        errorFormulario.value = 'Por favor, completa todos los campos obligatorios.'
        return
    }

    registrando.value = true

    try {
        await $fetch('/api/inscrito', {
            method: 'POST',
            body: {
                nombre: formInscripcion.nombre,
                apellido: formInscripcion.apellido,
                email: formInscripcion.email,
                eventoId: Number(eventoId)
            }
        })

        useToast().add({
            duration: 3000,
            icon: 'i-heroicons-check-circle',
            color: 'primary',
            title: '¡Inscripción exitosa!',
            description: 'Te hemos registrado en el evento correctamente.'
        })

        limpiarFormulario()
        await navigateTo('/')
    }
    catch (err: any) {
        const mensajeBackend = err.data?.statusMessage
        errorFormulario.value = mensajeBackend
            ? mensajeBackend
            : getApiErrorMessage(err, 'No se pudo realizar la inscripción')

        useToast().add({
            duration: 5000,
            color: 'primary',
            icon: 'i-heroicons-exclamation-circle',
            title: 'Fallo al inscribirse',
            description: errorFormulario.value
        })
    }
    finally {
        registrando.value = false
    }
}

</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-brand-bg px-4 py-10 sm:px-6 lg:px-8">
        <UButton icon="i-lucide-chevron-left" to="/" size="xl" color="primary" variant="subtle"
            class="absolute left-8 top-25 rounded-full z-60" />

        <UButton icon="i-lucide-chevron-left" to="/" size="xl" color="primary" variant="subtle"
            class="absolute left-8 top-8 rounded-full z-10" />

        <div class="w-full max-w-md shrink-0">
            <div class="bg-brand-surface border border-white/10 rounded-2xl p-6 shadow-xl">
                <h2 class="text-brand-text font-bold text-xl mb-1">Formulario de Inscripción</h2>
                <p class="text-brand-muted text-sm mb-6">Completa tus datos para asegurar tu cupo</p>

                <form class="flex flex-col gap-5" @submit.prevent="guardarInscripcion">

                    <UFormField label="Nombre" name="nombre" class="text-white/80">
                        <UInput v-model="formInscripcion.nombre" color="primary" variant="outline" class="w-full"
                            placeholder="Ej: Juan" size="xl" />
                    </UFormField>

                    <UFormField label="Apellido" name="apellido" class="text-white/80">
                        <UInput v-model="formInscripcion.apellido" color="primary" variant="outline" class="w-full"
                            placeholder="Ej: Pérez" size="xl" />
                    </UFormField>

                    <UFormField label="Correo electrónico" name="email" class="text-white/80">
                        <UInput v-model="formInscripcion.email" type="email" color="primary" variant="outline"
                            class="w-full" placeholder="Ej: correo@ejemplo.com" size="xl" />
                    </UFormField>

                    <UAlert v-if="errorFormulario" color="primary" variant="soft" icon="i-heroicons-exclamation-circle"
                        :title="errorFormulario" />

                    <UButton type="submit" :loading="registrando"
                        class="w-full bg-white text-brand-surface font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors mt-1 text-md justify-center">
                        Confirmar Registro
                    </UButton>

                    <NuxtLink to="/"
                        class="block text-center text-xs text-brand-muted hover:text-white transition-colors py-1">
                        Cancelar y volver
                    </NuxtLink>

                </form>
            </div>
        </div>
    </div>
</template>