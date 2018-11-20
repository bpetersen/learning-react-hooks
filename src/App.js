import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-header-text">React Hooks Demo</p>
      </header>
      <main>
        <UseStateClickDemo />
        <UseStateTodoDemo />
      </main>
    </div>
  )
}

const UseStateClickDemo = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h2>Use State Demo</h2>
      <h3>{count}</h3>
      <button onClick={() => setCount(count + 1)}>Up</button>
      <button onClick={() => setCount(count - 1)}>Down</button>
    </div>
  )
}

const UseStateTodoDemo = () => {
  const [todos, setTodos] = useState([])
  const [newTodoText, setNewTodoText] = useState('')
  const [newTodoCheckbox, setNewTodoCheckbox] = useState(false)

  const handleNewTodoTextChanged = e => {
    setNewTodoText(e.target.value)
  }

  const handleNewTodoCheckboxChanged = e => {
    setNewTodoCheckbox(e.target.checked)
  }

  const handleExistingItemTextChange = index => e => {
    const modifiedData = todos[index]
    modifiedData.text = e.target.value
    setTodos([
      ...todos.slice(0, index),
      modifiedData,
      ...todos.slice(index + 1),
    ])
  }

  const handleExistingCheckboxChange = index => e => {
    const modifiedData = todos[index]
    modifiedData.completed = e.target.checked
    setTodos([
      ...todos.slice(0, index),
      modifiedData,
      ...todos.slice(index + 1),
    ])
  }

  const addTodo = e => {
    const newData = { completed: newTodoCheckbox, text: newTodoText }

    setTodos([...todos, newData])
    setNewTodoText('')
    setNewTodoCheckbox(false)
  }

  const rows = todos.map((todo, index) => (
    <div key={index}>
      <input
        type="text"
        value={todo.text}
        onChange={handleExistingItemTextChange(index)}
      />
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleExistingCheckboxChange(index)}
      />
    </div>
  ))

  return (
    <div>
      <h2>Use State Todo Demo</h2>
      {rows}
      <br />
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={handleNewTodoTextChanged}
        />
        <input
          type="checkbox"
          checked={newTodoCheckbox}
          onChange={handleNewTodoCheckboxChanged}
        />
      </div>
      <button onClick={addTodo}>Add</button>
    </div>
  )
}

export default App
