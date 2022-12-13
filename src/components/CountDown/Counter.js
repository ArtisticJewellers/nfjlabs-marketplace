import React, { useEffect, useState } from "react";

function CounterComponent(props) {
  const [CounterValue, setCounterValue] = useState("");
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(0);
  const setTime = props.endDate;

  useEffect(() => {
    function counter() {
      timeBetweenDates(setTime);
      setCounterValue(CounterValue + 1);
    }

    function timeBetweenDates(toDate) {
      var now = new Date();

      var difference = setTime - parseInt(now.getTime() / 1000);
      if (difference <= 0) {
        // Timer done
        clearInterval();
      } else {
        var seconds = Math.floor(difference);
        var minutes = Math.floor(difference / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        setSecond(seconds);
        setMinute(minutes);
        setHour(hours);
        setDay(days);
      }
    }
    setTimeout(() => {
      counter();
    }, 1000);
  }, [CounterValue]);

  return (
    <>
      {!props.isEnded ? (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "start",
            gap: "15px",
          }}
        >
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="">{day}</span>
            <span className="text-[12px]">Days</span>
          </div>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="font-bold ">{hour}</span>
            <span className="text-[12px]">Hours</span>
          </div>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="font-bold ">{minute}</span>
            <span className="text-[12px]">Minute</span>
          </div>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="font-bold ">{second}</span>
            <span className="text-[12px]">Seconds</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-between my-[20px]">
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="font-bold ">{0}</span>
            <span className="text-[12px]">Days</span>
          </div>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="font-bold ">{0}</span>
            <span className="text-[12px]">Hours</span>
          </div>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="font-bold ">{0}</span>
            <span className="text-[12px]">Minute</span>
          </div>
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span className="font-bold ">{0}</span>
            <span className="text-[12px]">Seconds</span>
          </div>
        </div>
      )}
    </>
  );
}

export default CounterComponent;
