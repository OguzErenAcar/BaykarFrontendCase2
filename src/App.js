import React, { useEffect, useState } from "react";

function App() {
  const [Questions, setQuestion] = useState(false);
  const [Answers, setAnswers] = useState([]);

  const [time, setTime] = useState(30);
  const [ind, setind] = useState(0);

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuestion(data);
      });
  
  }, []);

  useEffect(()=>{ 
  if (!isActive) 
    return;

    const interval = setInterval(() => {
      setTime((current) => current - 1);
    }, 1000);
    return () => clearInterval(interval);
  },[isActive])

  useEffect(() => {
    if (Answers.length > 9) {
      setIsActive(false);  
    }
  }, [Answers]);

  useEffect(() => {
    if (0 >= time) saveResult("null");
  }, [time]);

  const saveResult = (e) => {
    console.log(e);
    setTime(30);
    setind((a) => a + 1);
    setAnswers((current) => current.concat(e));
  };

  return (
    <div>
      {ind < 10 ? (
        Questions && (
          <>
            <h1>Question {ind + 1}</h1>
            <p>{Questions[ind].body}</p>
            <button
              disabled={20 < time}
              onClick={() => saveResult(Questions[ind].body.substring(0, 3))}
              style={{ display: "block" }}
            >
              A-){Questions[ind].body.substring(0, 3)}
            </button>
            <button
              disabled={20 < time}
              onClick={() => saveResult(Questions[ind].body.substring(3, 6))}
              style={{ display: "block" }}
            >
              B-){Questions[ind].body.substring(3, 6)}
            </button>
            <button
              disabled={20 < time}
              onClick={() => saveResult(Questions[ind].body.substring(6, 9))}
              style={{ display: "block" }}
            >
              C-){Questions[ind].body.substring(6, 9)}
            </button>
            <button
              disabled={20 < time}
              onClick={() => saveResult(Questions[ind].body.substring(9, 12))}
              style={{ display: "block" }}
            >
              D-){Questions[ind].body.substring(9, 12)}
            </button>

            <div style={{ marginTop: 20 }}> Time: {time}</div>
            <button onClick={() => saveResult("null")}>Next</button>
          </>
        )
      ) : (
        <>
          {Answers.map((item, i) => (
            <label style={{display:"block"}}>
              {i+1 }:{item}
            </label>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
