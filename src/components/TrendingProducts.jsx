import { motion } from "framer-motion";
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const TrendingProducts = () => {
  const trendingItems = [
    [
      { name: "Smart Watches", emoji: "⌚", bg: "from-blue-400 to-blue-500" },
      { name: "Wireless Earbuds", emoji: "🎧", bg: "from-teal-400 to-teal-500" },
      { name: "Latest Phones", emoji: "📱", bg: "from-green-400 to-green-500" },
      { name: "Gaming Laptops", emoji: "💻", bg: "from-cyan-400 to-cyan-500" }
    ],
    [
      { name: "Drones", emoji: "🚁", bg: "from-amber-400 to-amber-500" },
      { name: "VR Headsets", emoji: "👓", bg: "from-red-400 to-red-500" },
      { name: "Smart Speakers", emoji: "🔊", bg: "from-emerald-400 to-emerald-500" },
      { name: "Digital Cameras", emoji: "📷", bg: "from-violet-400 to-violet-500" }
    ]
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-500 to-green-600 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white dark:text-gray-100">
            Trending Now
          </h2>
          <p className="text-white/80 dark:text-gray-300 max-w-2xl mx-auto">
            Discover what products our community is loving right now
          </p>
        </motion.div>

        <LazyLoadComponent>
          <div className="space-y-6 mb-8">
            {trendingItems.map((group, groupIndex) => (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: groupIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {group.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      whileHover={{ y: -5 }}
                      className={`bg-gradient-to-r ${item.bg} rounded-xl p-6 shadow-lg h-full flex flex-col items-center justify-center`}
                    >
                      <div className="text-3xl mb-3">{item.emoji}</div>
                      <h3 className="font-semibold text-white text-center text-sm sm:text-base">
                        {item.name}
                      </h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </LazyLoadComponent>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="px-6 py-3 text-sm sm:text-base font-medium rounded-full bg-white text-blue-600 hover:shadow-lg transition-all hover:-translate-y-0.5 dark:bg-gray-700 dark:text-gray-100">
            Explore All Trending Products
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingProducts;