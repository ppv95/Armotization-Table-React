import React, { useState } from "react";

import {
  Card,
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const FormCard = () => {
  const classes = useStyle();

  function handleSumit(event) {
    event.preventDefault();
  }

  return (
    <>
      <Card variant="outlined" className={classes.root} color="primary">
        <form
          onSubmit={handleSumit}
          form
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="cantidad-prestamo"
              label="Cantidad del prestamo"
              className={classes.margin}
            />

            <TextField id="cantidad-prestamo" label="Ingresos mensuales" />
          </div>

          <br />
          <div>
            <TextField id="tasa-input" label="Tasa del interes" />
          </div>

          <Button variant="outlined" color="primary">
            Primary
          </Button>
          <Button variant="outlined" color="secondary">
            Secondary
          </Button>
        </form>
      </Card>
    </>
  );
};

export default FormCard;
