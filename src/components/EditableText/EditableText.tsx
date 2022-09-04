import { PropsWithChildren, useState } from "react";
import classes from "./EditableText.module.css";
import edit from "./edit_icon.svg";
import save from "./save_icon.svg";

import deleteImg from "./delete_icon.svg";

interface EditableTextProps extends PropsWithChildren {
  onChange: (v: string) => void;
  onDelete: () => void;
  value: string;
  isEdit: boolean;
  isDone: boolean;
  setIsEdit: (b: boolean) => void;
  setIsDone: (b: boolean) => void;
}

function EditableText({
  onChange,
  isEdit,
  isDone,
  setIsEdit,
  setIsDone,
  onDelete,
  value,
}: EditableTextProps) {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    onChange(targetValue);
  };

  return (
    <div className={`${classes.inputText} ${isDone ? classes.done : ""}`}>
      {isEdit ? (
        <input
          className={classes.input}
          placeholder={"write here"}
          value={value}
          onChange={onValueChange}
          // maxLength={22}
          autoFocus
        />
      ) : (
        <p
          onClick={() => {
            if (!isEdit) setIsDone(!isDone);
          }}
          className={classes.p}
        >
          {value}
        </p>
      )}
      <div className={classes.containerButton}>
        <div className={classes.button} onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? (
            <img
              src={save}
              className={classes.appLogo}
              alt="save"
              height="20px"
            />
          ) : (
            <img
              src={edit}
              className={classes.appLogo}
              alt="edit"
              height="25px"
            />
          )}
        </div>
        {onDelete && (
          <div className={classes.button} onClick={onDelete}>
            <img
              src={deleteImg}
              className={classes.appLogo}
              alt="delete"
              height="25px"
            />
          </div>
        )}
        {/* <div>
          <img
            src={menu}
            className={classes.appLogo}
            alt="menu"
            height="35px"
          />
        </div> */}
      </div>
    </div>
  );
}

export default EditableText;
