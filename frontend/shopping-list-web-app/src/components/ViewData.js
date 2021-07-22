import React, { Component, useEffect, useState } from 'react';
import { Button } from "react-bootstrap"
import { deleteAllItems, deleteItem, getItem, getItems, addItem, updateItem } from "../api/apiFunctions"
import "bootstrap/dist/css/bootstrap.min.css"
import "../index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ViewData(props) {
    const [data, setData] = useState([])
    var columnNames = ["name", "priority", "quantity"]
    useEffect(async (props) => {
        var newData = await getItems();
        setData(newData)
    })
    return (
        <div>
            <div>
                {renderTable(data)}
            </div>


            <div id="error-msg"></div>
        </div>
    )
}

function renderTable(data) {
    // 
    return (
        <table class="table table-dark table-bordered">
            <thead class="thead-light"><tr>{renderHeader()}</tr></thead>
            <tbody >{renderBody(data)}</tbody>
        </table>
    )
}

function renderHeader() {
    var jsxArray = [<th>Name</th>, <th>Priority</th>, <th>Quantity</th>, <th>Completed</th>];

    return jsxArray;
}

function renderBody(data) {
    var jsxArray = [];
    data.forEach((item, i) => {
        var jsx = <tr>{renderRow(i,item,data)}</tr>
        jsxArray.push(jsx)

    })
    jsxArray.push(renderInputRow(data.length))
    return jsxArray;
}

function renderRow(rowIx, item, data) {
    var jsxArray = []
    var columnNames = ["name", "priority", "quantity"]
    
    for (var key of columnNames) {
        // key is name, priority or quantity

        jsxArray.push(<td id={key+"-"+rowIx}>{item[key]}</td>)
    }
    jsxArray.push(
        <td id={"delete-"+rowIx}>
            <button id={"delete-button-"+rowIx} onClick={()=> handleDelete(item)} class="btn">
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>
        </td>
    )
    return jsxArray
}

async function handleDelete(item)
{

    var id = item["_id"];
    var res = await deleteItem(id)
    console.log(res)
}

function renderInputRow(rowIx)
{
    var jsxArray = []
    var columnNames = ["name", "priority", "quantity"]
    for (var key of columnNames)
    {
        jsxArray.push(<td id={key+"-input"}>
           <input></input></td>)
    }
    jsxArray.push(<td id="delete-input">
            <div>
                <Button onClick={(e)=>handleClick(e)}>Add Item</Button>
            </div>
    </td>)
    return jsxArray;
}


function handleClick(e) 
{
    // Check for inputs
    document.getElementById("error-msg").innerHTML = "" 
    var inputName = document.getElementById("name-input").firstChild.value
    var inputPriority = document.getElementById("priority-input").firstChild.value
    var inputQuantity = document.getElementById("quantity-input").firstChild.value
    if(inputName === "" || inputPriority === "" || inputQuantity === "")
    {
        document.getElementById("error-msg").innerHTML = "Please fill all the input boxes"
        return
    }

    if(!isNumber(inputQuantity))
    {
        document.getElementById("error-msg").innerHTML = "Please enter a number for quantity"
        return
    }

    // else we can call api
    var data = {
        name: inputName,
        priority: inputPriority,
        quantity: inputQuantity,
        completed: false
        
    }
    addItem(data)

}

function isNumber(str) {
    if (typeof str != "string") return false // we only process strings!
    // could also coerce to string: str = ""+str
    return !isNaN(str) && !isNaN(parseFloat(str))
  }

export default ViewData
export { renderTable }