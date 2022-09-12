import Header from "./../Header/Header";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";

import { getAllTrips } from "../../services/apiServices";

import "./Trip.scss";
import TripDetail from "./TripDetail";
import ModalAddNewTrip from "./Modal/ModalAddNewTrip";
import ModalDeleteTrip from "./Modal/ModalDeleteTrip";

const Trip = () => {
  // State
  const [listTrips, setListTrips] = useState([]);

  // Modal
  const [isShowModalAddNewTrip, setIsShowModalAddNewTrip] = useState(false);
  const [isShowModalDeleteTrip, setIsShowModalDeleteTrip] = useState(false);

  const [dataModalDeleteTrip, setDataModalDeleteTrip] = useState({});

  // hook
  useEffect(() => {
    fetchAllTrips();
  }, []);

  // handle

  const fetchAllTrips = async () => {
    let res = await getAllTrips();
    if (res && +res.EC === 0) {
      setListTrips(res.DT);
    } else {
      setListTrips([]);
    }
  };

  const handleDeleteTrip = (trip) => {
    setIsShowModalDeleteTrip(true);
    setDataModalDeleteTrip(trip);
  };

  return (
    <div className="trip-container">
      <div className="header">
        <Header />
      </div>
      <div className="body container">
        <div className="body-header my-5">
          <span className="search">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input type="text" className="search-input" placeholder="Search" />
          </span>
          <span>
            <i
              className="fa-solid fa-circle-plus add-icon"
              onClick={() => setIsShowModalAddNewTrip(true)}
            ></i>
          </span>
        </div>

        <Accordion defaultActiveKey="0" className="trip-detail">
          {listTrips &&
            listTrips.length > 0 &&
            listTrips.map((trip, index) => {
              return (
                <TripDetail
                  key={`trip-detail-${index}`}
                  index={index}
                  trip={trip}
                  handleDeleteTrip={handleDeleteTrip}
                />
              );
            })}
        </Accordion>
      </div>
      <ModalAddNewTrip
        show={isShowModalAddNewTrip}
        setShow={setIsShowModalAddNewTrip}
        fetchAllTrips={fetchAllTrips}
      />
      <ModalDeleteTrip
        show={isShowModalDeleteTrip}
        setShow={setIsShowModalDeleteTrip}
        dataModalDeleteTrip={dataModalDeleteTrip}
        fetchAllTrips={fetchAllTrips}
      />
    </div>
  );
};

export default Trip;
