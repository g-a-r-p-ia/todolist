import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useThemeContext } from '../context/themeContext';
import { useMemo } from 'react';
import { gsap } from 'gsap'

const check = <i class = "fa-solid fa-check"></i>
 
function List({ name, completed, id, toDoRemove, handleCompleted }) {

    const theme = useThemeContext()
    const todoRef = useRef()
    const nameRef = useRef()
   


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,

    }

    const randomColors = [
        theme.buttonGradient1,
        theme.buttonGradient2,
        theme.buttonGradient3,
        theme.buttonGradient4,
        theme.buttonGradient5,

    ]


    const randomizeColor = () => {
        const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)]
        return randomColor
    }

    const randomColorMemo = useMemo(() => {
        return randomizeColor()
    }, [])


    const animatedRemove = () => {
        gsap.to(todoRef.current, {
            duration: 0.5,
            opacity: 0,
            y: -20,
            rotationX: 180,
            onComplete: () => {
                toDoRemove(id);
               
            }
        })

    }

    useEffect(() => {
        gsap.from(nameRef.current, {
            duration: 0.5,
            opacity: 0,
            y: 20,
            rotationX: 180,
            delay: -0.1,
            onComplete: () => {
                gsap.to(nameRef.current, {
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                })
                    
                
            }
        })
    }, [completed])

    return (
        <ListStyled theme={theme} completed={completed} colors={randomColorMemo} style={style} {...attributes}{...listeners} ref={setNodeRef}>
            <li ref={todoRef} onDoubleClick={animatedRemove}>
                <p ref={nameRef}> {name}</p>
            </li>
            <div className="complete-btn" onDoubleClick ={() => handleCompleted(id)}>
                {check}
            </div>
        </ListStyled >
            
    )
}
const ListStyled = styled.div`
background: ${(props) => props.theme.colorBg2};
position:relative;
li{
   background: ${(props) => props.colors};
        padding: 1rem 2rem;
        border-radius: 5px;
        margin-bottom: ${props => props.grid ? '1rem' : '0'};
        list-style: none;
        border: 1px solid ${props => props.theme.colorIcons3};
        box-shadow:${props => props.theme.shadow4};
         &:hover{
            cursor: pointer;
        }
        &:active{
            transform: scale(0.98);
        }
         p{
            font-size: clamp(1rem, 2vw, 1.2rem);
            color: white;
            color: ${(props) => props.completed ? props.theme.colorPrimaryGreen : props.theme.colorGrey0 };
            text-decoration: ${props => props.completed ? 'line-through' : 'none'}; 
        }
}
.complete-btn{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: clamp(1.2rem, 2vw, 2rem);
        padding: .4rem .9rem;
        font-family: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        color: ${props => props.completed ? props.theme.colorPrimaryGreen : props.theme.colorIcons2};
        i{
            border-radius: 50%;
            box-shadow: 1px 3px 7px rgba(0,0,0,0.3);
        }
    }
`;
export default List