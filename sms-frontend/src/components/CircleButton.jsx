import PropTypes from "prop-types";

import ScheduleIcon from "../icons/ScheduleIcon";
import GradesIcon from "../icons/GradesIcon";
import StudentIcon from "../icons/StudentIcon";

const CircleButton = ({ type, onClick, color }) => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <button
        className='btn btn-primary rounded-circle d-flex align-items-center justify-content-center mb-2'
        style={{
          width: "125px",
          height: "125px",
          backgroundColor: color,
          border: "none",
        }}
        type='button'
        onClick={onClick}
        aria-label={`Click to open ${type}`}
      >
        {type === "Students" ? (
          <StudentIcon />
        ) : type === "Schedule" ? (
          <ScheduleIcon />
        ) : (
          <GradesIcon />
        )}
      </button>
      <span className='mt-2'>{type}</span>
    </div>
  );
};

CircleButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default CircleButton;
