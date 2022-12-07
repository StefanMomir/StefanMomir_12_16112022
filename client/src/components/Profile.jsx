import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Activity from "../components/BarCharts.jsx";
import Sessions from "../components/LineCharts.jsx";
import RadarCharts from "../components/RadarCharts.jsx";
import Score from "../components/RadialCharts.jsx";
import BulletBlack from "../assets/bullet-black.svg";
import BulletRed from "../assets/bullet-red.svg";
import MainContent from "./Container.jsx";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import mockDb from "../data/mockData.js";
import {
  ActivityModelation,
  SessionModelation,
  PerformanceModelation,
  ScoreModelation,
} from "../models/Model.jsx";

const Profile = () => {
  // HOOKS
  const { Id } = useParams();
  const [data, setData] = useState();
  const [activity, setActivity] = useState();
  const [sessions, setSessions] = useState();
  const [performance, setPerformance] = useState();
  const url = "http://localhost:3001/user/" + Id;

  /**
   * SEND REQUEST USING AXIOS TO FETCH API DATA
   * @param { String } url - return URL ROUTE for API REQUEST
   * @param { Object } usersData - return user 'information' data
   * @param { Object } activityData - return user 'activity' data
   * @param { Object } sessionsData - return user 'session' data
   * @param { Object } performanceData - return user 'performance' data
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        /* API DATA */
        const usersData = await axios.get(`${url}`);
        const activityData = await axios.get(`${url}/activity`);
        const sessionsData = await axios.get(`${url}/average-sessions`);
        const performanceData = await axios.get(`${url}/performance`);
        setData(usersData?.data.data);
        setActivity(activityData?.data.data);
        setSessions(sessionsData?.data.data);
        setPerformance(performanceData?.data.data);
        /* NO API_DATA, use mockData */
        if (!data) {
          setData(mockData);
          setActivity(mockActivityData);
          setSessions(mockSessionsData);
          setPerformance(mockPerformance);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * SEND REQUEST TO FETCH MOCK DATA
   * @param { Object } mockData - return user 'Information' data({id, firstName,
   * lastName, age, score, keyData{calorieCount, proteinCount,carbohydrateCount,lipidCount}})
   * @param { Object } mockActivityData - return user 'Activity' data
   * @param { Object } mockSessionsData - return user 'Session' data
   * @param { Object } mockPerformance - return user 'Performance' data
   */
  const mockData = mockDb.USER_MAIN_DATA.find((mock) => +mock.id === +Id);
  const mockActivityData = mockDb.USER_ACTIVITY.find(
    (mock) => +mock.userId === +Id
  );
  const mockSessionsData = mockDb.USER_AVERAGE_SESSIONS.find(
    (mock) => +mock.userId === +Id
  );
  const mockPerformance = mockDb.USER_PERFORMANCE.find(
    (mock) => +mock.userId === +Id
  );

  // Declare User Data Variables
  const userData = data?.keyData;
  const userInfo = data?.userInfos;
  const calo = userData?.calorieCount;
  const carb = userData?.carbohydrateCount;
  const prot = userData?.proteinCount;
  const lipi = userData?.lipidCount;
  const fullName = userInfo?.firstName + " " + userInfo?.lastName;

  /**
   * GET MODELED DATA FROM MODELATION MODULE
   * @property {function} getActiveModeled - 'Activity' data modeled
   * @param { Object } activity - 'Activity' data send for modelation
   */
  function getActiveModeled() {
    const activityModel = new ActivityModelation(activity);
    return activityModel.getActivity();
  }

  /**
   * GET MODELED DATA FROM MODELATION MODULE
   * @property {function} getSessionModeled - 'Activity' data modeled
   * @param { Object } sessions - 'Session' data send for modelation
   */
  const getSessionModeled = () => {
    const sessionModel = new SessionModelation(sessions);
    return sessionModel.getSession();
  };

  /**
   * GET MODELED DATA FROM MODELATION MODULE
   * @property {function} getPerformanceModeled - 'Performance' data modeled
   * @param { Object } perfData - 'Performance' data send for modelation
   */
  const getPerformanceModeled = () => {
    const perfData = performance?.data;
    const performanceModel = new PerformanceModelation(perfData);
    return performanceModel.getPerformance();
  };

  /**
   * GET MODELED DATA FROM MODELATION MODULE
   * @property {function} getScoreModeled - 'Score' data modeled
   * @param { Object } score - 'Score' data send for modelation
   * @param { int } ref - return reference number to calculate %
   */
  const getScoreModeled = () => {
    // Switch Data Between Users using UserId
    const uid = data?.id;
    let ref = [];
    let score = [];
    // eslint-disable-next-line default-case
    switch (uid) {
      case 12:
        score = data?.todayScore;
        ref = 0.9;
        break;
      case 18:
        score = data?.score;
        ref = 0.7;
        break;
    }
    const scoreModel = new ScoreModelation(score, ref);
    return scoreModel.getScore();
  };

  /**
   * SET PROPS FOR CHARTS
   * @param { props } userActivity - userActivity send to BarCharts
   * @param { props } userSessions - userSessions send to LineCharts
   * @param { props } userPerformance - userPerformance send to RadarCharts
   * @param { props } userScore - userScore send to RadialCharts
   */
  const userActivity = getActiveModeled();
  const userSessions = getSessionModeled();
  const userPerformance = getPerformanceModeled();
  const userScore = getScoreModeled();

  return (
    <div className="middle-wrapper">
      <div className="content">
        <div className="header">
          <h1>
            Bonjour <span>{fullName}</span>
          </h1>
          <p className="success">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
        </div>

        <div className="session-container">
          <div className="bar-chart-title">Activité quotidienne</div>
          <div className="bar-chart-content">
            <div className="bar-chart-kg">
              <img src={BulletBlack} alt="bulletblack" />
              Poids (kg)
            </div>
            <div className="bar-chart-cal">
              <img src={BulletRed} alt="bulletred" />
              Calories brûlées (kCal)
            </div>
          </div>
          <Activity activity={userActivity} />
        </div>

        <div className="bottom-graph">
          <div className="session-time">
            <div className="line-chart-description">
              Durée moyenne des sessions
            </div>
            <Sessions session={userSessions} />
          </div>
          <div className="intensity">
            <RadarCharts performance={userPerformance} />
          </div>
          <div className="score">
            <Score score={userScore} />
          </div>
        </div>

        <div className="loss-details">
          <div className="calories">
            <p className="nutrient-value">{calo}kCal</p>
            <p className="nutrient-name">Calories</p>
          </div>
          <div className="proteins">
            <p className="nutrient-value">{prot}g</p>
            <p className="nutrient-name">Proteines</p>
          </div>
          <div className="glucides">
            <p className="nutrient-value">{carb}g</p>
            <p className="nutrient-name">Glucides</p>
          </div>
          <div className="lipides">
            <p className="nutrient-value">{lipi}g</p>
            <p className="nutrient-name">Lipides</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  userActivity: PropTypes.object,
  userSessions: PropTypes.object,
  userPerformance: PropTypes.object,
  userScore: PropTypes.object,
};

export default Profile;
