// Ñ12, F3, Ñ13, Ñ14
import { useEffect, useState } from 'react'
import './App.css'
import styled from "styled-components";
import { myTodos } from "./data/todo"
import List from './components/List';
import uuid from 'react-uuid'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { useThemeContext } from './context/themeContext';

function App() {
    const [todos, setTodos] = useState(myTodos)
    const [value, setValue] = useState('')
    const theme = useThemeContext()
    const serverAddress = "ws://localhost:5000";
    const ws = new WebSocket(serverAddress);

    ws.onopen = function () {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send("Hello from PCamp!");
        }
    };

    ws.onmessage = function (msg) {
        console.log("Received msg from the server: " + msg.data);
    };


    const handleChange = (e) => {
        setValue(e.target.value)
        console.log(value)
    }
    const saveToLocalStorage = (todos) => {
        if (todos) {
            localStorage.setItem('todos', JSON.stringify(todos))
        }
    }
    useEffect(() => {
        const localTodos = localStorage.getItem('todos')
        if (localTodos) {
            setTodos(JSON.parse(localTodos))
        }

        const handleStorageChange = (event) => {
            if (event.key === 'todos') {
                setTodos(JSON.parse(event.newValue));
            }
        };

        window.addEventListener('storage', handleStorageChange);


        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };

    }, []);
    const removeItem = (id) => {
        const filtered = todos.filter((todo) => {
            return todo.id !== id
        })
        localStorage.setItem('todos', JSON.stringify(filtered))


    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value || value.length < 3) { return alert('Todo must be at lest 3 symbol') }
        const newTodos = [...todos, {
            id: uuid(),
            name: value,
            completed: false
        }]
        setTodos(newTodos)
        saveToLocalStorage(newTodos)
        setValue('')
    }
    const toDoRemove = (id) => {
        removeItem(id)
        const filtered = todos.filter((todo) => {
            return todo.id !== id
        })
        setTodos(filtered);
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
                // const message = JSON.stringify({ type: 'drag', newItems });
                // serverConnection.send(message);
                saveToLocalStorage(newItems);

                return newItems
            })
        }

    }

    const handleCompleted = (id) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        setTodos(newTodos)
        saveToLocalStorage(newTodos)

    }
   
    return (
        <AppStyled className="App" theme={theme} >
            <form action="" className="form" onSubmit={handleSubmit}>
                <h1>Today`s Tasks</h1>
                <div className="input-container">
                    <input type="text" value={value} onChange={handleChange} placeholder="Add a Task" />
                    <div className="submit-btn">
                        <button>+Add Todo </button>
                    </div>
                </div>
            </form>
            <DndContext onDragEnd={handleDragEnd}>
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
                                    toDoRemove={toDoRemove}
                                    handleCompleted={handleCompleted}
                                />
                            })
                        }
                    </ul> 
                </SortableContext>
            </DndContext>
             

        </AppStyled>
  );
}
const AppStyled = styled.div`
 min-height: 100vh;
  padding: 5rem 25rem;
  background-color: ${(props) => props.theme.colorBg3};
  overflow: hidden;
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${(props) => props.theme.colorBg2};
    border-radius: 1rem;
    margin-bottom: 2rem;
    padding: 2rem 1rem;
    box-shadow: ${(props) => props.theme.shadow3};
    border: 1px solid ${props => props.theme.colorIcons3};
    h1{
      font-size: clamp(1.5rem, 2vw, 2.5rem);
      font-weight: 800;
      color: ${(props) => props.theme.colorPrimaryGreen};
    }
    .input-container{
      margin: 2rem 0;
      position: relative;
      font-size: clamp(1rem, 2vw, 1.2rem);
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      input, button{
        
        font-size: clamp(1rem, 2vw, 1.2rem);
      }
      input{
        background: transparent;
        border:1px solid ${(props) => props.theme.colorIcons3};
        border-radius: 7px;
        padding: .8rem 1rem;
        color: ${(props) => props.theme.colorGrey2};
        width: 100%;
        &:focus{
          outline: none;
        }
        &::placeholder{
          color: ${(props) => props.theme.colorGrey3};
        }
        &:active, &:focus{
          border: 1px solid ${(props) => props.theme.colorIcons};
        }
      }
      button{
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        border: none;
        background: ${(props) => props.theme.colorPrimaryGreen};
        height: 100%;
        padding: 0 1rem;
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
        color: ${(props) => props.theme.colorWhite};
        transition: all .3s ease;
        &:hover{
          background: ${(props) => props.theme.colorPrimary2};
        }
      }
    }
  }

  .todos-con{
    overflow: hidden;
    background: ${(props) => props.theme.colorBg2};
    padding: 5rem;
    border-radius: 1rem;
    box-shadow: ${(props) => props.theme.shadow3};
    border: 1px solid ${props => props.theme.colorIcons3};
    
      }
    
    
  
`;
export default App;
