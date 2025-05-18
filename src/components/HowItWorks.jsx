import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { PenSquare, ShieldCheck, MessageSquare } from "lucide-react";
import lottiepic from "../assets/Animation - 1742632591155.json";

const HowItWorks = () => {
  const steps = [
    {
      title: "Post a Query",
      description: "Describe what product you're looking for and your specific needs",
      icon: <PenSquare className="h-6 w-6" />,
    },
    {
      title: "Receive Recommendations",
      description: "Get personalized suggestions from our community and experts",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
    {
      title: "Engage with Community",
      description: "Discuss, compare, and refine your choices with other users",
      icon: <MessageSquare className="h-6 w-6" />,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-400 rounded-full blur-[100px] opacity-20" />
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400 rounded-full blur-[100px] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized product recommendations in just 3 simple steps
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Animation */}
          <div className="lg:w-1/2">
            <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30">
              <Lottie animationData={lottiepic} className="w-full" />
            </div>
          </div>

          {/* Steps */}
          <div className="lg:w-1/2 space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-blue-50 text-blue-600">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium">
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 ml-11">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;