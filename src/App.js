import "./App.scss";
import axios from "axios";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";

import UrLInputComponent from "./components/urlInput";
import TableSectionComponent from "./components/table";
import PostCodeComponent from "./components/postcode";
import ActionModal from "./components/ItemModal";

const App = (props) => {
  const [onFetch, setFetches] = useState(true);

  // url params
  const [port, setPort] = useState("");
  const [defaultUrl, setUrl] = useState("https://test-backend.baania.dev");
  const endpoint = defaultUrl + `${port ? `:${port}` : ``}`;

  // table
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  // pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [count, setCount] = useState(0);

  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalType, setModalType] = useState("");

  const handleAction = (actionType = "create", data = {}) => {
    setModalType(actionType);
    setModalData(data);
    setModalVisible(true);
  };

  const handleModalConfirm = async () => {
    console.log(modalData, modalType);

    try {
      if (modalType === "create") {
        const url = endpoint + "/home";
        const response = await axios.post(url, modalData);
        console.log("response", response);
      }

      if (modalType === "detail") {
        const url = endpoint + "/home/" + modalData.id;
        const response = await axios.patch(url, modalData);
        console.log("response", response);
      }

      if (modalType === "delete") {
        const url = endpoint + "/home/" + modalData.id;
        const response = await axios.delete(url, modalData);
        console.log("response", response);
      }
      setModalType("success");
      handleFetch();
    } catch (error) {
      setModalType("error");
    }
  };

  const handleFetch = useCallback(async (params) => {
    console.log("fetch")
    try {
      const url = endpoint + `/home?skip=20&take=50`;
      const { data } = await axios.get(url);
      const { payload, count } = data;
      const rows = payload.map((data) => {
        const { id, name, price, post_code } = data;
        const deleteBtn = (
          <Button
            className="btn-red"
            onClick={() => handleAction("delete", data)}
          >
            Delete
          </Button>
        );
        const detailBtn = (
          <Button
            className="btn-yellow"
            onClick={() => handleAction("detail", data)}
          >
            Detail
          </Button>
        );
        return {
          id,
          name,
          price,
          post_code,
          button_group: [detailBtn, deleteBtn],
        };
      });

      setCount(count);
      setColumns(["ID", "Name", "Price", "Post Code", "action"]);
      setRows(rows);
    } catch (error) {
      setModalType("error");
      setModalVisible(true);
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    if (onFetch) handleFetch();

    return () => setFetches(false);
  }, [onFetch, handleFetch]);

  return (
    <div className="container">
      <UrLInputComponent
        port={port}
        url={defaultUrl}
        setUrl={setUrl}
        setPort={setPort}
        fetch={handleFetch}
      />
      <TableSectionComponent
        rows={rows}
        page={page}
        limit={limit}
        columns={columns}
        handleCreate={() => handleAction("create")}
      />
      <PostCodeComponent />
      <ActionModal
        modalData={modalData}
        modalType={modalType}
        visible={modalVisible}
        setModalData={setModalData}
        setVisible={setModalVisible}
        onSubmit={() => handleModalConfirm()}
      />
    </div>
  );
};

export default App;
