import "./style.css";
import useLocalStorage from "use-local-storage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);
import { useState } from "react";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const Towers = ["A", "B"];

  const [startDate, set_startDate] = useState(new Date());

  let Floors = Array.from(range(3, 27));
  let Rooms = Array.from(range(1, 10));

  function* range(start, end) {
    while (start <= end) {
      yield start;
      start++;
    }
  }

  function SendToJSON(e, VALID, array) {
    const myObj = JSON.stringify(array);
    if (VALID === true) {
      console.log(myObj);
      e.target.reset();
    }
  }
  function Validation_form(e) {
    for (let index = 0; index < 7; index++) {
      if (e.target[index].value.includes("Выберете")) return false;
    }
    return true;
  }
  function handleSubmit(e) {
    e.preventDefault();
    let VALID = Validation_form(e);
    let array = [];

    for (let index = 0; index < 7; index++) {
      array.push(e.target[index].value);
      if (e.target[index].value.includes("Выберете")) {
        e.target[index].id = "Invalid";
      } else if (
        e.target[index].className != "dateP" &&
        e.target[index].className != "btn"
      )
        e.target[index].id = "Valid";
    }

    SendToJSON(e, VALID, array);
  }
  function handleReset(e) {
    e.target.reset();
    for (let i = 0; i < 7; i++) {
      if (e.target[i].id === "Invalid") e.target[i].id = "Valid";
    }
    e.target.reset();
  }

  const tower = Towers.map((NTower, index) => {
    return <option key={index}> {NTower}</option>;
  });
  const floor = Floors.map((flor, index) => {
    return <option key={index}> {flor}</option>;
  });
  const room = Rooms.map((rom, index) => {
    return <option key={index}> {rom}</option>;
  });

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.getElementById("all").setAttribute("data-theme", theme);
  };

  return (
    <>
      <button className="btn-theme" onClick={switchTheme}>
        Сменить тему
      </button>
      <form
        onReset={handleReset}
        onSubmit={handleSubmit}
        className="form"
        id="form"
      >
        <div className="form-row">
          <h3 htmlFor="">Форма бронирования переговорной</h3>
          <select id="Valid">
            <option defaultValue="selected">*Выберете башню</option>
            {tower}
          </select>
          <select id="Valid">
            <option defaultValue="selected">*Выберете этаж</option>
            {floor}
          </select>
          <select id="Valid">
            <option defaultValue="selected">*Выберете комнату</option>
            {room}
          </select>

          <label htmlFor="">Выберете дату и время</label>
          <div className="date">
            <DatePicker
              locale="ru"
              className="dateP"
              name="DATE"
              selected={startDate}
              dateFormat="Pp"
              onChange={(date) => set_startDate(date)}
              timeIntervals={15}
              showTimeSelect
            />
          </div>
          <textarea
            placeholder="Ваш комментарий..."
            cols="30"
            rows="10"
          ></textarea>
          <button className="btn" type="submit">
            Отправить
          </button>
          <button className="btn" type="reset">
            Очистить
          </button>
        </div>
      </form>
    </>
  );
}

export default App;
