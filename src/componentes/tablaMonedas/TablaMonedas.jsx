import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import {
  Container,
  Typography,
  TextField,
  TableContainer,
  Paper,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";

import { listaMonedas } from "../../config/api";

import { CryptoState } from "../../context/cryptoContext/CryptoContext";

import "./tablaMonedas.scss";

function numeroConComas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TablaMonedas = () => {
  const navegar = useNavigate();
  const { divisa } = CryptoState();
  const [monedas, setMonedas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscar, setBuscar] = useState("");
  const [pagina, setPagina] = useState(1);

  const conseguirMonedas = async () => {
    setLoading(true);
    const { data } = await axios.get(listaMonedas(divisa));
    setMonedas(data);
    setLoading(false);
  };

  useEffect(() => {
    conseguirMonedas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divisa]);

  const manejarBusqueda = () => {
    return monedas.filter(
      (coin) =>
        coin.name.toLowerCase().includes(buscar) ||
        coin.symbol.toLowerCase().includes(buscar)
    );
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography className="tablaMonedas__heading" variant="h4">
        Precio por Capitalización de Mercado
      </Typography>
      <TextField
        label="Busca una criptomoneda.."
        variant="outlined"
        sx={{ marginBottom: 2, width: "100%" }}
        size="small"
        onChange={(e) => setBuscar(e.target.value)}
      />
      <TableContainer component={Paper}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Table aria-label="simple table">
            <TableHead sx={{ background: "#3f51b5" }}>
              <TableRow>
                {["Moneda", "Precio", "Variación 24h", "Cap. Mercado"].map(
                  (head) => (
                    <TableCell
                      sx={{
                        minWidth: 150,
                        fontWeight: 900,
                        color: "white",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Moneda" ? "center" : "right"}
                    >
                      {head}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {manejarBusqueda()
                .slice((pagina - 1) * 10, (pagina - 1) * 10 + 10)
                .map((row) => {
                  const beneficio = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navegar(`/monedas/${row.id}`)}
                      className={"tablaMonedas__fila"}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 10,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              textTransform: "uppercase",
                              fontSize: 20,
                              fontWeight: 900,
                              fontFamily: "Montserrat",
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        {divisa === "eur" ? "€" : "$"}{" "}
                        {numeroConComas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: beneficio > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {beneficio && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {divisa === "eur" ? "€" : "$"}{" "}
                        {numeroConComas(row.market_cap.toString().slice(0, -6))}
                        M
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        size="small"
        count={parseInt((manejarBusqueda()?.length / 10).toFixed(0))}
        style={{
          padding: "20px 5px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, value) => {
          setPagina(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
};

export default TablaMonedas;
