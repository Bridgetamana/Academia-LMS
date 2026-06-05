"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBookReader, FaRegCalendarAlt, FaRegChartBar, FaUserGraduate } from "react-icons/fa";

const Features = () => {
  const featuresList = [
    {
      title: "Streamlined Curriculum",
      description: "Organize lessons, modules, and resources cleanly. Let your content speak for itself without UI clutter.",
      icon: <FaBookReader className="text-xl text-text-main" />,
    },
    {
      title: "Intelligent Scheduling",
      description: "Set cohorts, due dates, and live sessions in one unified calendar integrated directly into the student experience.",
      icon: <FaRegCalendarAlt className="text-xl text-text-main" />,
    },
    {
      title: "Deep Analytics",
      description: "Track completion rates and engagement metrics to understand exactly where students drop off.",
      icon: <FaRegChartBar className="text-xl text-text-main" />,
    },
    {
      title: "Built for Educators",
      description: "From individual creators to full-scale bootcamps, the platform scales gracefully to fit your operational needs.",
      icon: <FaUserGraduate className="text-xl text-text-main" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="bg-surface relative py-20 lg:py-24 overflow-hidden border-y border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-main leading-tight mb-4">
            Everything you need to run your academy.
          </h2>
          <p className="text-text-muted text-lg font-sans">
            A comprehensive toolkit designed to help you build, manage, and scale your educational product.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {featuresList.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white border border-border p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6 text-text-main">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-text-main mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
