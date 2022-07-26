import "./style.css";
const Todo = () => {
    return ( 
        <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src="./images/todo.svg" alt= "todo-logo" />
                    <figcaption>Add Your List here 👌</figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder = "✍️ Add Item" className = "form-control"/>
                </div>

            </div>
        </div>
        </>
     );
}
 
export default Todo;