import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { DollarSign, Calculator as CalculatorIcon, TrendingUp, Home } from "lucide-react";

interface CalculationResult {
  monthlyPayment: number;
  principalAndInterest: number;
  taxes: number;
  insurance: number;
  hoa: number;
  totalInterest: number;
  totalPayments: number;
}

export default function Calculator() {
  const [homePrice, setHomePrice] = useState("400000");
  const [downPayment, setDownPayment] = useState("80000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("5000");
  const [insurance, setInsurance] = useState("1200");
  const [hoa, setHoa] = useState("0");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateMortgage = () => {
    const P = parseFloat(homePrice) - parseFloat(downPayment); // Loan amount
    const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const n = parseFloat(loanTerm) * 12; // Total number of payments
    const monthlyTax = parseFloat(propertyTax) / 12;
    const monthlyInsurance = parseFloat(insurance) / 12;
    const monthlyHoa = parseFloat(hoa);

    // Calculate monthly principal and interest using mortgage formula
    const principalAndInterest = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    const totalMonthlyPayment = principalAndInterest + monthlyTax + monthlyInsurance + monthlyHoa;
    const totalPayments = principalAndInterest * n;
    const totalInterest = totalPayments - P;

    setResult({
      monthlyPayment: totalMonthlyPayment,
      principalAndInterest,
      taxes: monthlyTax,
      insurance: monthlyInsurance,
      hoa: monthlyHoa,
      totalInterest,
      totalPayments
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance, hoa]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const chartData = result ? [
    { name: 'Principal & Interest', value: result.principalAndInterest, color: '#16a34a' },
    { name: 'Property Taxes', value: result.taxes, color: '#059669' },
    { name: 'Insurance', value: result.insurance, color: '#10b981' },
    { name: 'HOA Fees', value: result.hoa, color: '#34d399' }
  ].filter(item => item.value > 0) : [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center">
                <CalculatorIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Mortgage Calculator
            </h1>
            <p className="text-lg text-muted-foreground">
              Get accurate estimates for your monthly mortgage payments including taxes, insurance, and HOA fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-6 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Home className="h-5 w-5 text-primary" />
                    <span>Loan Details</span>
                  </CardTitle>
                  <CardDescription>
                    Enter your loan information to calculate your monthly payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="homePrice">Home Price</Label>
                      <Input
                        id="homePrice"
                        type="number"
                        value={homePrice}
                        onChange={(e) => setHomePrice(e.target.value)}
                        placeholder="400000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="downPayment">Down Payment</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        placeholder="80000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="6.5"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm">Loan Term (years)</Label>
                      <Input
                        id="loanTerm"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="30"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="propertyTax">Annual Property Tax</Label>
                      <Input
                        id="propertyTax"
                        type="number"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(e.target.value)}
                        placeholder="5000"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="insurance">Annual Insurance</Label>
                      <Input
                        id="insurance"
                        type="number"
                        value={insurance}
                        onChange={(e) => setInsurance(e.target.value)}
                        placeholder="1200"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="hoa">Monthly HOA Fees</Label>
                      <Input
                        id="hoa"
                        type="number"
                        value={hoa}
                        onChange={(e) => setHoa(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateMortgage} variant="hero" className="w-full">
                    <CalculatorIcon className="mr-2 h-4 w-4" />
                    Recalculate
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Monthly Payment Card */}
              <Card className="p-6 shadow-card bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span>Monthly Payment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {result ? formatCurrency(result.monthlyPayment) : '$0'}
                  </div>
                  <p className="text-muted-foreground">Total monthly payment including all costs</p>
                </CardContent>
              </Card>

              {/* Payment Breakdown */}
              {result && (
                <Card className="p-6 shadow-card">
                  <CardHeader>
                    <CardTitle>Payment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Principal & Interest:</span>
                        <span className="font-semibold">{formatCurrency(result.principalAndInterest)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Taxes:</span>
                        <span className="font-semibold">{formatCurrency(result.taxes)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Insurance:</span>
                        <span className="font-semibold">{formatCurrency(result.insurance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">HOA Fees:</span>
                        <span className="font-semibold">{formatCurrency(result.hoa)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Chart */}
              {result && chartData.length > 0 && (
                <Card className="p-6 shadow-card">
                  <CardHeader>
                    <CardTitle>Payment Composition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            innerRadius={40}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Loan Summary */}
              {result && (
                <Card className="p-6 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>Loan Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Loan Amount:</span>
                      <span className="font-semibold">{formatCurrency(parseFloat(homePrice) - parseFloat(downPayment))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Interest:</span>
                      <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Payments:</span>
                      <span className="font-semibold">{formatCurrency(result.totalPayments)}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Make It Official?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Get pre-approved with these exact numbers and lock in your rate today.
            </p>
            <Button variant="secondary" size="xl" asChild>
              <motion.a
                href="/start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Pre-Approved Now
              </motion.a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}