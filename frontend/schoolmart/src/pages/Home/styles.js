// import home_bg from "../../assets/images/Home/home_bg_9.png";
import home_bg from "../../assets/images/Home/home_bg_6.jpg";
import category_bg from "../../assets/images/Home/Category/ct_pens.jpg";
import logo_footer from "../../assets/images/logo_7.png";
const footer_bg_texture =
  "https://www.transparenttextures.com/patterns/nistri.png";

export const styleSheet = {
  box_container: {
    // border: "2px solid green",
    // maxWidth: "1536px",
    maxWidth: "1300px",
    margin: "auto",
    marginTop: "5px",
    height: "auto",
  },

  //   --------First Container - Titlr & Tagline---------------------

  first_container: {
    // border: "2px solid red",
    // backgroundColor: "#E7CBCB",
    padding: "18vh 0",
    background: "rgba(255, 255, 255, 0.19)",
    backgroundImage: `url(${home_bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    // backgroundPositionX: "200px",
    // opacity: "0.3",
    // backdropFilter: "blur(150px)",
  },

  container_1: {
    // border: "2px solid red",
    marginTop: "0px !important",
    display: "flex",
    justifyContent: "center",
    marginLeft: "0px !important",
    height: "500px",
    marginTop: "30px",
  },

  container_1_left: {
    // border: "1px solid blue",
  },

  container_1_left_1: {
    // border: "2px solid yellow",
    padding: "100px 50px 0px 50px",
  },

  container_1_left_2: {
    // border: "2px solid yellow",
    padding: "20px 100px 0px 50px",
  },

  txt_title: {
    color: "#99627A !important",
  },

  txt_title_description: {
    align: "center",
    textAlign: "right",
  },

  container_1_right: {
    // border: "1px solid blue",
    margin: "auto",
    display: "flex",
  },

  container_1_right_1: {
    // border: "1px solid green",
    // backgroundImage: `url(${home_bg})`,
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    // backgroundPositionX: "200px",
    // backgroundPositionY: "-50px",
  },

  container_1_left_3: {
    // border: "1px solid yellow",
    padding: "20px 0px 0px 50px",
  },

  btn_shop_now: {
    border: "1px #99627A !important",
    // backgroundColor: "#643843 !important",
    // backgroundColor: "#99627A !important",
    backgroundColor: "#AC7088 !important",
    color: "white !important",
    fontFamily: '"Acme", sans-serif !important',
    marginTop: "10px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#99627A !important",
    },
    padding: "10px 60px !important",
    boxShadow: "5px 5px 10px 2px rgb(7 12 8 / 50%) !important",
  },

  //   --------Second Container - Top Categories---------------------

  second_container: {
    // border: "2px solid red",
    marginTop: "5vh",
  },

  container_2_0: {
    // border: "1px solid blue",
    marginTop: "50px !important",
    display: "flex",
    justifyContent: "center",
  },

  container_2_1: {
    // border: "2px solid pink",
  },

  container_2_1_0: {
    // border: "2px solid cyan",
    // height: "400px",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
  },

  card_container_1: {
    // border: "2px solid red",
    // display: "flex",
    // justifyContent: "space-between",
    height: "400px",
    marginTop: "50px",
    // padding: "50px",
  },

  category_link: {
    textDecoration: "none",
    width: "auto",
  },

  //   --------Third Container - New Arrival---------------------
  third_container: {
    // border: "2px solid red",
    marginTop: "5vh",
  },

  container_3_0: {
    // border: "2px solid blue",
    margin: "50px 0px !important",
  },

  container_3_1: {
    // border: "2px solid blue",
  },

  card_container_2: {
    // border: "2px solid pink",
  },
};
