import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const WhatWeAre = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 sm:py-32 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-6 px-4 py-1.5 rounded-full border border-primary/15 bg-primary/5">
              The Vision
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-8">
              We're not just another  <br /><span className="liquid-underline">tool...</span>
              <br />
              We're your{" "}<br />
              <span className="liquid-underline">digital brain</span>.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto"
          >
            Building a brand manually is a relic of 2023. In the new economy, those who leverage{" "}
            <span className="font-semibold text-foreground">agents win</span>. We provide the infrastructure
            for you to own your market without touching a keyboard.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAre;
