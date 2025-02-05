import PropTypes from "prop-types";

function Icon(props) {
  PropTypes.checkPropTypes(Icon.propTypes, props, "prop", Icon.name);
  
  return <i className={`fa-${props.type} fa-${props.name}`} />;
}

Icon.propTypes = {
  type: PropTypes.oneOf(["solid", "brands"]).isRequired,
  name: PropTypes.string.isRequired
};

export default Icon;
