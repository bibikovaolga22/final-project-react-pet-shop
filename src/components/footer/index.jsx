import styles from "./styles.module.css";
import instagram from "../../assets/icons/instagram.svg";
import wa from "../../assets/icons/whatsapp.svg";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
function Footer() {
  const position = [48.1351, 11.582]; // London
  return (
    <section className={styles.footer}>
      <h2>Contact</h2>
      <ul className={styles.mainContainer}>
        <li className={styles.flexOne}>
          <span>Phone</span>
          <p>+49 30 915-88492</p>
        </li>
        <li className={styles.flexTwo}>
          <span>Socials</span>
          <ul className={styles.social}>
            <li>
              <img src={instagram} alt="instagram" />
            </li>
            <li>
              {" "}
              <img src={wa} alt="whatsapp" />
            </li>
          </ul>
        </li>
        <li className={styles.flexThree}>
          {" "}
          <span>Address</span>
          <p>Wallstraẞe 9-13, 10179 Berlin, Deutschland</p>
        </li>

        <li className={styles.flexFour}>
          {" "}
          <span>Working Hours</span>
          <p>24 hours a day</p>
        </li>
      </ul>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "350px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=WluBRS9oOSAZh10Otpg1"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://www.maptiler.com/">MapTiler</a>'
        />
        <Marker position={position}>
          <Popup>📍 Munich, Germany</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
}
export default Footer;
