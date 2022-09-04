import React, { useState, useEffect } from "react";
import classes from "./ListPage.module.css";
import { getAllLists } from "../../apis/list.api";
import Spinner from "../../components/Spinner/Spinner";
import DisplayList from "./DisplayList/DisplayList";
import { List } from "../../types/ListType";

function ListPage() {
  const [lists, setLists] = useState<List[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllLists = async () => {
    setIsLoading(true);
    try {
      const response = await getAllLists({});
      //TODO: make the sort by name in mongoose not in front
      const sortedRes = response.sort((a: any, b: any) =>
        a.title < b.title ? -1 : 1
      );
      setLists(sortedRes);
    } catch (error: any) {
      if (error.response.status === 404) {
        setLists([]);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadAllLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>MY LISTS</h2>
      <br></br>
      {!isLoading && lists.length > 0 && <DisplayList lists={lists} />}
      {!isLoading && lists.length === 0 && <p>there is no lists</p>}
      {isLoading && <Spinner />}
    </div>
  );
}

export default ListPage;
