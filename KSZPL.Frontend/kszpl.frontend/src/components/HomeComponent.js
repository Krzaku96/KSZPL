import React, { Component } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import VisitComponent from "./Visit/VisitComponent";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

class HomeComponent extends Component {
  state = {
    visits: [],
    cal_events: []
  };

  componentDidMount = () => {
    axios.get(BASE_URL + "visit/getallvisit").then(response => {
      if (response.data) {
        this.setState({ visits: response.data });

        let appointments = response.data;

        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = moment
            .utc(appointments[i].dateVisit)
            .toDate();
          appointments[i].end = moment
            .utc(appointments[i].dateVisit)
            .add(1, "hours")
            .toDate();
          appointments[i].title =
            appointments[i].description +
            ", " +
            appointments[i].place +
            ", " +
            appointments[i].doctorName;
        }
        this.setState({
          cal_events: appointments
        });
      } else {
        console.log("Can't find response");
      }
    });
  };

  mapVisitsToShow = () => {
    return this.state.visits.map((visit, id) => (
      <VisitComponent
        key={visit.id}
        nr={id + 1}
        id={visit.id}
        dateVisit={visit.dateVisit}
        description={visit.description}
        place={visit.place}
        patientName={visit.patientName}
        status={visit.status}
        doctorName={visit.doctorName}
      />
    ));
  };

  render() {
    const localizer = BigCalendar.momentLocalizer(moment);
    const { cal_events } = this.state;
    return (
      <div>
        <BigCalendar
          className="rbc-calendar-color"
          localizer={localizer}
          events={cal_events}
          step={30}
          defaultView="day"
          views={["week", "day"]}
          min={new Date(2008, 0, 1, 8, 0)}
          max={new Date(2008, 0, 1, 16, 0)}
          defaultDate={new Date()}
          messages={{next:"Następny",previous:"Poprzedni",today:"Dzisaj",week:"Tydzień",day:"Dzień"}}
        />
      </div>
    );
  }
}

export default HomeComponent;
