import { useEffect, useState } from "react";
import {
  MODE_DELETE,
  MODE_EDIT,
  MODE_VIEW,
} from "../components/Table/constants";
import { TypeMode, TypeObjectData } from "../types/types";
import { getStorage, setStorage } from "../utils/helpers";

const initMode = {
  type: "",
  name: "",
};

const initObjectData = {
  name: "",
  type: "",
  color: "",
};

export function useGetTableData() {
  const [mode, setMode] = useState<TypeMode>(initMode);
  const [tempData, setTempData] = useState<TypeObjectData>(initObjectData);
  const [objectData, setObjectData] = useState<TypeObjectData>(initObjectData);
  const [tableData, setTableData] = useState<TypeObjectData[]>([]);
  const [tableInfo, setTableInfo] = useState<TypeObjectData[]>([]);
  const [modalVisibility, setModalVisibility] = useState(false);

  useEffect(() => {
    const storageData = getStorage();
    setTableData(storageData);
  }, []);

  useEffect(() => {
    setStorage(tableData);
  }, [tableData]);

  useEffect(() => {
    if (objectData.name) {
      setTableData((prevState: TypeObjectData[]) =>
        prevState.concat(objectData)
      );
    }
  }, [objectData]);

  useEffect(() => {
    switch (mode.type) {
      case MODE_VIEW:
        return infoMode();
      case MODE_EDIT:
        return editMode();
      case MODE_DELETE:
        return deleteMode();
      default:
        break;
    }
    // eslint-disable-next-line
  }, [mode]);

  const infoMode = () => {
    setModalVisibility(true);
    const viewData = tableData.filter((value) => value.name === mode.name);
    setTableInfo(viewData);
  };

  const editMode = () => {
    setModalVisibility(true);
    const editRow = tableData.filter((value) => value.name === mode.name);
  };

  const deleteMode = () => {
    setTableData((prevState: TypeObjectData[]) =>
      prevState.filter((value) => value.name !== mode.name)
    );
  };

  return {
    mode,
    tempData,
    modalVisibility,
    tableData,
    tableInfo,
    setMode,
    setTempData,
    setObjectData,
    setModalVisibility,
  };
}
