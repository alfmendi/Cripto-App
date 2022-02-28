import { useState, useEffect } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import { Container } from "@mui/material";

import AliceCarousel from "react-alice-carousel";

import { CryptoState } from "../../context/cryptoContext/CryptoContext";

import { monedasTrending } from "../../config/api";

import "./banner.scss";

function numeroConComas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Banner = () => {
  const [trending, setTrending] = useState([]);
  const { divisa } = CryptoState();

  useEffect(() => {
    conseguirMonedasTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divisa]);

  const conseguirMonedasTrending = async () => {
    const { data } = await axios.get(monedasTrending(divisa));
    setTrending(data);
  };

  const items = trending.map((item) => {
    let beneficio = item?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/monedas/${item.id}`}>
        <h4>{item.name}</h4>
        <img
          src={item?.image}
          alt={item.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span style={{ fontWeight: 900 }}>
          {item?.symbol}
          &nbsp;
          <span
            style={{
              color: beneficio > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 900,
              background: "#fff",
              padding: "4px 8px",
              borderRadius: "3px",
              marginLeft: "10px",
            }}
          >
            {beneficio && "+"}
            {item?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500, marginTop: "10px" }}>
          {divisa === "eur" ? "€" : "$"}{" "}
          {numeroConComas(item?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="banner">
      <Container className="banner__contenedor">
        <div className="banner__contenido">
          <p>INFORMACIÓN EN TIEMPO REAL SOBRE CRIPTOMONEDAS</p>
          <div className="banner__carousel">
            <AliceCarousel
              mouseTracking
              infinite
              autoPlayInterval={1000}
              animationDuration={1500}
              disableDotsControls
              disableButtonsControls
              responsive={responsive}
              items={items}
              autoPlay
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
