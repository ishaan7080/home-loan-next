import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { 
  Calculator, 
  Clock, 
  Shield, 
  Star, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const features = [
  {
    icon: Calculator,
    title: "Smart Calculator",
    description: "Get instant mortgage estimates with our advanced calculator that factors in all costs."
  },
  {
    icon: Clock,
    title: "Fast Approval",
    description: "Get pre-approved in minutes, not days. Our streamlined process saves you time."
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Bank-level security with transparent pricing. No hidden fees or surprises."
  },
  {
    icon: TrendingUp,
    title: "Best Rates",
    description: "Access competitive rates and save thousands over the life of your loan."
  }
];

const testimonials = [
  {
    quote: "Better Finance made buying my first home incredibly simple. The process was transparent and fast.",
    author: "Sarah Johnson",
    role: "First-time Homebuyer",
    rating: 5
  },
  {
    quote: "I saved over $50,000 by refinancing through Better Finance. Couldn't be happier!",
    author: "Michael Chen",
    role: "Homeowner",
    rating: 5
  },
  {
    quote: "The digital experience was seamless. I completed everything online in just a few days.",
    author: "Emily Rodriguez",
    role: "Real Estate Investor",
    rating: 5
  }
];

export default function Index() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "We'll send you information about getting started.",
      });
      setEmail("");
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-hero overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Make homeownership{" "}
              <span className="text-primary">simple, fast,</span>{" "}
              and affordable
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get pre-approved in minutes with our digital-first mortgage experience. 
              No paperwork, no waiting, no hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/start">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/calculator">
                  <Calculator className="mr-2 h-5 w-5" />
                  Try Calculator
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Better Finance?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing the mortgage industry with technology that puts you first.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full p-6 shadow-card hover:shadow-lg-custom transition-smooth">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-primary-light flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-muted-foreground">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-lg font-semibold text-foreground">4.9/5 Rating</span>
            </div>
            <p className="text-lg text-muted-foreground">
              Trusted by over 100,000 homeowners nationwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 shadow-card">
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="text-foreground italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="pt-4 border-t border-border">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of satisfied customers and get pre-approved in minutes.
            </p>
            
            <Card className="p-6 shadow-lg-custom">
              <form onSubmit={handleGetStarted} className="space-y-4">
                <div className="text-left">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Get Pre-Approved Now
                </Button>
                <p className="text-xs text-muted-foreground">
                  No impact to your credit score. Secure and confidential.
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}