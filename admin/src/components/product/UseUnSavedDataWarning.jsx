import { useEffect, useState } from "react";
import { Modal } from "antd";
const UseUnSavedDataWarning = (
  message = "Some data not changed click ok to save and no to continue editing ?"
) => {
  const [isDirty, setIsDirty] = useState(false);
  console.log(isDirty);

  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = () => message;
    } else {
      window.onbeforeunload = undefined;
    }
  }, [isDirty]);

  const routerPrompt = Modal.warning({
    title: "Warning",
    content: "Please save changes first",
  });
  return [routerPrompt, () => setIsDirty(true), () => setIsDirty(false)];
};

export default UseUnSavedDataWarning;
