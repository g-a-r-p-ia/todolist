import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled from "styled-components";

function App() {

    return (
        <div className="App">
            <form action="" className="form">
                <h1>Today`s Tasks</h1>
                <div className="input-container">
                <input type="text" placeholder="Add a Task"/>
                </div>
            </form>
       
        </div>
  );
}
const AppStyled = styled.div`

`;
export default App;
