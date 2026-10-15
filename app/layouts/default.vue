<script setup lang="ts">
const route = useRoute()

const isActive = (to: String) => route.path === to

const navigationLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Inscripciones', to: '/inscripciones' },
]
</script>

<template>
    <div
        class="font-sans min-h-screen bg-[radial-gradient(circle_at_top,rgba(44,76,56,0.12),transparent_35%),radial-gradient(circle_at_right_20%,rgba(169,146,96,0.06),transparent_30%)] bg-default text-default flex flex-col">

        <nav class="bg-elevated border-b border-muted sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
            <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <a href="#" class="font-extrabold text-xl tracking-tight text-highlighted ">
                    <span class="text-primary">Smart</span>Events
                </a>

                <div class="flex gap-6 md:gap-8">
                    <NuxtLink v-for="link in navigationLinks" :key="link.to" :to="link.to"
                        :class="isActive(link.to) ? 'text--ui-text font-semibold border-b-2 border(--ui-primary) pb-1' : 'text(--ui-text-muted) hover:text(--ui-text) transition-colors font-medium'">
                        {{ link.label }}
                    </NuxtLink>
                </div>

                <UButton type="submit" href="/login"
                    class="bg-brand-blue text-white hover:bg-brand-blue/90 flex h-10 w-16 cursor-pointer items-center justify-center rounded-s-xl">
                    Admin
                </UButton>
            </div>
        </nav>

        <main>
            <slot />
        </main>

        <footer class="mt-auto border-t border-muted py-8 px-6 bg-elevated">
            <div class="max-w-7xl mx-auto flex flex-col items-center justify-center gap-3 text-center">

                <span class="font-extrabold text-base tracking-tight text-highlighted">
                    <span class="text-[#1a3324]">Smart</span> Events
                </span>

                <p class="text-muted text-sm">© 2026 Smart Events. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    </div>
</template>