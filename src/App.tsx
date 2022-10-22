import React, { useState } from 'react';
import { ulid } from 'ulid';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string,
    id: string,
    checked:boolean
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      inputValue:inputValue,
      id: ulid(),
      checked:false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  }

  const handleEdit = (id:string, inputValue:string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id)
      {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChecked = (id:string, checked:boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id)
      {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  }
  const handleDelete = (id:string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h2>Todo リスト</h2>
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <input type="text" onChange={(e)=>{ handleChange(e)}} required value={inputValue}/>
        <input type="submit" value="add" />
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="TodoList">
              <input type="text" onChange={(e)=>{ handleEdit(todo.id, e.target.value)} } value={todo.inputValue} disabled={todo.checked} required/>
              <input type="checkbox" onChange={(e)=>{ handleChecked(todo.id, todo.checked)} } />
              <button onClick={() => {handleDelete(todo.id)}}>Delete</button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
