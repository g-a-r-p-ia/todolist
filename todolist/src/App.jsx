import { useState } from 'react'
import './App.css'
import styled from "styled-components";
import { myTodos } from "./data/todo"
import List from './components/List';
import uuid from 'react-uuid'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

function App() {
    const [todos, setTodos] = useState(myTodos)
    const [value, setValue] = useState('')
    const handleChange = (e) => {
        setValue(e.target.value)
        console.log(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value || value.length < 3) { return alert ('Todo must be at lest 3 symbol') }
        const newTodos = [...todos, {
            id: uuid(),
            name: value,
            completed: false
        }]
        setTodos(newTodos)
        setValue('')
    }
    const toDoRemove = (id) => {
        const filtered = todos.filter((todo) => {
            return todo.id !== id
        })
       setTodos(filtered)
    }
    const handleDragEnd = (event) => {
        const { active, over } = event
        if (active.id !== over.id) {
            setTodos((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)

                const newItems = [...items]
                newItems.splice(oldIndex, 1)
                newItems.splice(newIndex, 0, items[oldIndex])
                return newItems
            })
        }
 
    }

    return (
        <AppStyled className="App">
            <form action="" className="form" onSubmit={handleSubmit}>
                <h1>Today`s Tasks</h1>
                <div className="input-container">
                    <input type="text" value={value} onChange={handleChange} placeholder="Add a Task" />
                    <div className="submit-btn">
                        <button>+Add Todo </button>
                    </div>
                </div>
            </form>
            <DndContext onDragEnd={handleDragEnd} >
                <SortableContext items={todos.map((todo) => todo.id) }>
                    <ul className="todos-con">
                        {
                            todos.map((todo) => {
                                const { id, name, completed } = todo
                                return <List
                                    key={id}
                                    name={name}
                                    completed={completed}
                                    id={id}
                                    toDoRemove={toDoRemove} />
                            })
                        }
                    </ul> 
                </SortableContext>
            </DndContext>
             

        </AppStyled>
  );
}
const AppStyled = styled.div`

`;
export default App;
