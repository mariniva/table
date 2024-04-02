import { useEffect, useState } from "react";
import "./App.css";
import ProductTable from "./ProductTable/ProductTable";
import store from "./store/store";
import { TableItem, loadData } from "./store/reducers/TableReducer";
import ProductEditModal from "./ModalEdit/ProductEditModal";
import { v4 as uuidv4 } from "uuid";

const App: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    store.dispatch(loadData());
  }, []);

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const product: TableItem = {
    id: uuidv4(),
    name: "",
    email: "",
    count: 1,
    price: 0,
    delivery: "empty",
    country: "",
    city: [],
  };

  return (
    <div className="App">
      <button onClick={handleOpenEditModal}>Add New</button>
      {showEditModal && (
        <ProductEditModal
          handleCloseEditModal={handleCloseEditModal}
          product={product}
          formPrice={`$${product.price}`}
        />
      )}
      <ProductTable />
    </div>
  );
};

export default App;
