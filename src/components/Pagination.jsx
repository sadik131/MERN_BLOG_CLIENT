import React from 'react'
import classes from "../style/pagination.module.css"

function Pagination({ postParPage, totalPost ,paginate}) {
    const numberPage = []

    for (let i = 1; i < Math.ceil(totalPost / postParPage); i++) {
        numberPage.push(i)
    }
    // console.log(paginate)
    return (
        <nav>
            <ul className={classes.listItel}>
                {numberPage.map(number => {
                   return  <li key={number}>
                   <button className={classes.pageLink} onClick={()=>paginate(number)} >{number}</button>
               </li>
                })}
            </ul>
        </nav>
    )
}

export default Pagination