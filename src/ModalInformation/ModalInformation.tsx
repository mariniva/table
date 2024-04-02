import React, { FC } from "react";
import { TableItem} from "../store/reducers/TableReducer";
import styles from "./ModalInformation.module.css";


interface ModalInformationProps {
    product: TableItem;
    handleCloseInformationModal: () => void;
}

const ModalInformation: FC<ModalInformationProps> = ({product,handleCloseInformationModal}) => {

    const handleClose = () => {
        handleCloseInformationModal();
    };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.first_row}>
          <h2>Information</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            Close
          </button>
        </div>
        <label>
          Name:
          <span>{product.name}</span>
        </label>
        <label>
          Email:
          <span>{product.email}</span>
        </label>
        <label>
          Count:
          <span>{product.count}</span>
        </label>
        <label>
          Price:
          <span>{product.price}</span>
        </label>
        <label>
        Delivery:
        <span>{product.delivery}</span>
        </label>
        <label>Country: <span>{product.country}</span></label>
        <label>Cities: <ul>{product.city.map(city=><li>{city}</li>)}</ul></label>
      </div>
    </div>
  );
};

export default ModalInformation;
