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

  btn_register: {
    backgroundColor: "#2c3e50",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#34495e !important",
    },
  },

  btn_register_disabled: {
    backgroundColor: "#7f8c8d !important",
    "&:hover": {
      cursor: "default",
      backgroundColor: "#7f8c8d !important",
    },
  },

  register_footer: {
    // border: "6px solid red",
    display: "flex",
    flexDirection: "column",
  },

  register_footer_text: {
    textAlign: "center",
    paddingTop: "10px",
  },

  txt_login: {
    "&:hover": {
      cursor: "pointer",
    },
  },
};
