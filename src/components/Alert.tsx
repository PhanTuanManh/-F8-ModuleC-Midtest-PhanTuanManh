// src/components/Alert.tsx

import React from "react";
import { notification, Button } from "antd";

interface AlertProps {
  typeAlert: "success" | "info" | "warning" | "error";
  desAlert: string;
}

const CustomAlert: React.FC<AlertProps> = ({ typeAlert, desAlert }) => {
  let message = "";
  switch (typeAlert) {
    case "success":
      message = "Thành công";
      break;
    case "info":
      message = "Thông tin";
      break;
    case "warning":
      message = "Cảnh báo";
      break;
    case "error":
      message = "Lỗi";
      break;
    default:
      message = "Thông báo";
  }

  notification[typeAlert]({
    message: message,
    description: desAlert,
    placement: "topRight",
    duration: 3,
  });

  return null;
};

export default CustomAlert;
