import styles from "./styles.module.css";
import four from "../../assets/images/four.svg";
import notFound from "../../assets/images/notFound.png";
import { Button } from "antd";

function PageIsNotFound() {
  return (
    <section className={styles.page_not_found}>
      <div className={styles.main_content}>
        <ul className={styles.image_container}>
          <li>
            <img src={four} alt="" />
          </li>
          <li>
            <img src={notFound} alt="" />
          </li>
          <li>
            <img src={four} alt="" />
          </li>
        </ul>
        <ul className={styles.text_container}>
          <li>
            {" "}
            <h4>Page Not Found</h4>
          </li>
          <li>
            {" "}
            <p>
              We’re sorry, the page you requested could not be found. Please go
              back to the homepage.
            </p>
          </li>
          <li>
            <Button type="primary">Go Home</Button>
          </li>
        </ul>
      </div>
    </section>
  );
}
export default PageIsNotFound;
