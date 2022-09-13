import { useNavigate } from "react-router-dom";

import Header from "./../Header/Header";

import "./Home.scss";

import videoHomePage from "../../assets/video-homepage.mp4";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <video src={videoHomePage} muted autoPlay></video>
        <div className="content col-12 text-center text-lg-start col-lg-5 ps-lg-5">
          <div className="title">
            There's a better place to store your trip memory
          </div>
          <div className="text">Just go and store your travel memory now</div>
          <button className="mt-4 btn-start" onClick={() => navigate("/trip")}>
            Get started now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
