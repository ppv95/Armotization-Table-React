import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Grid
} from "@mui/material";

const FormCard = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    loanAmount: "",
    monthlyIncome: "",
    interestRate: "",
    loanTerm: ""
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setFormData({ ...formData, [field]: value });
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.loanAmount || parseFloat(formData.loanAmount) <= 0) {
      newErrors.loanAmount = "Ingrese una cantidad válida del préstamo";
    }
    
    if (!formData.interestRate || parseFloat(formData.interestRate) < 0) {
      newErrors.interestRate = "Ingrese una tasa de interés válida";
    }
    
    if (!formData.loanTerm || parseInt(formData.loanTerm) <= 0) {
      newErrors.loanTerm = "Ingrese un plazo válido en años";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      const calculationData = {
        loanAmount: parseFloat(formData.loanAmount),
        monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
        interestRate: parseFloat(formData.interestRate),
        loanTerm: parseInt(formData.loanTerm)
      };
      
      onCalculate(calculationData);
    }
  };

  const handleClear = () => {
    setFormData({
      loanAmount: "",
      monthlyIncome: "",
      interestRate: "",
      loanTerm: ""
    });
    setErrors({});
    onCalculate(null);
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        minWidth: 275, 
        margin: 2.5, 
        padding: 2.5 
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Calculadora de Amortización
        </Typography>
        
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="loan-amount"
                label="Cantidad del préstamo ($)"
                type="number"
                value={formData.loanAmount}
                onChange={handleInputChange("loanAmount")}
                error={!!errors.loanAmount}
                helperText={errors.loanAmount}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="monthly-income"
                label="Ingresos mensuales ($)"
                type="number"
                value={formData.monthlyIncome}
                onChange={handleInputChange("monthlyIncome")}
                sx={{ mb: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="interest-rate"
                label="Tasa de interés anual (%)"
                type="number"
                value={formData.interestRate}
                onChange={handleInputChange("interestRate")}
                error={!!errors.interestRate}
                helperText={errors.interestRate}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="loan-term"
                label="Plazo del préstamo (años)"
                type="number"
                value={formData.loanTerm}
                onChange={handleInputChange("loanTerm")}
                error={!!errors.loanTerm}
                helperText={errors.loanTerm}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
          </Grid>

          <Box mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2, mr: 1 }}
            >
              Calcular Amortización
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              sx={{ mt: 2, mr: 1 }}
              onClick={handleClear}
            >
              Limpiar
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormCard;
