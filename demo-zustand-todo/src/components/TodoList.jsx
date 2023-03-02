import React from 'react';
import TodoItem from './TodoItem';
import TodoItemCreator from './TodoItemCreator';
import TodoListFilters from './TodoListFilters';
import TodoQuickCheck from './TodoQuickCheck';
import Quotes from './Quotes';
import SearchBar from './SearchBar';
import '../styles/styles.css';
import shallow from 'zustand/shallow';
import useToDoStore from '../store/store';

const selector = (state) => ({
  todoListState: state.todoListState,
  todoListFilterState: state.todoListFilterState,
  todoListSortState: state.todoListSortState,
});

const filterList = (list, filter) => {
  switch (filter) {
    case 'Show Completed':
      return list.filter((item) => item.isComplete);
    case 'Show Uncompleted':
      return list.filter((item) => !item.isComplete);
    default:
      return list;
  }
};

const sortList = (list, sortingMethod) => {
  if (!sortingMethod) return list;
  const high = list.filter((item) => item.priority === 'high');
  const medium = list.filter((item) => item.priority === 'medium');
  const low = list.filter((item) => item.priority === 'low');
  return [...high, ...medium, ...low];
};

const TodoList = () => {
  const { todoListState, todoListFilterState, todoListSortState } = useToDoStore(selector, shallow);
  const todoList = sortList(filterList(todoListState, todoListFilterState), todoListSortState);

  return (
    <div className="mainContainer">
      <div className="wrapper">
        <center>
          <img
            id="newChromogenLogo"
            src="https://i.postimg.cc/sgXkWQmt/Chromogen-1.png"
            alt="this is supposed to be our logo"
          />
        </center>
        <div className="quoteBox">
          <React.Suspense fallback={<small>Loading...</small>}>
            <Quotes />
          </React.Suspense>
        </div>
        <div className="todosDisplayRow">
          <h1>To-Do List</h1>
          <div className="todosContainer">
            <TodoQuickCheck />
            <TodoItemCreator />
            {todoList.map((todoItem) => (
              <TodoItem key={todoItem.id} item={todoItem} />
            ))}
            <TodoListFilters />
          </div>
        </div>
        <SearchBar />
        <div className="row" />
      </div>
    </div>
  );
};

export default TodoList;
