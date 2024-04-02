import React, { useState } from "react";
import style from "./ModalDelete.module.css";
import ModalEdit from "../ModalEdit/ProductEditModal";
import { useAppDispatch } from "../hooks/hooks";
import { TableItem, deleteData } from "../store/reducers/TableReducer";

interface ModalDeleteProps {
  product: TableItem;
  handleCloseModal: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ handleCloseModal,product }) => {
  
  const dispatch = useAppDispatch();
  const handleYesClick = () => {
    dispatch(deleteData(product))
  }
  return (
    <div className={style.modal}>
      <div className={style.modal_content}>
        <h2>Are you sure?</h2>
        <div className={style.modal_btn}>
          <button className={style.btn} onClick={handleCloseModal}>
            No
          </button>
          <button className={`${style.btn} ${style.btn_delete}`} onClick={handleYesClick}>
            Yes
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
