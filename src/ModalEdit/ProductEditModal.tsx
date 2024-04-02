import React, { FC, useState } from "react";
import styles from "./ProductEditModal.module.css";
import { TableItem, updateData } from "../store/reducers/TableReducer";
import Ajv, { ErrorObject } from "ajv";
import { useAppDispatch } from "../hooks/hooks";
import DeliverySection from "./Delivery/DeliverySection";

interface ProductEditModalProps {
  handleCloseEditModal: () => void;
  product: TableItem;
  formPrice: string;
}

const ajv = new Ajv();

const validationSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 15,
    },
    email: {
      type: "string",
      format: "email",
    },
    count: {
      type: "number",
    },
    price: {
      type: "number",
    },
    delivery: {
      type: "string",
      enum: ["empty", "country", "city"],
    },
    country: {
      type: "string",
    },
    city: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["name", "email", "count", "price", "delivery"],
};

const validateData = (data: any) => {
  const validate = ajv.compile(validationSchema);
  const isValid = validate(data);
  if (isValid) {
    return null;
  } else {
    const errors: { [key: string]: string } = {};
    validate.errors?.forEach((error: ErrorObject) => {
      const fieldName = error.dataPath.substring(1); 
      errors[fieldName] = error.message || "Invalid value";
    });
    return errors;
  }
};

const ProductEditModal: FC<ProductEditModalProps> = ({
  product,
  handleCloseEditModal,
  formPrice,
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<TableItem>(product);
  const [errors, setErrors] = useState<any>({});
  const [price, setPrice] = useState<any>(formPrice);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, price: undefined });
    setPrice(e.target.value);
  };

  const handlePriceFocus = () => {
    const newPrice = parseFloat(price.toString().replace(/[^0-9.]/g, ""));
    setPrice(newPrice);
  };

  const handlePriceBlur = () => {
    const newPrice = parseFloat(price.toString().replace(/[^0-9.]/g, ""));
    const parts = newPrice.toString().split(".");
    let formPrice = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts.length > 1) {
      formPrice += "." + parts[1];
    }
    if (newPrice) {
      setPrice("$" + formPrice);
      setFormData({ ...formData, price: newPrice });
    } else {
      setErrors({ price: "Please enter a number" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "delivery") {
      // Clear country and city when delivery option changes
      setFormData({ ...formData, country: "", city: [] });
    }
    if (name === "count" && value.length >= 1) {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    // Clear errors for the field when user starts editing
    setErrors({ ...errors, [name]: undefined });
  };

  const handleBlur = () => {
    const validationErrors = validateData(formData);
    setErrors(validationErrors || {});
  };

  const handleSave = () => {
    if (formData.country && formData.city.length === 0) {
      setErrors({ country: "Please select a city" });
      return;
    }
    const validationErrors = validateData(formData);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    dispatch(updateData(formData));
    handleCloseEditModal();
  };

  const handleClose = () => {
    handleCloseEditModal();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.first_row}>
          <h2>Edit Product</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            Close
          </button>
        </div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? styles.errorInput : ""}
          />
          {errors && errors.name && (
            <span className={styles.errorMsg}>{errors.name}</span>
          )}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? styles.errorInput : ""}
          />
          {errors && errors.email && (
            <span className={styles.errorMsg}>{errors.email}</span>
          )}
        </label>
        <label>
          Count:
          <input
            type="number"
            name="count"
            value={formData.count}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.count ? styles.errorInput : ""}
          />
          {errors && errors.count && (
            <span className={styles.errorMsg}>{errors.count}</span>
          )}
        </label>
        <label>
          Price:
          <input
            type="string"
            name="price"
            value={price}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
            onFocus={handlePriceFocus}
            className={errors.count ? styles.errorInput : ""}
          />
          {errors && errors.price && (
            <span className={styles.errorMsg}>{errors.price}</span>
          )}
        </label>
        <DeliverySection formData={formData} setFormData={setFormData} />
        {errors && errors.country && (
          <span className={styles.errorMsg}>{errors.country}</span>
        )}
        <button onClick={handleSave} className={styles.add_button}>
          Add/Update
        </button>
      </div>
    </div>
  );
};

export default ProductEditModal;
