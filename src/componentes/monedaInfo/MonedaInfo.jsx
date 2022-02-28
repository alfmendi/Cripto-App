import { useEffect, useState } from "react";

import axios from "axios";

import { Line } from "react-chartjs-2";

import { historicoMoneda } from "../../config/api";

import { CircularProgress } from "@mui/material";

import { chartDias } from "../../config/data";

import { CryptoState } from "../../context/cryptoContext/CryptoContext";

import "./monedaInfo.scss";

const MonedaInfo = ({ moneda }) => {
  const [historicoDatos, setHistoricoDatos] = useState(null);
  const [dias, setDias] = useState(1);
  const { divisa } = CryptoState();
  const [flag, setflag] = useState(false);

  const buscarHistoricoDatos = async () => {
    const { data } = await axios.get(historicoMoneda(moneda.id, dias, divisa));
    setflag(true);
    setHistoricoDatos(data.prices);
  };

  useEffect(() => {
    buscarHistoricoDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dias]);

  return (
    <div className="monedaInfo__contenedor">
      {!historicoDatos || flag === false ? (
        <CircularProgress size={100} thickness={1} />
      ) : (
        <>
          <Line
            data={{
              labels: historicoDatos?.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return dias === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicoDatos.map((coin) => coin[1]),
                  label: `${
                    dias === 1
                      ? "Precio últimas 24 horas"
                      : `Precio últimos ${dias} días`
                  } en ${divisa}`,
                  borderColor: "#3f51b5",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          {/* Muestra los botones inferiores */}
          <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDias?.map((dia) => (
              <div
                className={`monedaInfo__boton ${
                  dia.value === dias ? " monedaInfo__boton-seleccionado" : ""
                }`}
                key={dia.value}
                onClick={() => {
                  setDias(dia.value);
                  setflag(false);
                }}
              >
                {dia.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MonedaInfo;
