import category_bg from "../../../assets/images/Home/Category/ct_writing.jpg";
export const styleSheet = {
  card: {
    // border: "2px solid black",
    // borderRadius: "15px",
    background: "none",
    backgroundImage: `url(${category_bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.3)",
    // backgroundPositionY: "-90px",

    // background: "rgba(255, 255, 255, 0.06)",
    // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    // backdropFilter: "blur(6px)",
    // webkitBackdropFilter: "blur(11.8px)",
    // border: "1px solid rgba(255, 255, 255, 0.2)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&:hover": {
      cursor: "pointer",
      //   backgroundColor: "#34495e !important",
      boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.7)",

      // background: ` linear-gradient(
      //   to bottom,
      //   rgb(0, 0, 0.89),
      //   rgba(0, 0, 0, 0.75),
      //   rgba(0, 0, 0, 0.49),
      //   rgba(0, 0, 0, 0.275),
      //   rgba(0, 0, 0, 0.0)
      //   ),url(${category_bg})`,

      // color: "white !important",
      transition: "all 1s ease",
    },
  },

  txt_category: {
    color: "black",
    fontWeight: "8",
  },
};
