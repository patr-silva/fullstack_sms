import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listLessons } from "../services/LessonsService";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Tooltip from "./Tooltip";
import "../custom-calendar.css";
import "animate.css";

const Calendar = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    position: {},
  });
  const [lessons, setLessons] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllLessons();
  }, []);

  function handleEventMouseEnter(info) {
    const tooltipContent = `Description: ${info.event.extendedProps.description}`;
    const tooltipPosition = {
      top: info.jsEvent.pageY + 10,
      left: info.jsEvent.pageX + 10,
    };
    setTooltip({
      visible: true,
      content: tooltipContent,
      position: tooltipPosition,
    });
  }

  function handleEventMouseLeave() {
    setTooltip({ ...tooltip, visible: false });
  }

  function handleEventClick(info) {
    const id = info.event._def.publicId;
    console.log("Clicked date:", id);
    navigator(`/lessons/${id}`);
  }

  function getAllLessons() {
    listLessons()
      .then((response) => {
        const formattedLessons = response.data.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          start: lesson.startTime,
          end: lesson.endTime,
          extendedProps: {
            description: lesson.description,
            studentId: lesson.studentId,
          },
        }));
        setLessons(formattedLessons);
        console.log(formattedLessons);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createNewLesson() {
    navigator("/add-lesson");
  }

  return (
    <div className='container animate__animated animate__fadeIn'>
      <h2 className='text-center mb-3 display-4'>Lessons</h2>
      <div className='row mb-3'>
        <div className='col text-end'>
          <button className='create-btn' onClick={createNewLesson}>
            Schedule Lesson
          </button>
        </div>
      </div>
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          height='auto'
          weekends={false}
          themeSystem='bootstrap5'
          initialView='dayGridWeek'
          events={lessons}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridWeek,dayGridDay",
          }}
          eventMouseEnter={handleEventMouseEnter}
          eventMouseLeave={handleEventMouseLeave}
          eventClick={handleEventClick}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: "short",
          }}
          eventContent={(eventInfo) => {
            return (
              <div>
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {eventInfo.timeText} -{" "}
                </span>
                {eventInfo.event.title}
              </div>
            );
          }}
        />
        {tooltip.visible && (
          <Tooltip content={tooltip.content} position={tooltip.position} />
        )}
      </div>
    </div>
  );
};

export default Calendar;
