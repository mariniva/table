import { FC } from "react";
import styles from "./City.module.css";

interface CityProps {
  name: string;
  isChecked: boolean;
  handleCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const City: FC<CityProps> = ({ name, isChecked, handleCityChange }) => {
  return (
    <div>
      <label htmlFor={`checkbox-${name}`} className={styles.inline}>
        <input
          id={`checkbox-${name}`}
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={handleCityChange}
          className={styles.inline}
        />
        {name}
      </label>
    </div>
  );
};

export default City;
