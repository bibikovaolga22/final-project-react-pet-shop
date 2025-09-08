import cartImage from "../../assets/images/sales.png";
import styles from "./styles.module.css";
function SalesItem() {
  return (
    <ul>
      <li>
        <img src={cartImage} alt="" />
        <div className={styles.text}>
          <p>Dry dog Food for adult...</p>
          <h2>
            $80 <span>$100</span>
          </h2>
        </div>
      </li>
      <li>
        <img src={cartImage} alt="" />
      </li>
      <li>
        <img src={cartImage} alt="" />
      </li>
      <li>
        <img src={cartImage} alt="" />
      </li>
    </ul>
  );
}
export default SalesItem;
