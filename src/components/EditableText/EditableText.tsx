import { PropsWithChildren } from "react";
import classes from "./EditableText.module.css";
import edit from "./edit_icon.svg";
import save from "./save_icon.svg";
import menu from "./3dots_icon.svg";
import deleteImg from "./delete_icon.svg";

interface EditableTextProps extends PropsWithChildren {
  onChange: (v: string) => void;
  onDelete: () => void;
  value: string;
  isEdit: boolean;
  setIsEdit: (b: boolean) => void;
}

function EditableText({
  onChange,
  isEdit,
  setIsEdit,
  onDelete,
  value,
}: EditableTextProps) {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    onChange(targetValue);
  };

  function handleDoubleClick() {
    console.log("i had doubleClicked");
  }

  return (
    <div className={classes.inputText} onDoubleClick={handleDoubleClick}>
      {isEdit ? (
        <input
          className={classes.input}
          placeholder={"write here"}
          value={value}
          onChange={onValueChange}
          maxLength={22}
          autoFocus
        />
      ) : (
        <p className={classes.p}>{value}</p>
      )}
      <div className={classes.containerButton}>
        <div className={classes.button} onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? (
            <img
              src={save}
              className={classes.appLogo}
              alt="save"
              height="25px"
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
        <div className={classes.button} onClick={onDelete}>
          <img
            src={deleteImg}
            className={classes.appLogo}
            alt="delete"
            height="25px"
          />
        </div>
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
