import { useState , useEffect } from "react";

import "./style.css";

// get Local Storage data
const getLocalData = () =>{
    const lists = localStorage.getItem("myToDoList");

    if(lists){
        return JSON.parse(lists);
    }else{
        return([]);
    }
}
const Todo = () => {

    const[inputData, setInputData] = useState("");
    const[itemArray, setItemArray] = useState(getLocalData());
    const[isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);


    //Add item function
    const addItem =()=>{

        if(!inputData){
            alert("Please enter a valid value");
        }else if(inputData && toggleButton){

            setItemArray(
                itemArray.map((currElement)=>{
                    if(currElement.id == isEditItem){
                        return{...currElement, name:inputData}
                    }else{
                        return currElement;
                    }
                })
            )
            setInputData("");
        setIsEditItem(null);
        setToggleButton(false);
        }
        else{
            const newItem = {
                id: new Date().getTime().toString(),
                name : inputData
            }
            setItemArray([...itemArray, newItem]);
            setInputData("");
        }
    }

    //deleting an item
    const deleteItem = (itemId)=>{

        const updatedItems = itemArray.filter((item)=>{
            return item.id != itemId
        })
        setItemArray(updatedItems);
    }


    //edit an item
    const editItem = (itemId) =>{

        const item_to_do_edited = itemArray.find((currElement)=>{
            return currElement.id == itemId;
        });

        setInputData(item_to_do_edited.name);
        setIsEditItem(itemId);
        setToggleButton(true);
    }

    //delete All Item

    const removeAll = () =>{
        setItemArray([]);
    }


    //Adding local Storage -useEffect

    useEffect(()=>{

        localStorage.setItem("myToDoList", JSON.stringify(itemArray))
    }, [itemArray]);

    return ( 
        <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todo.svg" alt= "todo-logo" />
                    <figcaption>Add Your List here 👌</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder = "✍️ Add Item" className = "form-control"  value = {inputData} onChange={(e)=>{setInputData(e.target.value)}}/>
                    {
                        toggleButton ?
                        <i className="far fa-edit add-btn" onClick={addItem}></i>
                        :
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    }
                    
                </div>
                {/* {show all items} */}

                <div className="showItems">
                    {
                        itemArray.map((item, index)=>{
                            return( 
                            <div className="eachItem" key={index}>
                            <h3>{item.name}</h3>
                            <div className="todo-btn">
                        <i className="far fa-edit add-btn" onClick={()=>editItem(item.id)}></i>
                        <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(item.id)}></i>
                            </div>
                        </div>)
                        })
                    }
                   
                </div>

                 {/* {Remove All Items}  */}
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                        <span>CHECK LIST</span>
                    </button>
                </div>

            </div>
        </div>
        </>
     );
}
 
export default Todo;