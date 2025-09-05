import Button from "@mui/material/Button";
import styles from "./styles.module.css";

function Banner() {
  return (
    <section className={styles.banner}>
      <h1>Amazing Discounts on Pets Products!</h1>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#0D50FF",
          borderRadius: "6px",
          padding: "16px 56px",
          fontSize: "20px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Check out
      </Button>
    </section>
  );
}
export default Banner;
