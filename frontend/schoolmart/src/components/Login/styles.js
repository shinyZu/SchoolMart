export const styleSheet = {
  login_container: {
    // border: "6px solid red",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px 20px",
    // border: "1px solid #ccc",
    borderRadius: " 4px",
    marginRight: "170px",
  },

  login_text: {
    color: "#2c3e50",
  },

  btn_login: {
    backgroundColor: "#2c3e50",
    boxShadow: "5px 5px 10px 2px rgb(7 12 8 / 50%) !important",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#34495e !important",
    },
  },

  btn_login_disabled: {
    backgroundColor: "#7f8c8d !important",
    "&:hover": {
      cursor: "default",
      backgroundColor: "#7f8c8d !important",
    },
  },

  login_footer: {
    // border: "6px solid red",
    display: "flex",
    flexDirection: "column",
  },

  login_footer_text: {
    textAlign: "center",
    paddingTop: "10px",
  },

  txt_register: {
    "&:hover": {
      cursor: "pointer",
    },
  },
};
