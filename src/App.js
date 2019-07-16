//TODO: STEP 1 - Import the useState hook.
// import React from "react";
import "./App.css";
import BottomRow from "./BottomRow";
import React, { useState, useEffect } from 'react'; 

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
const [homeScore, setHomeScore] = useState(0);
const [awayScore, setAwayScore] = useState(0);
const [seconds, setSeconds] = useState(0);
const [minutes, setMinutes] = useState(0);
const [isOn, setIsOn] = useState(false);

const touchdownHandler = (setScore) => {
  return () => setScore(score => score + 7);
}

function toggle(){
  setIsOn(!isOn);
}
function reset(){
  setSeconds(0);
  setMinutes(0);
  setIsOn(false);
}

useEffect(() => {
  let interval = null;
  if (isOn) {
    interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      if (seconds >= 59) {
        setSeconds(0);
        setMinutes(minutes => minutes +1);

      }
    }, 1000);
  } else if (!isOn && seconds !== 0) {
    clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [isOn, seconds])


  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Griffindor</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{ homeScore }</div>
          </div>
          <div className="timer">{minutes} : {seconds} </div>
          <button className={`startBtn${isOn ? 'on' : 'off'}`} onClick={toggle}>
          {isOn ? 'Pause' : 'Start'}</button>
    <button className="button" onClick={reset}>Reset</button>
          <div className="away">
            <h2 className="away__name">Slytherin</h2>
            <div className="away__score">{ awayScore }</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          <button className="homeButtons__touchdown" onClick= {() => setHomeScore(homeScore + 7)} >Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick= {() => setHomeScore(homeScore + 3)} >Home Field Goal</button>
          <button className="oneHomePointer" onClick= {() => setHomeScore(homeScore + 1)} >Home Point</button>

        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick= {() => setAwayScore(awayScore + 7)} >Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick= {() => setAwayScore(awayScore + 3)} >Away Field Goal</button>
          <button className="oneAwayPointer" onClick= {() => setAwayScore(awayScore + 1)} >Away Point</button>
        </div>
      </section>
    </div>
  );
}

export default App;
