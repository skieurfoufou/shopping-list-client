import React, { useState, useEffect } from "react";
import classes from "./ListDetail.module.css";
import EditableText from "../../components/EditableText/EditableText";
import Spinner from "../../components/Spinner/Spinner";

function ListDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const [listItems, setListItems] = useState<
    { id: number; value: string; isEdit: boolean }[]
  >([
    { id: 1, value: "start", isEdit: false },
    { id: 2, value: "middle", isEdit: false },
    { id: 3, value: "end", isEdit: false },
  ]);

  useEffect(() => {
    if (listItems.every((item) => !item.isEdit)) console.log(listItems);
  }, [listItems]);

  const changeListItem = (id: number, newValue: string) => {
    const newValues = listItems.map((el) => {
      if (el.id === id) return { ...el, value: newValue };
      return el;
    });
    setListItems(newValues);
  };

  const changeIsEdit = (id: number, newValue: boolean) => {
    const newValues = listItems.map((el) => {
      if (el.id === id) return { ...el, isEdit: newValue };
      return el;
    });
    setListItems(newValues);
  };

  const addListItem = () => {
    const newListItems = [...listItems];
    newListItems.push({
      id: newListItems.slice(-1)[0].id + 1,
      value: "",
      isEdit: true,
    });
    setListItems(newListItems);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>ListDetail</h2>

      <h3>{"ASd"}</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "72vh",
          overflowY: "scroll",
          alignItems: "center",
          width: "100%",
        }}
      >
        {listItems.map((listItem) => (
          <EditableText
            key={listItem.id}
            onChange={(v) => changeListItem(listItem.id, v)}
            value={listItem.value}
            isEdit={listItem.isEdit}
            setIsEdit={(b) => changeIsEdit(listItem.id, b)}
          />
        ))}
        <div style={{ fontSize: "3rem" }} onClick={addListItem}>
          +
        </div>
      </div>
    </div>
  );
}

export default ListDetail;
