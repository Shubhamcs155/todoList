import React,{useState,useEffect} from 'react';
import todo from '../images/myImage.png';

// to get the data from LS

const getLocalItems = () =>{
  let lst = localStorage.getItem('list');
  if(lst){
    return JSON.parse(lst);
  }else {
    return [];
  }
}

const Todo = () => {

  const [inputData,setInputData] = useState('');
  const [items,setItems] = useState(getLocalItems());
  const [dl,setDl] = useState(false);
  const[cc,setCC] = useState(null);
  let curItem = -1;
  const addItem = () => {
    if(!inputData){
      alert("Please fill the input properly");
      return;
    }
    console.log(inputData);
    setItems([...items,inputData]);
    setInputData("");
    console.log(items)
  }

  const rmItem = ()=>{
    let updatedItems = [];
    for (let i = 0; i < items.length; i++) {
      if (i!==curItem) {
        updatedItems.push(items[i]);
      }
      setItems(updatedItems);
    }
  }

  const editItem = ()=>{
    setInputData(items[curItem]);
    setCC(curItem);
    setDl(true);
  }

  const updateItem = () =>{
    curItem = cc;
    let updatedItems = [];
    for (let i = 0; i < items.length; i++) {
      
      if (i!==curItem) {
        updatedItems.push(items[i]);
      }else{
        updatedItems.push(inputData);
        setInputData("");
        setDl(false);
      }
      setItems(updatedItems);
    }
  }

// saving data to local storage
useEffect(() => {
  localStorage.setItem('list',JSON.stringify(items))
},[items]);

  return (
    <div className='main-div'>
        <div className="child-div">
            <figure>
                <img src={todo} alt="todologo"/>
            </figure>
            <figcaption style={{fontSize:"18px"}}>Add your todos here.</figcaption>
        
            <div className="addItems">
                <input type="text" name=" Add your Item" value={inputData} id='inpItem' onChange={(e)=>{setInputData(e.target.value);}}/>
                {
                  dl ? <i className="far fa-edit add-btn" title="Edit Item" onClick={() => {updateItem();}}></i>:
                  <i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i>               
                }
            </div>

            <div className="showItems">
            {
              items.map((elem,ind)=>{
                return(
                  <div className="eachItem" key={ind}>
                    <h3>{elem}</h3>
                    <div className="todo-btn">
                      <i className="far fa-edit add-btn" title="Edit Item" onClick={() => {curItem=ind;editItem()}}></i>
                      <i className="far fa-trash-alt add-btn" title='Delete Item' onClick={() => {curItem = ind;rmItem()}}></i>
                    </div>
                  </div>
                )
              })
            }  
            </div>
          <div className="showItems">
            <button className="btn effect04" onClick={() => setItems([])}><span>Remove All</span></button>
          </div>
        </div>
    </div>
  )
}

export default Todo