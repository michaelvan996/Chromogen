import { chromogenZustandMiddleware } from 'chromogen';
import { create } from 'zustand';

const useToDoStore = create(
  chromogenZustandMiddleware((set) => ({
    todoListState: [],

    todoListFilterState: 'Show All',

    todoListSortState: false,

    resetFiltersAndSorted: () =>
      set(
        () => ({ todoListFilterState: 'Show All', todoListSortState: false }),
        false,
        'resetFiltersAndSorted',
      ),

    toggleSort: () =>
      set((state) => ({ todoListSortState: !state.todoListSortState }), false, 'toggleSort'),

    setFilter: (filter) => set(() => ({ todoListFilterState: filter }), false, 'setFilter'),

    quoteText: '',

    changeQuoteText: (text) => set(() => ({ quoteText: text }), false, 'changeQuoteText', text),

    quoteNumber: 0,

    changeQuoteNumber: () =>
      set(() => ({ quoteNumber: Math.floor(Math.random() * 1643) }), false, 'changeQuoteNumber'),

    setAllComplete: () =>
      set(
        (state) => ({
          todoListState: state.todoListState.some((todo) => todo.isComplete === false)
            ? state.todoListState.map((todo) => {
                return { ...todo, isComplete: true };
              })
            : state.todoListState.map((todo) => {
                return { ...todo, isComplete: false };
              }),
        }),
        false,
        'setAllComplete',
      ),

    checkBox: false,

    setCheckBox: () =>
      set(
        (state) => ({
          checkBox: state.todoListState.some((todo) => todo.isComplete === false) ? false : true,
        }),
        false,
        'setCheckBox',
      ),

    addTodoListItem: (todo) =>
      set(
        (state) => ({ todoListState: [...state.todoListState, todo] }),
        false,
        'addTodoListItem',
        todo,
      ),

    deleteTodoListItem: (id) =>
      set(
        (state) => ({ todoListState: state.todoListState.filter((todo) => todo.id !== id) }),
        false,
        'deleteTodoListItem',
        id,
      ),

    editItemText: (text, id) =>
      set(
        (state) => ({
          todoListState: state.todoListState.map((todo) => {
            if (todo.id === id) {
              return { ...todo, text: text };
            } else {
              return todo;
            }
          }),
        }),
        false,
        'editItemText',
        text,
        id,
      ),

    toggleItemCompletion: (id) =>
      set(
        (state) => ({
          todoListState: state.todoListState.map((todo) => {
            if (todo.id === id) {
              return { ...todo, isComplete: !todo.isComplete };
            } else {
              return todo;
            }
          }),
        }),
        false,
        'toggleItemCompletion',
        id,
      ),

    searchResultState: {
      all: {
        searchTerm: '',
        results: [],
      },
      high: {
        searchTerm: '',
        results: [],
      },
      medium: {
        searchTerm: '',
        results: [],
      },
      low: {
        searchTerm: '',
        results: [],
      },
    },

    setSearchState: (searchTerm, priority) =>
      set(
        (state) => {
          if (searchTerm === '')
            return {
              searchResultState: {
                ...state.searchResultState,
                [priority]: { searchTerm, results: [] },
              },
            };
          let results = [...state.todoListState].filter((todo) => todo.text.includes(searchTerm));
          if (priority !== 'all') results = results.filter((todo) => todo.priority === priority);
          return {
            searchResultState: { ...state.searchResultState, [priority]: { searchTerm, results } },
          };
        },
        false,
        'setSearchState',
        searchTerm,
        priority,
      ),
  })),
);

export default useToDoStore;
