import styles from "./styles.module.css";
import img from "../../../assets/images/image.svg";
function FormContainer() {
  return (
    <section className={styles.formContainer}>
      <h3>5% off on the first order</h3>
      <div className={styles.container}>
        <img src={img} alt="Dogs" />

        <form>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Email" />
          <button>Get a discount</button>
        </form>
      </div>
    </section>
  );
}
export default FormContainer;
