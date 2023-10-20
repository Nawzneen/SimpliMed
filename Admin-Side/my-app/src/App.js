import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [usersFeedbacks, setUsersFeedbacks] = useState([]);
  const [usersWithFeedbacks, setUsersWithFeedbacks] = useState([]);

  const [showUsers, setShowUsers] = useState(false); // State for showing users
  const [showUsersFeedbacks, setShowUsersFeedbacks] = useState(false); // State for showing feedbacks
  const [showUsersWithFeedbacks, setShowUsersWithFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch Users when the component mounts
    fetchUsers();

    // Fetch Users & Feedbacks when the component mounts
    fetchUersFeedbacks();
    fetchUsersWithFeedbacks();
  }, []); // Empty dependency array ensures the effect runs once on mount

  const fetchUsers = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          // Authorization: "JWT " + accessToken,
        },
      };

      const response = await fetch(
        "http://localhost:8080/report/users",
        options
      );
      const data = await response.json();

      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchUersFeedbacks = async () => {
    try {
      // console.log("test");
      const options = {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          // Authorization: "JWT " + accessToken,
        },
      };
      const response = await fetch(
        "http://localhost:8080/report/users&feedbacks",
        options
      );
      // console.log("response is", response);

      const data = await response.json();
      // console.log("data results is", data.result);
      setUsersFeedbacks(data.result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const fetchUsersWithFeedbacks = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          // Authorization: "JWT " + accessToken,
        },
      };

      const response = await fetch(
        "http://localhost:8080/report/usersWithFeedbacks",
        options
      );
      const data = await response.json();
      setUsersWithFeedbacks(data.result);
      console.log("users with feedbacks", data.result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <div>
      <div className="button-container">
        <button
          className="button"
          onClick={() => {
            showUsers ? setShowUsers(false) : setShowUsers(true);
          }}
        >
          Fetch Users
        </button>
        <button
          className="button"
          onClick={() => {
            showUsersFeedbacks
              ? setShowUsersFeedbacks(false)
              : setShowUsersFeedbacks(true);
          }}
        >
          Fetch Users & Feedbacks
        </button>
        <button
          className="button"
          onClick={() => {
            showUsersWithFeedbacks
              ? setShowUsersWithFeedbacks(false)
              : setShowUsersWithFeedbacks(true);
          }}
        >
          Fetch Users With Feedbacks
        </button>
      </div>

      <div className={showUsers ? "section" : "section hidden"}>
        {users.map((user) => (
          <div key={user._id} className="section_item">
            <b>Username:</b> {user.username}, <b>id:</b> {user._id},{" "}
            <b>created:</b> {user.created}
          </div>
        ))}
      </div>

      <div className={showUsersFeedbacks ? "section" : "section hidden"}>
        {usersFeedbacks.map((userFeedback, index) => (
          <div key={index} className="section_item">
            <b>Username:</b> {userFeedback._id}
            <ul>
              {userFeedback.numberOfFeedbacks.map(
                (numberOfFeedbacks, innerIndex) => (
                  <li key={innerIndex}>
                    <b>Date:</b> {numberOfFeedbacks.date},{" "}
                    <b>Number of submission:</b> {numberOfFeedbacks.count}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className={showUsersWithFeedbacks ? "section" : "section hidden"}>
        {usersWithFeedbacks.map((userWithFeedback, index) => (
          <div key={index} className="section_item">
            <b>Username:</b> {userWithFeedback.username}
            {userWithFeedback.feedbacks.map((feedback, innerIndex) => (
              <div key={innerIndex} className="user_container">
                <span className="feedback_title">
                  <b>Feedback Created At:</b>
                </span>{" "}
                {feedback.created.substring(0, 10)}
                <div className="tables">
                  <table border="1">
                    <tr>
                      <th>Type</th>
                      <th>Difficulty Level</th>
                    </tr>
                    <tr>
                      <td>Elementary </td>
                      <td>{feedback.elementaryDifficulty}</td>
                    </tr>
                    <tr>
                      <td>Advanced</td>
                      <td>{feedback.advancedDifficulty}</td>
                    </tr>
                    <tr>
                      <td>Original</td>
                      <td>{feedback.originalDifficulty}</td>
                    </tr>
                    <tr>
                      <td style={{ backgroundColor: "grey" }}>
                        Prefered Difficulty
                      </td>
                      <td style={{ backgroundColor: "grey" }}>
                        {feedback.onBoardingQuestionnaire.multipleChoice}
                      </td>
                    </tr>
                  </table>
                  <table border="1">
                    <tr>
                      <th>Type</th>
                      <th>Time Spent(ms)</th>
                    </tr>
                    <tr>
                      <td>Elementary </td>
                      <td>
                        {feedback.elementaryTime}
                        {/* (
                        {Math.floor(feedback.elementaryTime / 600)}
                        mins) */}
                      </td>
                    </tr>
                    <tr>
                      <td>Advanced</td>
                      <td>{feedback.advancedTime}</td>
                    </tr>
                    <tr>
                      <td>Original</td>
                      <td>{feedback.originalTime}</td>
                    </tr>
                    <tr></tr>
                  </table>
                </div>{" "}
                <div className="feedback_question">
                  <span className="question_title">
                    Why did you prefer the chosen version?{" "}
                  </span>
                  <br />
                  {feedback.onBoardingQuestionnaire.Q1Text}
                </div>
                <br />{" "}
                <div className="feedback_question">
                  <span className="question_title">
                    Explain what did you learn from today's topic after reading
                    these 3 articles?{" "}
                  </span>
                  <br />
                  {feedback.onBoardingQuestionnaire.Q2Text}
                </div>
                <br />{" "}
                <div className="feedback_question">
                  <span className="question_title">
                    Has your understanding of the topic changed after reading
                    these articles? Why/why not?{" "}
                  </span>
                  <br />
                  {feedback.onBoardingQuestionnaire.Q3Text}
                </div>
                <hr />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Add more sections for other data */}
    </div>
  );
}

export default App;
