import { NavLink } from "react-router-dom";

const Container = () => {
  return (
    <>
      <div className="top-content">
        <div className="logo"></div>
        <nav>
          <ul>
            <li>
              <NavLink to={"/user"}>Accueil</NavLink>
            </li>
            <li>Profile</li>
            <li>Réglage</li>
            <li>Communauté</li>
          </ul>
        </nav>
      </div>
      <div className="left-content">
        <ul>
          <li className="icon-yoga"></li>
          <li className="icon-swim"></li>
          <li className="icon-cycling"></li>
          <li className="icon-bodybuilding"></li>
        </ul>
        <div className="bottom-logo">Copyright, SportSee 2020</div>
      </div>
    </>
  );
};

export default Container;
