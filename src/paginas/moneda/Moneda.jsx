import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import { CircularProgress, Typography } from "@mui/material";

import parse from "html-react-parser";

import { conseguirMoneda } from "../../config/api";

import MonedaInfo from "../../componentes/monedaInfo/MonedaInfo";

import { CryptoState } from "../../context/cryptoContext/CryptoContext";

import "./moneda.scss";

function numeroConComas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Moneda = () => {
  const { monedaId } = useParams();
  const [moneda, setMoneda] = useState();

  const { divisa } = CryptoState();

  const fetchMoneda = async () => {
    const { data } = await axios.get(conseguirMoneda(monedaId));

    setMoneda(data);
  };

  useEffect(() => {
    fetchMoneda();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!moneda) return <CircularProgress />;

  return (
    <div className="moneda__contenedor">
      <div className="moneda__sidebar">
        <img
          src={moneda?.image.large}
          alt={moneda?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="moneda__heading">
          {moneda?.name}
        </Typography>
        <Typography variant="subtitle1" className="moneda__descripcion">
          {moneda?.description.en.length === 0
            ? "Sin descripción."
            : parse(moneda?.description.en.split(". ")[0])}
        </Typography>
        <div className="moneda__informacion">
          <span>
            <Typography variant="h6" className="moneda__heading">
              Posición
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              className="moneda__heading"
              style={{ color: "#3f51b5" }}
            >
              {numeroConComas(moneda?.market_cap_rank)}
            </Typography>
          </span>
          <span>
            <Typography variant="h6" className="moneda__heading">
              Precio actual
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              className="moneda__heading"
              style={{ color: "#3f51b5" }}
            >
              {numeroConComas(
                moneda?.market_data.current_price[divisa.toLowerCase()]
              )}{" "}
              {divisa === "eur" ? "€" : "$"}
            </Typography>
          </span>
          <span>
            <Typography variant="h6" className="moneda__heading">
              Capitalización mercado
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h6"
              className="moneda__heading"
              style={{ color: "#3f51b5" }}
            >
              {numeroConComas(
                moneda?.market_data.market_cap[divisa.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M {divisa === "eur" ? "€" : "$"}
            </Typography>
          </span>
        </div>
      </div>
      <MonedaInfo moneda={moneda} />
    </div>
  );
};

export default Moneda;
