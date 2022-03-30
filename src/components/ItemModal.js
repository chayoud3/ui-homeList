import { Modal, Input } from "antd";

const FormModal = (props) => {
  const { data, setData, type } = props;

  const onDisabled = ["delete"].includes(type)
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-form">
      <div className="form-inline">
        <div className="form-group">
          <div>Name</div>
          <Input
            name={"name"}
            placeholder="Name"
            value={data?.name}
            onChange={onChange}
            disabled={onDisabled}
          />
        </div>

        <div className="form-group">
          <div>Price</div>
          <Input
            placeholder="Price"
            value={data?.price}
            name={"price"}
            onChange={onChange}
            type="number"
            disabled={onDisabled}
          />
        </div>

        <div className="form-group">
          <div>Post Code</div>
          <Input
            placeholder="Post Code"
            value={data?.post_code}
            name={"post_code"}
            onChange={onChange}
            disabled={onDisabled}
          />
        </div>
      </div>

      <div className="form-inline">
        <div className="form-group">
          <div className="label">Description</div>
          <Input.TextArea
            placeholder="Description"
            value={data?.desc}
            name={"desc"}
            onChange={onChange}
            disabled={onDisabled}
          />
        </div>
      </div>
    </div>
  );
};

const App = (props) => {
  const { visible, setVisible, modalType, modalData, setModalData, onSubmit } =
    props;

  if (modalType === "error")
    return (
      <Modal
        centered
        footer={null}
        title={"Error"}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <p>An error occurred</p>
      </Modal>
    );

  if (modalType === "success")
    return (
      <Modal
        centered
        footer={null}
        title={"Success"}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <p>Process successfully.</p>
      </Modal>
    );

  if (modalType === "create")
    return (
      <Modal
        centered
        visible={visible}
        okText={"Create"}
        onOk={() => onSubmit()}
        onCancel={() => setVisible(false)}
        okButtonProps={{ className: "btn-green" }}
      >
        <FormModal data={modalData} setData={setModalData} />
      </Modal>
    );

  if (modalType === "delete")
    return (
      <Modal
        centered
        visible={visible}
        okText={"Delete"}
        onOk={() => onSubmit()}
        title={`Delete Item: ${modalData.id}`}
        onCancel={() => setVisible(false)}
        okButtonProps={{ className: "btn-red" }}
      >
        <FormModal data={modalData} type={modalType} />
      </Modal>
    );

  return (
    <Modal
      centered
      visible={visible}
      okText={"Update"}
      onOk={() => onSubmit()}
      title={`Item Detail: ${modalData.id}`}
      onCancel={() => setVisible(false)}
      okButtonProps={{ className: "btn-yellow" }}
    >
      <FormModal data={modalData} setData={setModalData} />
    </Modal>
  );
};

App.defaultProps = {
  visible: false,
  setVisible: null,
  modalType: "detail",
  modalData: {},
};

export default App;
