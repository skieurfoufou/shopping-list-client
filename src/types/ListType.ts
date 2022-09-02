export type List = {
  _id: string;
  title: string;
  items: ListItem[];
};

export type ListItem = {
  value: string;
  isDone: boolean;
  _id: string;
};

export type UpdateList = {
  _id: string;
  title: string;
  items: UpdateListItem[];
};

export type UpdateListItem = {
  value: string;
  isDone: boolean;
  _id?: string;
};

export type EditableListItem = ListItem & { isEdit: boolean };

export type EditableList = Omit<List, "items"> & {
  items: EditableListItem[];
};
