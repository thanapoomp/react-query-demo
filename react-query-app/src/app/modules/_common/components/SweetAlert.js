/* eslint-disable no-restricted-imports */
import Swal from "sweetalert2";
import { red } from "@material-ui/core/colors";

export const swalInfo = (title, text) => {
  return Swal.fire({
    title: title,
    text: text,
  });
};

export const swalConfirm = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: "question",
    iconHtml: "?",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    showCancelButton: true,
    cancelButtonColor: red[100],
    allowOutsideClick: false,
  });
};

export const swalError = (title, text) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
  });
};

export const swalSuccess = (title, text) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
  });
};
