// import styles from "./styles.module.css";
// import { useEffect } from "react";
// import { fetchCategories } from "../../../redux/slices/categorySlice.js";
// import { useDispatch, useSelector } from "react-redux";
// import { Carousel, Button } from "antd";
// import dryFood from "../../../assets/images/carousel/dry-and-wet-food.png";
// const contentStyle = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "32px",
//   background: "rgb(30 81 213 / 4%)",
//   overflow: "hidden",
//   padding: "40px 0px",
// };

// function CategoriesMain() {
//   const dispatch = useDispatch();
//   const { data, status } = useSelector((state) => state.categories);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCategories());
//     }
//     console.log(data[0].image);
//   }, [status, data, dispatch]);

//   return (
//     <section className={styles.carousel}>
//       <div className={styles.title}>
//         <h2>Categories</h2>
//         <Button>All categories</Button>
//       </div>

//       <Carousel arrows infinite={false}>
//         <div>
//           <ul style={contentStyle}>
//             {data?.map((category) => (
//               <li key={category.id}>
//                 <img src={`http://localhost:3333${category.image}`} alt="dvs" />
//                 <p>{category.title}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <ul style={contentStyle}>
//             <li>
//               {" "}
//               <img src={dryFood} alt="" />
//               <p>Dry and Wet food</p>
//             </li>
//             <li>
//               {" "}
//               <img src={dryFood} alt="" />
//               <p>Dry and Wet food</p>
//             </li>
//             <li>
//               {" "}
//               <img src={dryFood} alt="" />
//               <p>Dry and Wet food</p>
//             </li>
//             <li>
//               {" "}
//               <img src={dryFood} alt="" />
//               <p>Dry and Wet food</p>
//             </li>
//           </ul>
//         </div>
//       </Carousel>

//       <br />
//     </section>
//   );
// }

// export default CategoriesMain;
