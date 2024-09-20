import React from 'react'
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const check = <i class="fa-solid fa-check"></i>
 
function List({ name, completed, id, toDoRemove }) {
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
    return (
        <ListStyled style={style} {...attributes}{...listeners} ref={setNodeRef}>
            <li onDoubleClick={() => toDoRemove(id)}>
                <p>{name}</p>
            </li>
            <div className="complete-btn">
                {check}
            </div>
        </ListStyled >
            
    )
}
const ListStyled = styled.div`

`;
export default List