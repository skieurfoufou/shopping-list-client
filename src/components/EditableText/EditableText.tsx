import { PropsWithChildren } from "react";
import classes from "./EditableText.module.css";
import edit from "./edit_icon.svg";
import save from "./save_icon.svg";

interface EditableTextProps extends PropsWithChildren {
  onChange: (v: string) => void;
  value: string;
  isEdit: boolean;
  setIsEdit: (b: boolean) => void;
}

function EditableText({
  onChange,
  isEdit,
  setIsEdit,
  value,
}: EditableTextProps) {
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    onChange(targetValue);
  };
  return (
    <div className={classes.inputText}>
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
              height="35px"
            />
          ) : (
            <img
              src={edit}
              className={classes.appLogo}
              alt="edit"
              height="35px"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditableText;
