import category_bg from "../../assets/images/Home/Category/ct_writing.jpg";

export const styleSheet = {
  box_container: {
    // border: "2px solid green",
    maxWidth: "1300px",
    margin: "auto",
    // height: "90vh",
  },

  main_container_1: {
    // border: "2px solid red",
    marginTop: "10vh",
    height: "50vh",
  },

  container_left: {
    // border: "2px solid blue",
    // backgroundImage: `url(${category_bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // padding: "18vh 0",
  },

  container_right: {
    // border: "2px solid blue",
  },

  container_right_1: {
    // border: "2px solid black",
    padding: "10px",
    height: "fit-content",
    marginBottom: "0px !important",
  },

  txt_prod_ctg: {
    fontSize: "0.8rem",
    color: "#535c68",
    marginBottom: "5px !important",
  },

  txt_prod_name: {
    fontSize: "1.8rem",
    marginBottom: "5px !important",
  },

  txt_prod_price: {},

  container_right_1_para: {
    fontSize: "0.9rem",
    margin: "2vh 0",
  },

  // ----------Qty Changer------------

  //   ------- Add to Cart button --------

  container_right_2: {
    // border: "2px solid blue",
    padding: "10px",
  },

  btn_add_to_cart: {
    border: "1px #AC7088 !important",
    backgroundColor: "#AC7088 !important",
    color: "white !important",
    fontFamily: '"Acme", sans-serif !important',
    marginTop: "10px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#99627A !important",
    },
    padding: "10px 60px !important",
  },

  //   ---------- Related Products -----------
  main_container_2: {
    // border: "2px solid red",
    marginTop: "6vh",
    // height: "50vh",
  },

  container_2_0: {
    // border: "2px solid blue",
  },

  txt_title: {
    color: "#643843 !important",
  },

  container_2_1: {
    // border: "2px solid blue",
    marginTop: "6vh",
  },

  card_container_2: {
    // border: "2px solid pink",
  },
};
