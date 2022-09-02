import React, { useState } from 'react';

const TodoItem = ({ task, toggleTask, editTask, removeTask }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(task.text);

  const editTaskText = () => {
    editTask(task._id, value);
    setEdit(false)
  }

  return (
    edit
      ?
      <div className={task.isCheck ? 'task task_complete' : 'task'} key={task.id}>
        <input value={value} onChange={(e) => setValue(e.target.value)}></input>
        <button className="fa fa-floppy-o" onClick={editTaskText}></button>
      </div>
      :
      <div className={task.isCheck ? 'task task_complete' : 'task'} key={task.id}>
        <input type="checkbox" onClick={() => toggleTask(task._id, task.isCheck)} />
        <div>{task.text}</div>
        <button className='fa fa-pencil' onClick={() => setEdit(true)}></button>
        <button className='fa fa-trash' onClick={() => removeTask(task._id)}></button>
      </div>

  );
}

export default TodoItem;