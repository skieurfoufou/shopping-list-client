import React, { useState, useEffect, useContext, useRef } from "react";
import classes from "./ListDetail.module.css";
import EditableText from "../../components/EditableText/EditableText";
import Spinner from "../../components/Spinner/Spinner";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useListById } from "../../hooks/useListById";
import menu from "./3dots_icon.svg";
import edit from "./edit_icon.svg";
import deleteImg from "./delete_icon.svg";
import { deleteList } from "../../apis/list.api";
import { AuthContext } from "../../context/AuthContext";
import SnackBar, { SnackbarRef } from "../../components/SnackBar/SnackBar";

const SnackBarType = {
  success: "success",
  fail: "fail",
};

function ListDetail() {
  const {
    loadListById,
    isError,
    error,
    list,
    isLoading,
    addListItem,
    changeIsEdit,
    changeIsDone,
    changeListItem,
    deleteItem,
  } = useListById();

  const [searchParams] = useSearchParams();
  const [isOpenIcons, setIsOpenIcons] = useState(false);
  const { token } = useContext(AuthContext);
  const snackbarRef = useRef<SnackbarRef>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) {
      throw new Error("no id for list");
    }
    loadListById(id);
  }, [searchParams, loadListById]);

  const handleDeleteList = () => {
    setIsOpenIcons(false);
    console.log("delete list");
    const id = searchParams.get("id");
    if (!id) {
      throw new Error("no id for list");
    }
    deleteList(id, token);
    snackbarRef.current?.show();
    navigate("/list");
  };

  const handleEditTitle = () => {
    setIsOpenIcons(false);
    console.log("edit title");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || error) {
    return <p>Error has occurred -- {error}</p>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>{list.title} </h2>
        <div className={classes.button} onClick={() => setIsOpenIcons(true)}>
          <img
            src={menu}
            className={classes.appLogo}
            alt="save"
            height="25px"
          />
          {isOpenIcons && (
            <>
              <img
                src={edit}
                className={classes.appLogo}
                alt="edit"
                height="25px"
                onClick={handleEditTitle}
              />
              <img
                src={deleteImg}
                className={classes.appLogo}
                alt="delete"
                height="25px"
                onClick={handleDeleteList}
              />
            </>
          )}
        </div>
        <SnackBar
          ref={snackbarRef}
          message="list deleted"
          type={SnackBarType.success}
        />
      </div>
      <div className={classes.detailList}>
        {list.items.map((item) => (
          <EditableText
            key={item._id}
            onChange={(v) => changeListItem(item._id, v)}
            value={item.value}
            isEdit={item.isEdit}
            setIsEdit={(bool) => changeIsEdit(item._id, bool)}
            isDone={item.isDone}
            setIsDone={(bool) => changeIsDone(item._id, bool)}
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
