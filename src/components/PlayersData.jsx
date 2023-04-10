import React from "react";

const PlayersData = ({ data }) => {
  return (
    <div className="container">
      {data?.map((playerData, index) => (
        <div className="playerCard" key={index}>
          <div className="cardImg">
            <img src={playerData?.player.photo} alt={playerData?.player.name} />
          </div>
          <div className="cardInfo">
            <h2 className="playerName">
              {index + 1}. {playerData?.player.name}
            </h2>

            <h3 className="teamName">
              <span className="break">
                {playerData?.statistics[0].team.name}
                <img
                  className="teamImg"
                  src={playerData?.statistics[0].team.logo}
                  alt={playerData?.statistics[0].team.name}
                />
              </span>
            </h3>

            <ul className="playerList">
              <li className="playerItem">
                <p>
                  Games Appearences:
                  <span>{playerData?.statistics[0].games.appearences}</span>
                </p>
              </li>
              <li className="playerItem">
                <p>
                  Goals:
                  <span>{playerData?.statistics[0].goals.total}</span>
                </p>
              </li>
              <li className="playerItem">
                <p>
                  Position:
                  <span>{playerData?.statistics[0].games.position}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayersData;
