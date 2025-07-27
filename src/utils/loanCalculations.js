export const calculateMonthlyPayment = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return monthlyPayment;
};

export const generateAmortizationSchedule = (principal, annualRate, years) => {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const schedule = [];
  let remainingBalance = principal;
  
  for (let payment = 1; payment <= numberOfPayments; payment++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance = remainingBalance - principalPayment;
    
    if (remainingBalance < 0.01) {
      remainingBalance = 0;
    }
    
    schedule.push({
      paymentNumber: payment,
      monthlyPayment: monthlyPayment,
      principalPayment: principalPayment,
      interestPayment: interestPayment,
      remainingBalance: remainingBalance
    });
    
    if (remainingBalance === 0) break;
  }
  
  return schedule;
};

export const calculateLoanSummary = (principal, annualRate, years) => {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
  const totalPayments = monthlyPayment * years * 12;
  const totalInterest = totalPayments - principal;
  
  return {
    monthlyPayment,
    totalPayments,
    totalInterest,
    principal
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};