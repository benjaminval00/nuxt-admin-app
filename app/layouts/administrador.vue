<script setup lang="ts">
const route = useRoute()
const { user } = useUserSession()

const isActive = (to: String) => route.path === to

const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Productos', to: '/productos' },
    ...(user.value?.rol === 'Administrador' ? [{ label: 'Usuarios', to: '/usuarios' }] : [])
]

async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    await navigateTo('/login')
}

const userMenuItems = [[
    {
        label: 'Cerrar sesión',
        icon: 'i-lucide-log-out',
        onSelect: logout
    }
]]
</script>

<template>
    <div class="min-h-screen bg-linear-to-br from-green-900 to-emerald-900 text-brand-green">
        <header class="border-b border-brand-borde bg-yellow-200 backdrop-blur-sm">
            <div
                class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-brand">
                            Portal de Administracion
                        </p>
                        <p class="text-sm font-bold text-brand-blue">
                            Staff de Smart Events
                        </p>
                    </div>
                </div>

                <div
                    class="flex flex-wrap items-center gap-3 rounded-2xl border border-brand-border bg-white px-4 py-2">
                    <div class="hidden text-right sm:block">
                        <p class="text-sm font-semibold text-brand-blue">
                            {{ user?.nombre }} {{ user?.apellido }}
                        </p>
                        <p class="text-xs text-brand-gray/70">
                            {{ user?.rol }}
                        </p>
                    </div>

                    <UDropdownMenu :items="userMenuItems" :content="{ align: 'end', sideOffset: 12 }"
                        :ui="{ content: 'min-w-48', item: 'cursor-pointer', itemLeadingIcon: 'text-brand-blue', itemLabel: 'font-semibold text-brand-gray' }">
                        <div class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-brand-cyan text-sm font-bold text-white transition-transform hover:scale-105"
                            role="button" tabindex="0" aria-label="Abrir menú de usuario">
                            <Icon name="i-lucide-user" size="20" />
                        </div>
                    </UDropdownMenu>
                </div>

            </div>
        </header>
        <main class="flex-1 w-full mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <slot />
        </main>

    </div>
</template>