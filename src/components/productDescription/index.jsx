import styles from "./styles.module.css";
import img from "../../assets/images/sales.png";
function ProductDescription() {
  return (
    <section className={styles.productsDescription}>
      <div className={styles.gallery}>
        <ul className={styles.small}>
          <li className={styles.itemOne}>
            <img src={img} alt="" />
          </li>
          <li className={styles.itemTwo}>
            <img src={img} alt="" />
          </li>
          <li className={styles.itemThree}>
            <img src={img} alt="" />
          </li>
        </ul>
        <img src={img} alt="" className={styles.bigImg} />
      </div>
      <div className={styles.mainContent}>
        <h4>BELCANDO Dog Food</h4>
        <ul className={styles.itemPrice}>
          <li>$23</li>
          <li className={styles.oldPrice}>$35</li>
          <li className={styles.discountItem}>-17%</li>
        </ul>

        <div className={styles.add_to_cart}>
          <div className={styles.add_item}>
            <button className={styles.minus}>-</button>
            <p>1</p>
            <button className={styles.plus}>+</button>
          </div>
          <button className={styles.add_to_cart_btn}>Add to cart</button>
        </div>
        <div className={styles.description}>
          <h5>Description</h5>
          <p>
            Versatile selection: discover the culinary world for your little
            four-legged friend with 2 types of dry food and 6 types of wet food.
            So there is something for every taste. High acceptance: our balanced
            formula is rich in essential nutrients, vitamins and minerals and is
            tailored to the needs of small dog breeds. An all-round supply that
            leaves nothing to be desired. Dry food: Finest GF Lamb - easily
            digestible and a croquette coated with instant sauce for extra
            taste. Finest Croc - rich in meat and with grape seed flour. Wet
            food: you will receive a selection of different types of wet food
            from our range: single protein chicken, single protein buffalo, duck
            with rice and cranberries, rabbit with millet and sweet potato, lamb
            with rice and
          </p>
          <span className={styles.readMore}>Read more</span>
        </div>
      </div>
    </section>
  );
}
export default ProductDescription;
