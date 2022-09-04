import { useCallback, useContext, useEffect, useState } from "react";
import * as listApi from "../apis/list.api";
import { AuthContext } from "../context/AuthContext";
import { EditableList } from "../types/ListType";

export function useListById() {
  const { token } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [list, setList] = useState<EditableList>({
    title: "",
    _id: "",
    items: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateList = async (list: EditableList) => {
    if (!list._id || !list.items.every((item) => !item.isEdit)) return;

    const listToSend = {
      ...list,
      items: list.items.map((item) => ({
        ...(item._id.slice(0, 4) !== "temp" ? { _id: item._id } : {}),
        isDone: item.isDone,
        value: item.value,
      })),
    };

    try {
      await listApi.updateList(list._id, listToSend, token);
    } catch (error: any) {
      console.log("we have error");

      setError(error.message);
    }
  };

  useEffect(() => {
    updateList(list);
  }, [list]);

  const loadListById = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const response = await listApi.getOneList(id);

      const editableList = {
        ...response,
        items: response.items.map((item) => ({
          ...item,
          isEdit: false,
        })),
      };

      setList(editableList);
      setIsLoading(false);
    } catch (error: any) {
      const errorMessage = error.message || "an error has occurred";
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  const changeListItem = (id: string, newValue: string) => {
    const newValues = list.items.map((item) =>
      item._id === id ? { ...item, value: newValue } : item
    );
    setList({ ...list, items: newValues });
  };

  const changeIsEdit = (id: string, newValue: boolean) => {
    const newValues = list.items.map((item) =>
      item._id === id ? { ...item, isEdit: newValue } : item
    );
    setList({ ...list, items: newValues });
  };

  const changeIsDone = (id: string, newValue: boolean) => {
    const newValues = list.items.map((item) =>
      item._id === id ? { ...item, isDone: newValue } : item
    );
    setList({ ...list, items: newValues });
  };

  const addListItem = () => {
    const newListItems = [...list.items];
    newListItems.push({
      _id: "temp" + Date.now().toString(),
      value: "",
      isDone: false,
      isEdit: true,
    });
    setList({ ...list, items: newListItems });
  };

  function deleteItem(id: string) {
    const newListItems = list.items.filter((el) => el._id !== id);
    setList({ ...list, items: newListItems });
  }

  return {
    list,
    setList,
    isLoading,
    error,
    isError: !!error,
    loadListById,
    changeListItem,
    addListItem,
    changeIsEdit,
    changeIsDone,
    deleteItem,
  };
}
