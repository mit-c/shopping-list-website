
async function addItem(data)
{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": data.name,
        "quantity": data.quantity,
        "priority": data.priority,
        "completed": data.completed
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    var response =  await fetch("http://localhost:4000/shopping-list/add", requestOptions)
    var json = await response.json()
    return json;


}

async function getItems()
{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
 
    var response = await fetch("http://localhost:4000/shopping-list", requestOptions) 
    var json = await response.json();
    return json;
        
        
}

async function getItem(id)
{
    var raw = "";

    var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
    };

    var response = await fetch("http://localhost:4000/shopping-list/"+id, requestOptions)
    var json = await response.json();
    return json;
}


function updateItem(id)
{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": "Milk-1203123123123",
    "quantity": -5,
    "priority": "high",
    "completed": true
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:4000/shopping-list/update/"+id, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


async function deleteItem(id)
{
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
    var res = await fetch("http://localhost:4000/shopping-list/delete/" + id, requestOptions)
    
    return res;
}



function deleteAllItems(id)
{
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      
    fetch("http://localhost:4000/shopping-list/delete/all", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export { deleteAllItems, deleteItem, getItem, getItems, addItem, updateItem}