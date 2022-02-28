import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";

import { CryptoState } from "../../context/cryptoContext/CryptoContext";

import "./navbar.scss";

const Navbar = () => {
  const { divisa, setDivisa } = CryptoState();
  const navegar = useNavigate();

  const handleChange = (event) => {
    setDivisa(event.target.value);
  };

  return (
    <AppBar className="navbar__contenedor" position="static">
      <Container maxWidth="xl">
        <Toolbar className="navbar__toolbar" disableGutters>
          <Link className="navbar__empresa" to="/">
            <div className="navbar__logo"></div>
            <Typography
              className="navbar__nombre"
              variant="h6"
              noWrap
              component="div"
              onClick={() => navegar("/")}
            >
              CryptoGal
            </Typography>
          </Link>
          <Select
            sx={{ width: 100, height: 40, color: "#333" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={divisa}
            label="Moneda"
            onChange={handleChange}
          >
            <MenuItem value="eur">Euro</MenuItem>
            <MenuItem value="usd">Dollar</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
