import React from "react";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;
const showDeleteConfirm = (props) => {
  const { text, title, action, dispatch } = props;
  confirm({
    title: title,
    icon: <ExclamationCircleFilled />,
    content: text,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      dispatch(action);
    },
    onCancel() {
      return;
    },
  });
};

export default showDeleteConfirm;
