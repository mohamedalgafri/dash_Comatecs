import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addOne, changeName, munOne } from "./counterSlice";

const Counter = () => {
  const [name, setName] = useState("");

  const data = useSelector((state) => state.counter);

  const dispatch = useDispatch();

  const addE = () => {
    dispatch(addOne());
  };
  const addM = () => {
    dispatch(munOne());
  };
  const changeNameI = () => {
    dispatch(changeName(name));
  };

  return (
    <>
      <button onClick={addE}>+</button>
      <input type="text" value={data.value} />
      <button onClick={addM}>-</button>

      <br />
      <br />
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="name"
      />
      <button onClick={changeNameI}>change name</button>
      <input type="text" value={data.name} />
    </>
  );
};

export default Counter;
