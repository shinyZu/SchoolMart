import category_bg from "../../../assets/images/Home/Category/ct_pens.jpg";
export const styleSheet = {
  card: {
    // border: "2px solid black",
    boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.3)",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.7)",
      transition: "all 1s ease",
    },
  },

  card_img: {
    // border: "2px solid red",
    backgroundImage: `url(${category_bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "30vh !important",
  },

  card_description: {
    // border: "2px solid red",
    height: "10vh !important",
    padding: "10px",
  },

  txt_prod_ctg: {
    fontSize: "0.8em",
    color: "#535c68",
    marginBottom: "5px !important",
  },

  txt_prod_name: {
    fontSize: "1.2em",
    marginBottom: "5px !important",
  },

  txt_prod_price: {},
};
