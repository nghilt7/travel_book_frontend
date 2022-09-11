import Header from "./../Header/Header";

import "./Home.scss";

import backgroundImg from "../../assets/background-2.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <img src={backgroundImg} alt="background" />
      </div>
    </div>
  );
};

export default Home;
