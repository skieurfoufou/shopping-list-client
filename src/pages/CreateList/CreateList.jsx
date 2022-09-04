import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createList } from "../../apis/list.api";
import { AuthContext } from "../../context/AuthContext";
import classes from "./CreateList.module.css";

function CreateList() {
  const [title, setTitle] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const createNewList = async () => {
    console.log(title);
    const res = await createList({ title }, token);
    navigate(`/list-detail?id=${res._id}`);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>CREATE YOUR NEW OWN LIST</h2>
      <br></br>
      <h3>What's your name list ?</h3>
      <input
        className={classes.input}
        value={title}
        placeholder="new title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className={classes.button} onClick={createNewList}>
        create list
      </button>
    </div>
  );
}

export default CreateList;
