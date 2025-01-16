import React, { useEffect } from "react";
import { useState } from "react";
import View from "./View";
function Form() {
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState({});

  const validation = () => {
    let tempError = {};
    if (!user.name) tempError.name = "name is required";
    if (!user.age) tempError.age = "age is required";
    if (!user.address) tempError.address = "address is required";
    if (!user.gender1) tempError.gender1 = "gender is required";
    if (!user.city) tempError.city = "city is required";
    setError(tempError);
    return Object.keys(tempError).length == 0;
  };

  useEffect(() => {
    let oldList = JSON.parse(localStorage.getItem("list")) || [];
    setList(oldList);
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) return;
    let newList = [];
    if (editId == null) {
      newList = [...list, { ...user, id: Date.now() }];
    } else {
      newList = list.map((item) => {
        if (item.id === editId) {
          return user;
        }
        return item;
      });
      setEditId(null);
    }
    localStorage.setItem("list", JSON.stringify(newList));
    setList(newList);
    console.log(user);
    setUser({});
  };
  const handleEdit = (id) => {
    let user = list.find((item) => item.id == id);
    setUser(user);
    setEditId(id);
  };
  const handleDelete = (id) => {
    let newList = list.filter((item) => item.id != id);
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };

  return (
    <>
      <form className="bg-success mx-auto mt-3 center" onSubmit={handleSubmit}>
        <h2 className="text-center">Form</h2>
        <label>Enter your name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={user.name || ""}
        />
        {error.name && <div className="text-danger">{error.name}</div>}
        <br />
        <label>Enter your age:</label>
        <input
          type="number"
          name="age"
          onChange={handleChange}
          value={user.age || ""}
        />
        {error.age && <div className="text-danger">{error.age}</div>}
        <br />
        <label>Enter your address:</label>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={user.address || ""}
        />
        {error.address && <div className="text-danger">{error.address}</div>}
        <br />
        <div className="mx-auto w-50">
          <label>Enter your gender:</label>
          <select
            className="form-select form-select-sm w-50 center mx-auto mb-3"
            onChange={handleChange}
            name="city"
            value={user.gender || ""}
          >
            <option value="" disabled>
              Open this select menu
            </option>
            <option value="surat">surat</option>
            <option value="mumbai">mumbai</option>
            <option value="delhi">delhi</option>
            <option value="kolkata">kolkata</option>
          </select>
          {error.city && <div className="text-danger">{error.city}</div>}
        </div>
        <div className="mx-auto w-50">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender1"
              value="male"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender1"
              value="female"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Female
            </label>
          </div>
          {error.gender1 && <div className="text-danger">{error.gender1}</div>}
        </div>
        <br />
        <button type="submit" className="mb-3">
          Submit
        </button>
      </form>
      <View list={list} handleEdit={handleEdit} handleDelete={handleDelete} />
    </>
  );
}

export default Form;