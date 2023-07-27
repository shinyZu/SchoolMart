import category_bg from "../../../assets/images/Home/Category/ct_pens.jpg";
const footer_bg_texture =
  "https://www.transparenttextures.com/patterns/clean-textile.png";

export const styleSheet = {
  card: {
    // border: "2px solid black",
    // boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.3)",

    "&:hover": {
      cursor: "pointer",
      boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.7)",
      transition: "all 1s ease",
    },
  },

  card_img: {
    // border: "2px solid red",
    // backgroundImage: `url(${category_bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "30vh !important",
  },

  card_description: {
    // border: "2px solid red",
    height: "10vh !important",
    padding: "10px",
    backgroundImage: `url(${footer_bg_texture})`,
  },

  history_card_description: {
    // border: "2px solid red",
    height: "8vh !important",
    padding: "10px",
    backgroundImage: `url(${footer_bg_texture})`,
  },

  txt_prod_ctg: {
    fontSize: "0.8rem",
    color: "#535c68",
    marginBottom: "5px !important",
  },

  txt_prod_name: {
    fontSize: "1.2em",
    marginBottom: "5px !important",
    color: "#484747 !important",
  },

  txt_prod_price: {
    color: "red !important",
  },

  txt_order_details: {
    color: "#484747 !important",
    marginTop: "5px !important",
  },
};
