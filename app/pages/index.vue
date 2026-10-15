<script setup lang="ts">
import type { Evento } from '~/types/Evento';

const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/evento')

onMounted(async () => {
    await refresh()
})

</script>

<template>
    <div class="space-y-8 py-6">
        <section class="max-w-4xl mx-auto px-4 space-y-2 text-center md:text-left">
            <h1 class="text-3xl font-extrabold tracking-tight text---ui-primary sm:text-4xl">
                Plataforma de Eventos Estudiantiles y Culturales
            </h1>
            <p class="text-base text---ui-text-muted">
                Explora las actividades disponibles.
            </p>
        </section>

        <section class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <EventoCartas v-for="evento in eventos" :evento="evento" :key="evento.id" />
            </div>
        </section>
    </div>
</template>