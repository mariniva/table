import React, { FC, useState } from "react";
import styles from "./DeliverySection.module.css";
import { TableItem } from "../../store/reducers/TableReducer";
import City from "./City/City";

interface DeliverySectionProps {
  formData: TableItem;
  setFormData: React.Dispatch<React.SetStateAction<TableItem>>;
}

const DeliverySection: FC<DeliverySectionProps> = ({
  formData,
  setFormData,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(formData.country);

  type Cities = {
    [key: string]: string[];
  };

  const cities: Cities = {
    Russia: ["Moscow", "Saint Petersburg", "Novosibirsk"],
    USA: ["New York", "Los Angeles", "Chicago"],
    Japan: ["Tokyo", "Kyoto", "Sapporo"],
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setSelectedCountry(name);
    setFormData({ ...formData, country: name, city: [] });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, city: [...formData.city, name] });
    } else {
      setFormData({
        ...formData,
        city: formData.city.filter((c: string) => c !== name),
      });
    }
  };

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "empty" || value === "country" || value === "city") {
      setFormData({ ...formData, delivery: value });
    }
  };

  const isChecked = (city: string) => {
    return formData.city.includes(city);
  };

  return (
    <>
      <label>
        Delivery:
        <select
          name="delivery"
          value={formData.delivery}
          onChange={handleDeliveryChange}
        >
          <option value="empty">Empty</option>
          <option value="country">Country</option>
          <option value="city" disabled={!formData.country}>
            City
          </option>
        </select>
      </label>
      {formData.delivery === "country" && (
        <div>
          <label>Country:</label>
          <div>
            <label htmlFor="radio-russia" className={styles.inline}>
              <input
                id="radio-russia"
                type="radio"
                name="Russia"
                checked={selectedCountry === "Russia"}
                onChange={handleCountryChange}
              />
              Russia
            </label>
            <label htmlFor="radio-usa" className={styles.inline}>
              <input
                id="radio-usa"
                type="radio"
                name="USA"
                checked={selectedCountry === "USA"}
                onChange={handleCountryChange}
              />
              USA
            </label>
            <label htmlFor="radio-japan" className={styles.inline}>
              <input
                id="radio-japan"
                type="radio"
                name="Japan"
                checked={selectedCountry === "Japan"}
                onChange={handleCountryChange}
              />
              Japan
            </label>
          </div>
        </div>
      )}
      {formData.delivery === "city" && (
        <div>
          <label>Cities:</label>
          {cities[selectedCountry].map((city) => (
            <City
              name={city}
              isChecked={isChecked(city)}
              handleCityChange={handleCityChange}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default DeliverySection;
