<script setup lang="ts">
import { z } from 'zod'
import type { TableColumn } from '@nuxt/ui'
import { defaultColumnMeta, createTableMeta } from '~/utils/tableStyle'
import { formBtnCTOUi } from '~/utils/formStyle'

interface FilaInscripcion {
    id: number
    nombreCompleto: string
    eventoTitulo: string
    eventoFecha: string
    eventoLugar: string
}

const mostrarModalBuscar = ref(false)
const buscando = ref(false)
const errorBusqueda = ref('')

const schemaBusqueda = z.object({
    email: z.email({ message: 'Ingresa un correo válido' })
})

const formBusqueda = reactive({
    email: ''
})

const listaInscripciones = ref<FilaInscripcion[]>([])

const columns: TableColumn<FilaInscripcion>[] = [
    { accessorKey: 'eventoTitulo', header: 'Evento', meta: defaultColumnMeta },
    { accessorKey: 'eventoFecha', header: 'Fecha Registrada', meta: defaultColumnMeta },
    { accessorKey: 'eventoLugar', header: 'Lugar del Evento', meta: defaultColumnMeta },
    { accessorKey: 'nombreCompleto', header: 'Asistente Inscrito', meta: defaultColumnMeta }
]

const tableMeta = createTableMeta<FilaInscripcion>()


async function buscarInscripciones() {
    buscando.value = true
    errorBusqueda.value = ''

    const email = formBusqueda.email.trim()

    try {
        const data = await $fetch<any[]>(`/api/inscrito/${email}`, {
            query: { email: formBusqueda.email.trim() }
        })

        listaInscripciones.value = data.map(ins => ({
            id: ins.id,
            nombreCompleto: `${ins.nombre} ${ins.apellido}`,
            eventoTitulo: ins.evento?.titulo || 'N/A',
            eventoLugar: ins.evento?.lugar || 'N/A',
            eventoFecha: ins.evento?.fecha ? new Date(ins.evento.fecha).toLocaleDateString('es-CL') : 'N/A'
        }))

        mostrarModalBuscar.value = false
    } catch (err: any) {
        errorBusqueda.value = getApiErrorMessage(err, 'No se encontraron inscripciones asociadas a ese correo.')
    } finally {
        buscando.value = false
    }
}

function cerrarModalBuscar() {
    mostrarModalBuscar.value = false
}

function abrirModalBuscar() {
    mostrarModalBuscar.value = true
}


</script>

<template>
    <div class="space-y-8 py-6 px-6 max-w-7xl mx-auto w-full">
        <section class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
                <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Inscripciones
                </h1>
                <p class="mt-3 max-w-2xl leading-7 text-white/80 text-lg font-medium">
                    Mira los eventos a los que estás inscrito usando tu Email.
                </p>
            </div>

            <UButton variant="outline" color="neutral" icon="i-heroicons-document-magnifying-glass"
                :ui="formBtnOutlineCTOUi" @click="abrirModalBuscar">
                Buscar Tus Eventos
            </UButton>
        </section>

        <section class="rounded-2xl border border-brand-border bg-brand-surface overflow-hidden">
            <div class="p-4">
                <UTable v-if="listaInscripciones.length > 0" :data="listaInscripciones" :columns="columns"
                    :meta="tableMeta" />

                <div v-else class="flex flex-col items-center justify-center py-16 text-center">
                    <span class="text-brand-muted text-md">
                        Ningún registro cargado. Haz clic en "Buscar Tus Eventos" para iniciar.
                    </span>
                </div>
            </div>
        </section>

        <BaseFormModal v-model:open="mostrarModalBuscar" title="Buscar Inscripciones"
            description="Ingresa tu correo institucional o personal para consultar tu agenda.">
            <UForm class="space-y-4" :state="formBusqueda" :schema="schemaBusqueda" @submit="buscarInscripciones">
                <UFormField label="Correo electrónico registrado" name="email">
                    <UInput v-model="formBusqueda.email" color="neutral" variant="outline" class="w-full"
                        placeholder="ejemplo@correo.com" />
                </UFormField>

                <UAlert v-if="errorBusqueda" color="error" variant="soft" icon="i-heroicons-exclamation-circle"
                    :title="errorBusqueda" />

                <div class="flex justify-end gap-3 pt-2">
                    <UButton type="button" color="neutral" variant="subtle" @click="cerrarModalBuscar">
                        Cancelar
                    </UButton>

                    <UButton type="submit" color="neutral" icon="i-heroicons-magnifying-glass" :loading="buscando"
                        :ui="formBtnCTOUi">
                        Buscar Registros
                    </UButton>
                </div>
            </UForm>
        </BaseFormModal>
    </div>
</template>