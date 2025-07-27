import { 
  calculateMonthlyPayment, 
  generateAmortizationSchedule, 
  calculateLoanSummary 
} from './loanCalculations';

describe('Loan Calculations', () => {
  test('calculateMonthlyPayment should return correct monthly payment', () => {
    const principal = 100000;
    const annualRate = 5;
    const years = 30;
    
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
    
    expect(monthlyPayment).toBeCloseTo(536.82, 2);
  });

  test('calculateMonthlyPayment should handle zero interest rate', () => {
    const principal = 100000;
    const annualRate = 0;
    const years = 30;
    
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, years);
    
    expect(monthlyPayment).toBeCloseTo(277.78, 2);
  });

  test('generateAmortizationSchedule should create correct schedule', () => {
    const principal = 10000;
    const annualRate = 6;
    const years = 1;
    
    const schedule = generateAmortizationSchedule(principal, annualRate, years);
    
    expect(schedule).toHaveLength(12);
    expect(schedule[0].paymentNumber).toBe(1);
    expect(schedule[0].remainingBalance).toBeLessThan(principal);
    expect(schedule[11].remainingBalance).toBeCloseTo(0, 2);
  });

  test('calculateLoanSummary should return correct summary', () => {
    const principal = 100000;
    const annualRate = 5;
    const years = 30;
    
    const summary = calculateLoanSummary(principal, annualRate, years);
    
    expect(summary.principal).toBe(principal);
    expect(summary.monthlyPayment).toBeCloseTo(536.82, 2);
    expect(summary.totalPayments).toBeCloseTo(193255.78, 2);
    expect(summary.totalInterest).toBeCloseTo(93255.78, 2);
  });
});