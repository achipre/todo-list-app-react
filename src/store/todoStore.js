import { create } from 'zustand'

export const useStore = create(set => ({
  todos: [],
  addTodo: value => set(state => ({ todos: [...state.todos, value] })),
  removeTodo: id => set(state => ({ todos: state.todos.filter(todo => todo.id !== id) }))
}))

export const useStoreCategory = create(set => ({
  visibilityInputCategory: false,
  turnToTrue: () => set((state) => ({ visibilityInputCategory: !state.visibilityInputCategory }))
}))

export const useStoreInputSearch = create(set => ({
  valueSearch: '',
  typeValueSearch: value => set(state => ({ valueSearch: value }))
}))

export const useStoreCategories = create(set => ({
  categories: [
    {
      id: '1',
      nombre: 'Todos',
      isSelect: true
    },
    {
      id: '2',
      nombre: 'Sin Categoria',
      isSelect: false
    }
  ],
  addCategory: value => set(state => ({ categories: [...state.categories.map(category => ({ ...category, isSelect: false })), value] })),
  selectCategory: id => set(state => ({ categories: state.categories.map(category => category.id === id ? { ...category, isSelect: true } : { ...category, isSelect: false }) }))
}))
