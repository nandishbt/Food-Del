import React, { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";
import axios from "axios";
import Update from "../../components/Update/Update";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [update,setUpdate] = useState(false)

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      setList(res.data.data);
    } catch (error) {
      toast.error("Error while fetching food list");
    }
  };

  const deleteFoodItem = async (id)=>{
    try {

      const res = await axios.delete(`${url}/api/food/remove/`+id)

      toast.success("Food item deleted successfully")
      
      
    } catch (error) {
      toast.error('error deleting food item')
    }
  }


  useEffect(()=>{
    fetchFoodList(); 

  },[list])


  return (
    <div className="list">
      {list && update && <Update foodlist = {list} setUpdate = {setUpdate} url={url}/>}
      <h2>All food Items</h2>
      <div className="list-heading heading">
        <b>Image</b>
        <b>Name </b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      <hr />

      <div className="list-items flex-col ">
        {list && 
            list.map((item,index)=>{
              return(
               <div>
                 <div className="item list-heading" key={index}>
                  <img src={`${url}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price}</p>
                  <div className="edit-delete ">
                    <p onClick={()=>setUpdate(true)} className="cursor">🖊</p>
                    <p onClick={()=>deleteFoodItem(item._id)} className="cursor">X</p>
                  </div>
                 
                </div>
                <hr />
               </div>
              )
            })
        }
        </div>
    </div>
  );
};

export default List;
