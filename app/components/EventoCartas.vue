<script setup lang="ts">
import type { Evento } from '~/types/Evento';

const props = defineProps<{
    evento: Evento
}>()

const totalInscritos = computed(() => props.evento._count?.inscrito || 0)

const fechaFormateada = computed(() => formatFechaCorta(props.evento.fecha))
const horaFormateada = computed(() => formatHora(props.evento.fecha))
</script>

<template>
    <div
        class="bg-brand-blue border border---ui-border-muted rounded-2xl p-5 hover:border---ui-primary transition-colors group flex flex-col justify-between">
        <div>
            <div class="flex items-start justify-between mb-3">
                <span
                    class="bg-white/10 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
                    {{ evento.lugar }}
                </span>
            </div>

            <div class="h-44 w-full overflow-hidden bg-white/5 rounded-xl mb-4">
                <img :src="evento.imagen || '/images/default-event.jpg'"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy" />
            </div>

            <h3 class="text-white font-bold text-lg mb-4 group-hover:text---color-brand-yellow transition-colors">
                {{ evento.titulo }}
            </h3>

            <div class="flex flex-col gap-2 text-sm text-gray-200">
                <div class="flex items-center justify-between">
                    <span class="font-semibold text-white/80">Fecha / Hora</span>
                    <span class="text-white">{{ fechaFormateada }} - {{ horaFormateada }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-semibold text-white/80">Inscritos</span>
                    <span class="text-white">{{ totalInscritos }} Personas</span>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-between border-t border-white/20 pt-3 mt-4">
            <div class="flex flex-col">
                <span class="text-xs text-white/60 uppercase font-bold tracking-wider">Costo</span>
                <span class="text-lg font-extrabold text-amber-400">${{ evento.valor }}</span>
            </div>

            <UButton :to="`/inscribirse?eventoId=${evento.id}`" variant="solid" size="sm"
                icon="i-heroicons-pencil-square"
                class="bg-white text-brand-surface hover:bg-gray-100 font-bold transition-colors shadow-sm">
                Inscribirme
            </UButton>
        </div>
    </div>
</template>