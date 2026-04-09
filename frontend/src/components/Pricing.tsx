import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Bootstrapper",
    price: "₹0",
    period: "/month",
    description: "Free forever. Start mapping your brand.",
    features: [
      "Basic Brand Mapping",
      "1 Active Agent",
      "Weekly Reports",
      "Community support",
    ],
    popular: false,
    cta: "Start Free",
  },
  {
    name: "Velocity",
    price: "₹199",
    period: "/month",
    description: "For creators ready to scale at speed.",
    features: [
      "Deep DNA Synthesis",
      "3 Active Agents",
      "Daily Velocity Sync",
      "Cross-Platform Multi-Post",
      "Priority support",
    ],
    popular: true,
    cta: "Get Velocity",
  },
  {
    name: "Empire",
    price: "₹499",
    period: "/month",
    description: "For teams building category-defining brands.",
    features: [
      "Everything in Velocity",
      "Unlimited Agents",
      "Custom Voice Models",
      "24/7 Strategic Support",
      "Full Creative Control",
      "Custom integrations",
    ],
    popular: false,
    cta: "Contact Sales",
  },
];

const Pricing = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-24 sm:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Investment
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Simple pricing. <span className="gradient-text">No surprises.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 hover-lift transition-all ${
                plan.popular
                  ? "bg-primary text-primary-foreground ring-2 ring-primary shadow-xl scale-[1.02]"
                  : "glass-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold" style={{ background: "hsl(214, 100%, 97%)", color: "hsl(221, 83%, 53%)" }}>
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check size={16} className={plan.popular ? "text-primary-foreground" : "text-primary"} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-card text-primary hover:bg-card/90 font-semibold"
                    : "gradient-bg text-primary-foreground border-0"
                }`}
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
