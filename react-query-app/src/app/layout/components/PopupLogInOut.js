import React from "react";
import { Dialog } from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import * as layoutRedux from "../_redux/layoutRedux";
import * as CONST from "../../../Constant";

export default function PopupLogInOut() {
  const dispatch = useDispatch();
  const layoutReducer = useSelector(({ layout }) => layout);
  const authReducer = useSelector(({ auth }) => auth);

  const handleClose = (event, reason) => {
    if (authReducer.authToken) {
      // ให้กดออกได้ถ้ายัง login อยู่
      dispatch(layoutRedux.actions.hidePopupLogInOut());
    }
  };

  return (
    <Dialog
      open={layoutReducer.popupLogInOut}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          margin: 0,
          padding: 0,
          display: "block",
        }}
      >
        <iframe
          width="350"
          height="470"
          frameBorder="0"
          title="sso"
          src={CONST.SSO_URL}
        />
      </div>
    </Dialog>
  );
}
