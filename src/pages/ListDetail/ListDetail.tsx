import React, { useState, useEffect } from "react";
import classes from "./ListDetail.module.css";
import EditableText from "../../components/EditableText/EditableText";
import Spinner from "../../components/Spinner/Spinner";
import { Link, useSearchParams } from "react-router-dom";
import { useListById } from "../../hooks/useListById";

function ListDetail() {
  const {
    loadListById,
    isError,
    error,
    list,
    isLoading,
    addListItem,
    changeIsEdit,
    changeListItem,
    deleteItem,
  } = useListById();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) {
      throw new Error("no id for list");
    }
    loadListById(id);
  }, [searchParams, loadListById]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || error) {
    return <p>Error has occurred -- {error}</p>;
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>{list.title}</h2>

      <div className={classes.detailList}>
        {list.items.map((item) => (
          <EditableText
            key={item._id}
            onChange={(v) => changeListItem(item._id, v)}
            value={item.value}
            isEdit={item.isEdit}
            setIsEdit={(b) => changeIsEdit(item._id, b)}
            onDelete={() => deleteItem(item._id)}
          />
        ))}
        <div className={classes.add} onClick={addListItem}>
          +
        </div>
      </div>
    </div>
  );
}

export default ListDetail;
