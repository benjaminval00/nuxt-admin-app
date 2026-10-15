<script setup lang="ts">
import type { Evento } from '~/types/Evento'

interface Inscrito {
    id: number
    nombre: string
    apellido: string
    email: string
    eventoId: number
}

const props = defineProps<{
    evento: Evento
}>()

const mostrarInscritos = ref(false)
const listaInscritos = ref<Inscrito[]>([])
const cargandoInscritos = ref(false)

const totalInscritos = computed(() => props.evento._count?.inscrito || 0)
const fechaFormateada = computed(() => formatFechaCorta(props.evento.fecha))
const horaFormateada = computed(() => formatHora(props.evento.fecha))

async function alternarInscritos() {
    if (mostrarInscritos.value) {
        mostrarInscritos.value = false
        return
    }

    cargandoInscritos.value = true
    try {
        const datos = await $fetch<Inscrito[]>(`/api/evento/${props.evento.id}/inscritos`)
        listaInscritos.value = datos
        mostrarInscritos.value = true
    } catch (err) {
        console.error("Error al obtener las personas inscritas:", err)
    } finally {
        cargandoInscritos.value = false
    }
}

const emit = defineEmits<{
    'eliminar': [id: number],
    'eliminar-inscrito': [id: number]
}>()

function eliminarYRefrescarLocal(idInscrito: number) {
    emit('eliminar-inscrito', idInscrito)
    listaInscritos.value = listaInscritos.value.filter(persona => persona.id !== idInscrito)
}
</script>

<template>
    <div
        class="bg-brand-blue border border-gray-700 rounded-2xl p-5 hover:border-brand-cyan transition-colors group flex flex-col justify-between">
        <div>
            <div class="flex items-start justify-between mb-3">
                <span
                    class="bg-white/10 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
                    {{ evento.lugar }}
                </span>
            </div>

            <div class="h-44 w-full overflow-hidden bg-white/5 rounded-xl mb-4">
                <img :src="evento.imagen || '/images/default-evento.jpg'"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy" />
            </div>

            <h3 class="text-white font-bold text-lg mb-4 group-hover:text-brand-yellow transition-colors">
                {{ evento.titulo }}
            </h3>

            <div class="flex flex-col gap-2 text-sm text-gray-200">
                <div class="flex items-center justify-between">
                    <span class="font-semibold text-white/80">Fecha / Hora</span>
                    <span class="text-white">{{ fechaFormateada }} - {{ horaFormateada }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="font-semibold text-white/80">Total Inscritos</span>
                    <span class="text-white">{{ totalInscritos }} Personas</span>
                </div>
            </div>
        </div>

        <div class="border-t border-white/20 pt-3 mt-4">
            <div class="flex items-center justify-between mb-3">
                <div class="flex flex-col">
                    <span class="text-xs text-white/60 uppercase font-bold tracking-wider">Costo</span>
                    <span class="text-lg font-extrabold text-amber-400">${{ evento.valor }}</span>
                </div>

                <UButton variant="solid" size="sm"
                    :icon="mostrarInscritos ? 'i-heroicons-eye-slash' : 'i-heroicons-users'"
                    :loading="cargandoInscritos"
                    class="bg-white text-brand-surface hover:bg-gray-100 font-bold transition-colors shadow-sm text-xs"
                    @click="alternarInscritos">
                    {{ mostrarInscritos ? 'Ocultar' : 'Ver Inscritos' }}
                </UButton>
            </div>

            <div class="pt-2 border-t border-white/10 flex justify-end">
                <UButton color="error" variant="soft" icon="i-lucide-trash-2" size="xs"
                    class="w-full justify-center font-bold rounded-lg" @click="emit('eliminar', props.evento.id)">
                    Eliminar Evento
                </UButton>
            </div>
        </div>

        <div v-if="mostrarInscritos"
            class="mt-4 pt-3 border-t border-dashed border-white/20 bg-black/10 p-3 rounded-xl space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                Lista de Registrados ({{ listaInscritos.length }})
            </h4>

            <div v-if="listaInscritos.length > 0" class="divide-y divide-white/10 max-h-36 overflow-y-auto pr-1">
                <div v-for="persona in listaInscritos" :key="persona.id"
                    class="py-2 first:pt-0 last:pb-0 text-xs text-gray-200 flex items-center justify-between">

                    <div>
                        <p class="font-bold text-white">
                            {{ persona.nombre }} {{ persona.apellido }}
                        </p>
                        <p class="text-gray-400 select-all">
                            {{ persona.email }}
                        </p>
                    </div>

                    <UButton color="neutral" variant="ghost" icon="i-lucide-user-minus" size="xs" class="rounded-full"
                        title="Eliminar inscripción" @click="eliminarYRefrescarLocal(persona.id)" />
                </div>
            </div>

            <div v-else class="text-xs text-center py-2 text-gray-300 italic">
                No hay personas inscritas en este evento.
            </div>
        </div>
    </div>
</template>