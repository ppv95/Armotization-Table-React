import React, { useState } from "react";
import { Container } from "@mui/material";
import FormCard from "./FormCard";
import AmortizationTable from "./ArmotizationTable";
import { 
  generateAmortizationSchedule, 
  calculateLoanSummary 
} from "../utils/loanCalculations";

const MainPage = () => {
  const [loanData, setLoanData] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState(null);
  const [loanSummary, setLoanSummary] = useState(null);

  const handleCalculation = (calculationData) => {
    if (!calculationData) {
      setLoanData(null);
      setAmortizationSchedule(null);
      setLoanSummary(null);
      return;
    }

    const { loanAmount, interestRate, loanTerm } = calculationData;
    
    const schedule = generateAmortizationSchedule(loanAmount, interestRate, loanTerm);
    const summary = calculateLoanSummary(loanAmount, interestRate, loanTerm);
    
    setLoanData(calculationData);
    setAmortizationSchedule(schedule);
    setLoanSummary(summary);
  };

  return (
    <Container maxWidth="lg">
      <FormCard onCalculate={handleCalculation} />
      <AmortizationTable 
        loanData={loanData}
        amortizationSchedule={amortizationSchedule}
        loanSummary={loanSummary}
      />
    </Container>
  );
};

export default MainPage;
