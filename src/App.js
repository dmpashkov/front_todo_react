import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import PostService from './API/TaskService';

function App() {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const response = await PostService.getAllTasks();
    setTasks(response.data.data);
  }

  async function fetchAddTasks(userInput) {
    const response = await PostService.addTask(userInput);
    setTasks([...tasks, response.data])
  }

  async function fetchRemoveTasks(id) {
    const response = await PostService.removeTask(id);
    if (response.status === 200) {
      setTasks([...tasks.filter(task => task._id !== id)])
    }
  }

  async function fetchToggleTasks(id, check) {
    const response = await PostService.toggleTask(id, check);
    setTasks([...tasks.map(task => task._id === id ? { ...task, isCheck: response.data.isCheck } : { ...task })]);
  }

  async function fetchEditTasks(id, text) {
    const response = await PostService.editTask(id, text);
    setTasks([...tasks.map(task => task._id === id ? { ...task, text: response.data.text } : { ...task })]);
  }

  const addTask = (userInput) => {
    if (userInput) {
      fetchAddTasks(userInput);
    }
  }

  const toggleTask = (id, check) => {
    fetchToggleTasks(id, check)
  }

  const editTask = (id, text) => {
    fetchEditTasks(id, text);
  }

  const removeTask = (id) => {
    fetchRemoveTasks(id)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="App">
      <h1>Todo list</h1>
      <h2>Tasks: {tasks.length}</h2>
      <TodoForm
        addTask={addTask}
      />
      <div className='tasks__wrap'>
        {tasks.map(task => {
          return (
            <TodoItem
              task={task}
              key={task.id}
              toggleTask={toggleTask}
              editTask={editTask}
              removeTask={removeTask}
            />
          )
        })}
      </div>
    </div>
  );
}
export default App;
