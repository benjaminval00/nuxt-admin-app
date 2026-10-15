<script setup lang="ts">
import type { Usuario } from '~/types/Usuario'

const props = defineProps<{
    usuario: Usuario
}>()

const emit = defineEmits<{
    'cambiar-contrasena': [usuario: Usuario],
    'borrar-usuario': [usuario: Usuario],
    'toggle-suspension': [usuario: Usuario]
}>()
</script>

<template>
    <UCard class="border border-brand-border bg-white/95" :ui="{ body: 'p-4 sm:p-4' }">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
                <p class="text-lg font-bold text-brand-blue">
                    {{ props.usuario.nombre }} {{ props.usuario.apellido }}
                </p>
                <p class="text-sm text-brand-gray/70">
                    {{ props.usuario.email }}
                </p>
            </div>
        </div>

        <div
            class="mt-4 flex items-center justify-between border-t border-brand-border pt-4 text-sm text-brand-gray/75">
            <div>
                <span class="mr-1">Rol asignado: </span>
                <span class="font-semibold text-brand-gray">{{ props.usuario.rol }}</span>
            </div>

        </div>

        <div class="mt-3 flex items-center justify-end gap-2">

            <UTooltip :text="props.usuario.rol === 'Suspendido' ? 'Activar acceso (Staff)' : 'Suspender acceso'">
                <UButton :icon="props.usuario.rol === 'Suspendido' ? 'i-lucide-lock' : 'i-lucide-lock-open'"
                    aria-label="Alternar estado de acceso" variant="soft" size="xs" :class="props.usuario.rol === 'Suspendido'
                        ? 'rounded-full bg-rose-500/12 text-rose-500 hover:bg-rose-500/24'
                        : 'rounded-full bg-emerald-500/12 text-emerald-500 hover:bg-emerald-500/24'"
                    @click="emit('toggle-suspension', props.usuario)" />
            </UTooltip>

            <UTooltip text="Cambiar contraseña">
                <UButton icon="i-lucide-key-round" aria-label="Cambiar contraseña" variant="soft" size="xs"
                    class="rounded-full bg-brand-yellow/20 text-brand-gray hover:bg-brand-yellow/35"
                    @click="emit('cambiar-contrasena', props.usuario)" />
            </UTooltip>

            <UTooltip text="Eliminar usuario">
                <UButton icon="i-lucide-trash-2" aria-label="Eliminar usuario" variant="soft" size="xs"
                    class="rounded-full bg-brand-red/12 text-brand-red hover:bg-brand-red/24"
                    @click="emit('borrar-usuario', props.usuario)" />
            </UTooltip>
        </div>
    </UCard>
</template>