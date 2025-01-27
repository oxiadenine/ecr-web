import PropTypes from "prop-types";

function Button(props) {
  const { type = "button" } = props;

  PropTypes.checkPropTypes(Button.propTypes, props, "prop", Button.name);

  return (
    <button 
      type={type} 
      disabled={props.disabled} 
      onClick={props.onClick} 
      className={props.className} 
      style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        columnGap: "8px" 
      }}
    >
      {props.startIcon}
      {props.children}
      {props.endIcon}
    </button>
  );
}

Button.propTypes = { 
  type: PropTypes.oneOf(["button", "reset", "submit"]), 
  disabled: PropTypes.bool, 
  onClick: PropTypes.func, 
  startIcon: PropTypes.object, 
  endIcon: PropTypes.object 
};

export default Button;
