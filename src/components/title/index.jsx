import { Button } from "antd";
import styles from "./styles.module.css";
function Title({ title, buttonText }) {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
      <div className={styles.line_container}>
        <div className={styles.line}></div>
        <Button> {buttonText}</Button>
      </div>
    </div>
  );
}
export default Title;
