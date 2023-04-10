import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PlayersData from "./components/PlayersData";

function App() {
  const [data, setData] = useState();
  const [err, setErr] = useState(false);
  const [seasonerr, setSeasonerr] = useState(false);
  const [league, setLeague] = useState("2");
  const [season, setSeason] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setErr(false);
    setSeasonerr(false);
    let url = "";
    if (season === "") {
      url = `https://v3.football.api-sports.io/players/topscorers?season=2022&league=${league}`;
    } else {
      url = `https://v3.football.api-sports.io/players/topscorers?season=${season}&league=${league}`;
    }
    axios
      .get(`${url}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "86785a904775a73664cbc2d42fa1194e",
        },
      })
      .then((res) => {
        console.log(res.data.response);
        setData(res.data.response);
        if (data?.length === 0) setErr(true);
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [season, league]);

  const leagueHandler = (e) => {
    e.preventDefault();
    setSeason(e.target.season.value);
    setLeague(e.target.league.value);
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loading">
          <div className="ball">
            <i className="bx bx-football"></i>
          </div>
          <div className="floor"></div>
        </div>
      ) : err ? (
        <div className="err">
          <h2>
            Sorry there is no data at the moment, please come back tomorrow
          </h2>
        </div>
      ) : (
        <>
          <div className="title">
            {data && data[0] && data[0]?.statistics[0] && (
              <h1>{data[0].statistics[0].league.name} Top Scorers</h1>
            )}
            <form onSubmit={leagueHandler} id="selectLeague">
              <label htmlFor="league">League: </label>
              <select id="league">
                <option value="2">UEFA Champions League</option>
                <option value="3"> UEFA Europa League</option>
                <option value="78">Bundesliga</option>
                <option value="140">La Liga</option>
                <option value="61">Ligue 1</option>
                <option value="39">Premier League</option>
                <option value="135">Serie A</option>
              </select>
              <label htmlFor="season">Season: </label>
              <select id="season">
                <option value="2022">2022-2023</option>
                <option value="2021">2021-2022</option>
                <option value="2020">2020-2021</option>
                <option value="2019">2019-2020</option>
                <option value="2018">2018-2019</option>
                <option value="2017">2017-2018</option>
                <option value="2016">2016-2017</option>
                <option value="2015">2015-2016</option>
              </select>
              <button>Submit</button>
            </form>
          </div>
          <PlayersData data={data} />
        </>
      )}
    </div>
  );
}

export default App;
