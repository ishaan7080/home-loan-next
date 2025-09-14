import { Link } from "react-router-dom";
import { Home, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Products: [
    { name: "Mortgage Calculator", href: "/calculator" },
    { name: "Home Loans", href: "#" },
    { name: "Refinancing", href: "#" },
    { name: "Insurance", href: "#" },
  ],
  Support: [
    { name: "Help Center", href: "#" },
    { name: "Customer Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
  Contact: [
    { name: "1-800-BETTER", href: "tel:1-800-238-8837", icon: Phone },
    { name: "hello@better.com", href: "mailto:hello@better.com", icon: Mail },
    { name: "New York, NY", href: "#", icon: MapPin },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Better Finance</span>
            </Link>
            <p className="text-muted-foreground">
              Making homeownership simple, fast, and affordable for everyone.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>© 2024 Better Finance. All rights reserved.</p>
              <p className="mt-1">NMLS #12345</p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            Better Finance is a registered trademark. All loans subject to credit approval.
            Equal Housing Opportunity Lender.
          </p>
        </div>
      </div>
    </footer>
  );
}