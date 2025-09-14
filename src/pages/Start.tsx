import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "@/components/layout/Layout";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  DollarSign, 
  Briefcase, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Step 1: Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Loan Details
  loanType: string;
  homePrice: string;
  downPayment: string;
  loanPurpose: string;
  
  // Step 3: Income & Employment
  annualIncome: string;
  employmentType: string;
  employer: string;
  yearsEmployed: string;
  
  // Step 4: Additional Info
  creditScore: string;
  monthlyDebts: string;
  hasCoApplicant: string;
}

const steps = [
  {
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: User,
    fields: ["firstName", "lastName", "email", "phone"]
  },
  {
    title: "Loan Details", 
    description: "What type of loan do you need?",
    icon: DollarSign,
    fields: ["loanType", "homePrice", "downPayment", "loanPurpose"]
  },
  {
    title: "Income & Employment",
    description: "Help us understand your financial situation",
    icon: Briefcase,
    fields: ["annualIncome", "employmentType", "employer", "yearsEmployed"]
  },
  {
    title: "Review & Submit",
    description: "Review your information and submit",
    icon: CheckCircle,
    fields: ["creditScore", "monthlyDebts", "hasCoApplicant"]
  }
];

export default function Start() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    loanType: "",
    homePrice: "",
    downPayment: "",
    loanPurpose: "",
    annualIncome: "",
    employmentType: "",
    employer: "",
    yearsEmployed: "",
    creditScore: "",
    monthlyDebts: "",
    hasCoApplicant: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (stepIndex: number) => {
    const stepFields = steps[stepIndex].fields;
    const newErrors: Record<string, string> = {};
    
    stepFields.forEach(field => {
      if (!formData[field as keyof FormData]) {
        newErrors[field] = "This field is required";
      }
    });

    // Additional validation
    if (stepIndex === 0) {
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 24 hours.",
      });
      console.log("Form submitted:", formData);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className={errors.phone ? "border-destructive" : ""}
                placeholder="(555) 123-4567"
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loanType">Loan Type *</Label>
              <Select value={formData.loanType} onValueChange={(value) => updateFormData("loanType", value)}>
                <SelectTrigger className={errors.loanType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conventional">Conventional</SelectItem>
                  <SelectItem value="fha">FHA</SelectItem>
                  <SelectItem value="va">VA</SelectItem>
                  <SelectItem value="usda">USDA</SelectItem>
                  <SelectItem value="jumbo">Jumbo</SelectItem>
                </SelectContent>
              </Select>
              {errors.loanType && <p className="text-sm text-destructive">{errors.loanType}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="homePrice">Home Price *</Label>
                <Input
                  id="homePrice"
                  type="number"
                  value={formData.homePrice}
                  onChange={(e) => updateFormData("homePrice", e.target.value)}
                  className={errors.homePrice ? "border-destructive" : ""}
                  placeholder="400000"
                />
                {errors.homePrice && <p className="text-sm text-destructive">{errors.homePrice}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment *</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={formData.downPayment}
                  onChange={(e) => updateFormData("downPayment", e.target.value)}
                  className={errors.downPayment ? "border-destructive" : ""}
                  placeholder="80000"
                />
                {errors.downPayment && <p className="text-sm text-destructive">{errors.downPayment}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="loanPurpose">Loan Purpose *</Label>
              <Select value={formData.loanPurpose} onValueChange={(value) => updateFormData("loanPurpose", value)}>
                <SelectTrigger className={errors.loanPurpose ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="purchase">Purchase</SelectItem>
                  <SelectItem value="refinance">Refinance</SelectItem>
                  <SelectItem value="cashout">Cash-out Refinance</SelectItem>
                </SelectContent>
              </Select>
              {errors.loanPurpose && <p className="text-sm text-destructive">{errors.loanPurpose}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income *</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => updateFormData("annualIncome", e.target.value)}
                  className={errors.annualIncome ? "border-destructive" : ""}
                  placeholder="75000"
                />
                {errors.annualIncome && <p className="text-sm text-destructive">{errors.annualIncome}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type *</Label>
                <Select value={formData.employmentType} onValueChange={(value) => updateFormData("employmentType", value)}>
                  <SelectTrigger className={errors.employmentType ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">Full-time Employee</SelectItem>
                    <SelectItem value="parttime">Part-time Employee</SelectItem>
                    <SelectItem value="selfemployed">Self-employed</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
                {errors.employmentType && <p className="text-sm text-destructive">{errors.employmentType}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employer">Employer *</Label>
              <Input
                id="employer"
                value={formData.employer}
                onChange={(e) => updateFormData("employer", e.target.value)}
                className={errors.employer ? "border-destructive" : ""}
                placeholder="Company name"
              />
              {errors.employer && <p className="text-sm text-destructive">{errors.employer}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearsEmployed">Years at Current Job *</Label>
              <Input
                id="yearsEmployed"
                type="number"
                step="0.5"
                value={formData.yearsEmployed}
                onChange={(e) => updateFormData("yearsEmployed", e.target.value)}
                className={errors.yearsEmployed ? "border-destructive" : ""}
                placeholder="2.5"
              />
              {errors.yearsEmployed && <p className="text-sm text-destructive">{errors.yearsEmployed}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="creditScore">Estimated Credit Score *</Label>
                  <Select value={formData.creditScore} onValueChange={(value) => updateFormData("creditScore", value)}>
                    <SelectTrigger className={errors.creditScore ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (740+)</SelectItem>
                      <SelectItem value="good">Good (670-739)</SelectItem>
                      <SelectItem value="fair">Fair (580-669)</SelectItem>
                      <SelectItem value="poor">Poor (below 580)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.creditScore && <p className="text-sm text-destructive">{errors.creditScore}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monthlyDebts">Monthly Debt Payments *</Label>
                  <Input
                    id="monthlyDebts"
                    type="number"
                    value={formData.monthlyDebts}
                    onChange={(e) => updateFormData("monthlyDebts", e.target.value)}
                    className={errors.monthlyDebts ? "border-destructive" : ""}
                    placeholder="500"
                  />
                  {errors.monthlyDebts && <p className="text-sm text-destructive">{errors.monthlyDebts}</p>}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hasCoApplicant">Do you have a co-applicant? *</Label>
                <Select value={formData.hasCoApplicant} onValueChange={(value) => updateFormData("hasCoApplicant", value)}>
                  <SelectTrigger className={errors.hasCoApplicant ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
                {errors.hasCoApplicant && <p className="text-sm text-destructive">{errors.hasCoApplicant}</p>}
              </div>
            </div>

            {/* Review Summary */}
            <div className="bg-accent p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Application Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="font-medium">Email:</span> {formData.email}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                </div>
                <div>
                  <p><span className="font-medium">Loan Type:</span> {formData.loanType}</p>
                  <p><span className="font-medium">Home Price:</span> ${parseInt(formData.homePrice || "0").toLocaleString()}</p>
                  <p><span className="font-medium">Annual Income:</span> ${parseInt(formData.annualIncome || "0").toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      {/* Header */}
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
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Get Pre-Approved Today
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete our simple application and get pre-approved in minutes, not days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className={`
                    h-12 w-12 rounded-full flex items-center justify-center border-2 transition-smooth
                    ${isActive ? 'bg-primary border-primary text-white' : 
                      isCompleted ? 'bg-success border-success text-white' : 
                      'bg-background border-border text-muted-foreground'}
                  `}>
                    {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  </div>
                  <div className="text-center hidden md:block">
                    <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {(() => {
                    const Icon = steps[currentStep].icon;
                    return <Icon className="h-5 w-5 text-primary" />;
                  })()}
                  <span>{steps[currentStep].title}</span>
                </CardTitle>
                <CardDescription>{steps[currentStep].description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                variant="hero"
                onClick={handleSubmit}
                className="flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Submit Application</span>
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={nextStep}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}