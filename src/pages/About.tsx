import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { 
  Heart, 
  Target, 
  Users, 
  Lightbulb, 
  Shield, 
  TrendingUp 
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make puts our customers' needs and experiences at the center."
  },
  {
    icon: Target,
    title: "Transparency",
    description: "No hidden fees, no surprises. We believe in clear, honest communication throughout the process."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We're constantly improving our technology to make homeownership more accessible."
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your financial information is protected with bank-level security and encryption."
  }
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "CEO & Founder",
    description: "Former VP at Goldman Sachs with 15+ years in financial services."
  },
  {
    name: "David Chen",
    role: "CTO",
    description: "Ex-Google engineer specializing in fintech and machine learning."
  },
  {
    name: "Maria Rodriguez",
    role: "Head of Lending",
    description: "20+ years experience in mortgage lending and risk management."
  },
  {
    name: "James Wilson",
    role: "VP of Product",
    description: "Product leader with experience at Stripe and Square."
  },
  {
    name: "Lisa Thompson",
    role: "Chief Risk Officer",
    description: "Former Federal Reserve analyst with expertise in regulatory compliance."
  },
  {
    name: "Michael Kim",
    role: "Head of Customer Success",
    description: "Customer experience expert from Airbnb and Uber."
  }
];

const timeline = [
  {
    year: "2018",
    title: "Company Founded",
    description: "Started with a mission to make homeownership more accessible through technology."
  },
  {
    year: "2019",
    title: "First Digital Platform",
    description: "Launched our fully digital mortgage application process, reducing approval time from weeks to hours."
  },
  {
    year: "2020",
    title: "Series A Funding",
    description: "Raised $50M to expand our platform and serve more customers nationwide."
  },
  {
    year: "2021",
    title: "100K Customers",
    description: "Reached milestone of serving over 100,000 satisfied customers across 50 states."
  },
  {
    year: "2022",
    title: "AI Integration",
    description: "Introduced AI-powered risk assessment and personalized rate matching."
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Named 'Best Digital Mortgage Lender' by Financial Technology Awards."
  },
  {
    year: "2024",
    title: "Continued Growth",
    description: "Expanding our services with new products and partnerships to serve even more customers."
  }
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Making homeownership{" "}
              <span className="text-primary">accessible</span>{" "}
              for everyone
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              We're on a mission to revolutionize the mortgage industry through technology, 
              transparency, and putting customers first. Since 2018, we've helped over 100,000 
              families achieve their dream of homeownership.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "100K+", label: "Happy Customers" },
              { number: "$50B+", label: "Loans Funded" },
              { number: "4.9/5", label: "Customer Rating" },
              { number: "15min", label: "Average Approval Time" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape our company culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
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
                      <CardTitle className="text-xl font-semibold">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-muted-foreground">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
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
              Leadership Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the experienced leaders driving our mission forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 shadow-card hover:shadow-lg-custom transition-smooth">
                  <CardContent className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="text-sm text-muted-foreground mt-2">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From startup to industry leader - here's how we've grown.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary hidden md:block"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-center mb-8 md:mb-12"
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-16 h-16 bg-primary rounded-full items-center justify-center text-white font-bold text-sm shadow-card">
                    {item.year}
                  </div>
                  
                  {/* Content */}
                  <Card className="flex-1 md:ml-6 p-6 shadow-card">
                    <CardContent className="space-y-2">
                      <div className="md:hidden text-primary font-bold text-lg">{item.year}</div>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}