import React from "react";
import Accordion from "react-bootstrap/Accordion";

const TripDetail = (props) => {
  // props data
  const { index, trip, handleDeleteTrip } = props;

  return (
    <>
      <Accordion.Item className="mb-5" eventKey={index}>
        <Accordion.Header>{trip.tripName}</Accordion.Header>
        <Accordion.Body>
          <div className="infor mt-3">
            <div className="place">
              {trip.startPlace} <i className="fa-solid fa-plane mx-3"></i>{" "}
              {trip.destination}
            </div>
            <div className="time">
              <span>{trip.startDate}</span>
              <i className="fa-solid fa-calendar-days ms-3"></i>
            </div>
          </div>
          <div className="action mt-3">
            <i className="fa-solid fa-pen edit"></i>
            <i
              className="fa-solid fa-trash-can trash"
              onClick={() => handleDeleteTrip(trip)}
            ></i>
          </div>
          <div className="costs">
            <span className="title">
              <i className="fa-solid fa-dollar-sign me-3 mt-5"></i>
              Costs
            </span>
            <ul>
              {trip.Costs &&
                trip.Costs.length > 0 &&
                trip.Costs.map((cost, index) => {
                  return (
                    <li key={`cost-${index}`}>
                      <span>
                        {cost.costType}: {cost.costValue}$
                      </span>
                      <div>
                        <i className="fa-solid fa-pen-to-square me-3 edit"></i>
                        <i className="fa-solid fa-trash trash"></i>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default TripDetail;
