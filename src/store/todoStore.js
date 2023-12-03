import { create } from 'zustand'

export const useStore = create(() => [
  {
    id: 'sdsdadsasdascwed',
    title: 'Lista',
    infoTodo: 'Esta es la Lista',
    date: 'Mon 6 Dec 2023',
    dateHours: '12:00 PM',
    category: 'Sin Categoria'
  }
])
export const useStoreCategory = create(set => ({
  visibilityInputCategory: false,
  turnToTrue: () => set((state) => ({ visibilityInputCategory: !state.visibilityInputCategory }))
}))