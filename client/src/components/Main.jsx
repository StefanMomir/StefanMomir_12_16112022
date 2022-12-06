import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <>
      <div className="middle-content-home">
        <nav>
          <ul>
            <li>
              <NavLink to={"/user/12"}>
                <h1 className="user1">
                  <span>Karl Dovineau</span>
                </h1>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/user/18"}>
                <h1 className="user2">
                  <span>Cecilia Ratorez</span>
                </h1>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Main;
