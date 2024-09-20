import React from 'react'

const check = <i class="fa-solid fa-check"></i>
 
function List({name, completed, id, toDoRemove}) {
    return (
        <div>
            <li onDoubleClick={() => toDoRemove(id)}>
                <p>{name}</p>
            </li>
            <div className="complete-btn">
                {check}
            </div>
        </div >
            //ListStyled
    )
}
{/*const ListStyled = styled.div`

`;*/}
export default List