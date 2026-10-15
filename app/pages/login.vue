<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
    layout: 'auth'
})

const schemaLogin = z.object({
    email: z.email({ message: 'Ingresa un correo válido' }),
    password: z.string().min(6, 'La contraseña debe tener 6 caracteres como mínimo')
})

const iniciandoSesion = ref(false)
const errorForm = ref('')
const formLogin = reactive({
    email: '',
    password: ''
})

const { fetch: fetchSession } = useUserSession()

async function login() {
    iniciandoSesion.value = true
    errorForm.value = ''

    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: formLogin.email,
                password: formLogin.password
            }
        })
        await fetchSession()
        await navigateTo('/admin')
    }
    catch (err: any) {
        errorForm.value = getApiErrorMessage(err, 'No se pudo iniciar sesión')
    }
    finally {
        iniciandoSesion.value = false
    }
}
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-brand-bg px-4 py-10 sm:px-6 lg:px-8 relative">

        <UButton icon="i-lucide-chevron-left" to="/" size="xl" color="primary" variant="subtle"
            class="absolute left-8 top-8 rounded-full z-10" />

        <div class="w-full max-w-md shrink-0">
            <div class="bg-brand-surface border border-white/10 rounded-2xl p-6 shadow-xl">

                <div class="space-y-3 text-center mb-6">
                    <p class="text-xs font-semibold uppercase tracking-[0.24em] text-brand-green">
                        Portal Administrativo
                    </p>
                    <h2 class="text-white font-bold text-xl">
                        Acceder al Panel Administrativo
                    </h2>

                    <div class="pt-1">
                        <span
                            class="bg-brand-green text-white text-2xl font-bold px-4 py-1.5 rounded-md shadow-sm inline-block">
                            Smart Events
                        </span>
                    </div>
                </div>

                <UForm class="flex flex-col gap-5" :state="formLogin" :schema="schemaLogin" @submit="login">

                    <UFormField label="Correo corporativo" name="email">
                        <UInput v-model="formLogin.email" placeholder="correo@empresa.com" size="xl" class="w-full" />
                    </UFormField>

                    <UFormField label="Contraseña" name="password">
                        <UInput v-model="formLogin.password" placeholder="Ingresa tu contraseña" type="password"
                            size="xl" class="w-full" />
                    </UFormField>

                    <UAlert v-if="errorForm" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                        :title="errorForm" />

                    <UButton type="submit" :loading="iniciandoSesion"
                        class="w-full bg-white text-brand-surface font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors mt-1 text-md justify-center">
                        Iniciar Sesión
                    </UButton>

                    <NuxtLink to="/"
                        class="block text-center text-xs text-gray-400 hover:text-white transition-colors py-1">
                        Cancelar y volver
                    </NuxtLink>
                </UForm>
            </div>
        </div>
    </div>
</template>