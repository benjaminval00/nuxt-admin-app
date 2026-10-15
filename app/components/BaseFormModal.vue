<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

defineProps<{
    title: string
    description?: string
}>()
</script>

<template>
    <UModal v-model:open="open" :title="title" :description="description" :ui="{
        header: 'bg-transparent border-b border-white/5', title: 'text-white font-bold text-lg',
        description: 'text-brand-muted text-xs', body: 'bg-transparent', footer: 'bg-transparent'
    }">
        <template #body>
            <div class="text-white">
                <slot />
            </div>
        </template>
    </UModal>
</template>