import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Box
} from "@mui/material";
import { formatCurrency } from "../utils/loanCalculations";

const AmortizationTable = ({ loanData, amortizationSchedule, loanSummary }) => {
  if (!loanData || !amortizationSchedule || !loanSummary) {
    return null;
  }

  return (
    <Box sx={{ margin: 2.5 }}>
      <Card sx={{ 
        marginBottom: 2.5, 
        backgroundColor: "#f5f5f5" 
      }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Resumen del Préstamo
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" color="textSecondary">
                Monto del Préstamo
              </Typography>
              <Typography variant="h6">
                {formatCurrency(loanSummary.principal)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" color="textSecondary">
                Pago Mensual
              </Typography>
              <Typography variant="h6" color="primary">
                {formatCurrency(loanSummary.monthlyPayment)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" color="textSecondary">
                Total de Pagos
              </Typography>
              <Typography variant="h6">
                {formatCurrency(loanSummary.totalPayments)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" color="textSecondary">
                Total de Intereses
              </Typography>
              <Typography variant="h6" color="secondary">
                {formatCurrency(loanSummary.totalInterest)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Tabla de Amortización
      </Typography>
      
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#e3f2fd" 
              }}>
                Pago #
              </TableCell>
              <TableCell sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#e3f2fd" 
              }} align="right">
                Pago Mensual
              </TableCell>
              <TableCell sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#e3f2fd" 
              }} align="right">
                Capital
              </TableCell>
              <TableCell sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#e3f2fd" 
              }} align="right">
                Interés
              </TableCell>
              <TableCell sx={{ 
                fontWeight: "bold", 
                backgroundColor: "#e3f2fd" 
              }} align="right">
                Saldo Restante
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {amortizationSchedule.map((payment) => (
              <TableRow key={payment.paymentNumber}>
                <TableCell component="th" scope="row">
                  {payment.paymentNumber}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(payment.monthlyPayment)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(payment.principalPayment)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(payment.interestPayment)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(payment.remainingBalance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box mt={2}>
        <Typography variant="caption" color="textSecondary">
          * Tasa de interés anual: {loanData.interestRate}% | 
          Plazo: {loanData.loanTerm} años ({loanData.loanTerm * 12} pagos)
        </Typography>
      </Box>
    </Box>
  );
};

export default AmortizationTable;
