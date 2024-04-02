import React, { useState } from "react";
import { TableItem } from "../store/reducers/TableReducer";
import ModalDelete from "../ModalDelete/ModalDelete";
import styles from './ProductRow.module.css';
import ProductEditModal from "../ModalEdit/ProductEditModal";
import ModalInformation from "../ModalInformation/ModalInformation";

interface ProductRowProps {
  product: TableItem;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInformationModal, setShowInformationModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleEditModal = () => {
    setShowEditModal(true);
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleInformationModal = () => {
    setShowInformationModal(true);
  }

  const handleCloseInformationModal = () => {
    setShowInformationModal(false);
  };
  
  
  const parts = product.price.toString().split(".") ;
  let formPrice = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (parts.length > 1) {
    formPrice += "." + parts[1];
  }

  return (
    <tr>
      <td className={styles.name} onClick={handleInformationModal}>{product.name} <span className={styles.count}>{product.count}</span></td>
      {showInformationModal && <ModalInformation product={product} handleCloseInformationModal={handleCloseInformationModal}/>}
      <td>${formPrice}</td>
      <td>
        <button className={`${styles.btn} ${styles.btn_change}` } onClick={handleEditModal}>Change</button>
        {showEditModal && <ProductEditModal handleCloseEditModal={handleCloseEditModal} product={product} formPrice={`$${formPrice}`}/>}
        <button className={`${styles.btn} ${styles.btn_delete}`} onClick={handleDeleteClick}>
          Delete
        </button>
        {showDeleteModal && <ModalDelete handleCloseModal={handleCloseModal} product={product}/>}
      </td>
    </tr>
  );
};

export default ProductRow;
