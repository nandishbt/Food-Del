import React, { useEffect, useState } from "react";
import "./Update.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Update = ({ foodItem, setUpdate, url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const setDataItems = () => {
    foodItem &&
      setData(() => ({
        name: foodItem.name,
        description: foodItem.description,
        price: foodItem.price,
        category: foodItem.category,
      }));
  };

  const downloadImage = async (imageUrl) => {
    try {
      // Fetch the image using Axios with responseType 'blob'
      const response = await axios.get(imageUrl, { responseType: "blob" });

      // Create a file from the blob
      const blob = response.data;
      const fileName = imageUrl.split("/").pop(); // Extract filename from the URL
      const file = new File([blob], fileName, { type: blob.type });

      // Store the file in the state (or use it as needed)
      setImage(file);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  useEffect(() => {
    setDataItems();

    downloadImage(`${url}/images/` + foodItem.image);
  }, []);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const res = await axios.put(
        `${url}/api/food/edit/${foodItem._id}`,
        formData
      );
      console.log(res);
      // setDataItems()
      // setImage(false);

      setUpdate(false);

      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
      toast.error("error uploading food item");
    }
  };
  
  

  return (
    <div className="update">
      <div className="update-container">
        <div className="close">
          <p onClick={() => setUpdate(false)}>X</p>
        </div>
        <div className="add">
          <form className="flex-col" onSubmit={submitHandler}>
            <div className="add-image flex-col">
              <p>Uplaod Image</p>
              <label htmlFor="image">
                <img src={`${url}/images/` + foodItem.image} alt="" />
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
               
               
              />
            </div>

            <div className="add-name flex-col">
              <p>product name</p>
              <input
                onChange={onchangeHandler}
                value={data.name}
                type="text"
                placeholder="Type here"
                name="name"
                required
              />
            </div>

            <div className="add-desc flex-col">
              <p>Product description</p>
              <textarea
                onChange={onchangeHandler}
                value={data.description}
                name="description"
                placeholder="write desc here"
                rows={10}
                required
              ></textarea>
            </div>

            <div className="add-cat-price">
              <div className="add-price flex-col">
                <p>product price</p>
                <input
                  onChange={onchangeHandler}
                  value={data.price}
                  type="Number"
                  name="price"
                  placeholder="$25"
                  required
                />
              </div>

              <div className="add-category flex-col">
                <p>product category</p>
                <select
                  onChange={onchangeHandler}
                  value={data.category}
                  name="category"
                >
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                </select>
              </div>
            </div>

            <button className="add-btn" type="submit">
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
