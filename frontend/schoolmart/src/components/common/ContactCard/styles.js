const footer_bg_texture =
  "https://www.transparenttextures.com/patterns/clean-textile.png";

export const styleSheet = {
  contact_container: {
    // border: "2px solid orange",
    // marginTop: "5vh",
  },

  contact_card_container: {
    border: "2px solid #D25380",
    padding: "30px",
    backgroundImage: `url(${footer_bg_texture})`,

    "&:hover": {
      cursor: "pointer",
      boxShadow: "4px 8px 10px rgba(0, 0, 0, 0.7)",
      transition: "all 0.5s ease",
    },
  },

  icon_container: {
    // border: "2px solid blue",
  },

  info_container: {
    // border: "2px solid red",
  },

  icon_img: {
    cursor: "pointer",
    color: "#D25380",
    width: "100px !important",
    height: "100px !important",
  },

  contact_info: {
    padding: "10px",
  },
};
