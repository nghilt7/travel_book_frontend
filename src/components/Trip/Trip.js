import Header from "./../Header/Header";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";

import { getAllTrips } from "../../services/apiServices";

import "./Trip.scss";
import TripDetail from "./TripDetail";
import ModalAddNewTrip from "./Modal/ModalAddNewTrip";
import ModalDeleteTrip from "./Modal/ModalDeleteTrip";
import ModalUpdateTrip from "./Modal/ModalUpdateTrip";
import ModalAddNewCost from "./Modal/ModalAddNewCost";
import ModalUpdateCost from "./Modal/ModalUpdateCost";

const Trip = () => {
  // State
  const [listTrips, setListTrips] = useState([]);

  // Modal
  const [isShowModalAddNewTrip, setIsShowModalAddNewTrip] = useState(false);
  const [isShowModalDeleteTrip, setIsShowModalDeleteTrip] = useState(false);
  const [isShowModalUpdateTrip, setIsShowModalUpdateTrip] = useState(false);
  const [isShowModalAddNewCost, setIsShowModalAddNewCost] = useState(false);
  const [isShowModalUpdateCost, setIsShowModalUpdateCost] = useState(false);

  const [dataModalDeleteTrip, setDataModalDeleteTrip] = useState({});
  const [dataModalUpdateTrip, setDataModalUpdateTrip] = useState({});
  const [dataModalAddNewCost, setDataModalAddNewCost] = useState({});
  const [dataModalUpdateCost, setDataModalUpdateCost] = useState({});

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

  const handleUpdateTrip = (trip) => {
    setDataModalUpdateTrip(trip);
    setIsShowModalUpdateTrip(true);
  };

  // cost
  const handleAddNewCost = (trip) => {
    setDataModalAddNewCost(trip);
    setIsShowModalAddNewCost(true);
  };

  const handleUpdateCost = (cost) => {
    setDataModalUpdateCost(cost);
    setIsShowModalUpdateCost(true);
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
                  handleUpdateTrip={handleUpdateTrip}
                  handleAddNewCost={handleAddNewCost}
                  fetchAllTrips={fetchAllTrips}
                  handleUpdateCost={handleUpdateCost}
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
      <ModalUpdateTrip
        show={isShowModalUpdateTrip}
        setShow={setIsShowModalUpdateTrip}
        dataModalUpdateTrip={dataModalUpdateTrip}
        fetchAllTrips={fetchAllTrips}
      />
      <ModalAddNewCost
        show={isShowModalAddNewCost}
        setShow={setIsShowModalAddNewCost}
        dataModalAddNewCost={dataModalAddNewCost}
        fetchAllTrips={fetchAllTrips}
      />
      <ModalUpdateCost
        show={isShowModalUpdateCost}
        setShow={setIsShowModalUpdateCost}
        dataModalUpdateCost={dataModalUpdateCost}
        fetchAllTrips={fetchAllTrips}
      />
    </div>
  );
};

export default Trip;
