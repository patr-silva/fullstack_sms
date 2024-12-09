import PropTypes from "prop-types";
import "../tooltip.css";

const Tooltip = ({ content, position }) => {
  return (
    <div className='tooltip' style={{ top: position.top, left: position.left }}>
      {content}
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string,
  position: PropTypes.object,
};

export default Tooltip;
