import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ErrorNotFound from "./pages/errorNotFound/errorNotFound";
import Home from "./pages/home/home";
import Movie from "./pages/movie/movie";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0)

    if(!window.uuid) {
      let uuid = uuidv4();
      window.uuid = uuid;
    }

    const selectExperience = () => {
      let experiences = ['a', 'b', 'c', 'd'];
      return experiences[Math.floor(Math.random()*experiences.length)];
    }

    if(!window.experience) {
      let experience = selectExperience();
      window.experience = experience;
    }

    const findDeviceType = () => {
      let width = window.visualViewport.width;
      if (width < 767) {
        return "small";
      }
      if (width < 1368) {
        return "medium";
      }
      return "large";
    }

    const createAnalyticsSession = () => {
      let device = findDeviceType();
      fetch("https://blooming-wave-95457.herokuapp.com/createSession?id=" + window.uuid + "&device=" + device +"&exp="+window.experience);
    }
    
    createAnalyticsSession();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
