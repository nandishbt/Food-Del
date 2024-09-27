import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
 

  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

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
      const res = await axios.post(`${url}/api/food/add`, formData);
      console.log(res);
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);

      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
      toast.error("error uploading food item");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={submitHandler}>
        <div className="add-image flex-col">
          <p>Uplaod Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
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
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
