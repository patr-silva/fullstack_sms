import PropTypes from "prop-types";

import ScheduleIcon from "../icons/ScheduleIcon";
import GradesIcon from "../icons/GradesIcon";
import StudentIcon from "../icons/StudentIcon";

const CircleButton = ({ type, onClick}) => {
  return (
    <div className='d-flex flex-column align-items-center'>
      <button
        className='btn btn-primary rounded-circle d-flex align-items-center justify-content-center circle-button'
        type='button'
        onClick={onClick}
     
      >
        {type === "Students" ? (
          <StudentIcon />
        ) : type === "Schedule" ? (
          <ScheduleIcon />
        ) : (
          <GradesIcon />
        )}
      </button>
      <p className='mt-2'>{type}</p>
    </div>
  );
};

CircleButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default CircleButton;
