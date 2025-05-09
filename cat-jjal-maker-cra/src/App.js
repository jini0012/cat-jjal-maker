import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import Title from "./components/Title";
import Favorites from "./components/Favorites";
import MainCard from "./components/MainCard";
import Form from "./components/Form";
import "./App.css";

const App = () => {
  const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";
  const CAT2 = "https://cataas.com/cat/BxqL2EjFmtxDkAm2/says/inflearn";
  const CAT3 = "https://cataas.com/cat/18MD6byVC1yKGpXp/says/JavaScript";

  const jsonLocalStorage = {
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
      return JSON.parse(localStorage.getItem(key));
    },
  };

  const fetchCat = async (text) => {
    const OPEN_API_DOMAIN = "https://cataas.com";
    const response = await fetch(
      `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
    );
    const responseJson = await response.json();
    return `${OPEN_API_DOMAIN}/cat/${responseJson.id}/says/${text}`;
    // NOTE: API 스펙 변경으로 강의 영상과 다른 URL로 변경했습니다.
  };

  // 자식컴포넌트 2개에서 함께 사용하고 싶은 상태

  const [counter, setCounter] = useState(() => {
    return jsonLocalStorage.getItem();
  });

  const [mainCat, setMainCat] = useState(CAT1);
  const [favorites, setFavorites] = useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(mainCat);

  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    setMainCat(newCat);
  }

  useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setMainCat(newCat);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return prev + 1;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    // 이름은 handle + ~~ + 이벤트명 이렇게 적는게 관례임
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const title = counter ? `${counter}번째 ` : "";

  return (
    <div>
      <Title>{title}고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
