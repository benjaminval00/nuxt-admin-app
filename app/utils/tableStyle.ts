import type { TableRow } from "@nuxt/ui"

export const headerClass = 'px-5 py-4 text-left text-xs font-semibold uppercase text-brand-green tracking-wider'
export const cellClass = 'px-5 py-4 align-top text-white/80'

export const defaultColumnMeta = {
    class: {
        th: headerClass,
        td: cellClass
    }
}

export const createTableMeta = <T extends Record<string, any>>() => ({
    class: {
        tr: (_row: TableRow<T>) => 'cursor-pointer transition-colors duration-150 hover:bg-white/5 border-b border-white/5'
    }
})