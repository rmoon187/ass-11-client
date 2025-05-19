import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const RecentQueries = ({ queries = [] }) => {
  if (queries.length === 0) {
    return (
      <div className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl text-center">
        <div className="max-w-md mx-auto p-6 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
            No Recent Queries
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your recent queries will appear here once you start searching.
          </p>
          <Link 
            to="/search" 
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full text-sm"
          >
            Start Searching
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400">
            Recent Queries
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your recently searched product inquiries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map((query, index) => (
            <motion.div
              key={query._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              whileHover={{ y: -5 }}
              className="bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700/50"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
                      {query.queryTitle}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {query.createdAt}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm line-clamp-2">
                  {query.reasonDetails}
                </p>
                <Link
                  to={`/query-details/${query._id}`}
                  className="mt-4 inline-block px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-md transition-all"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentQueries;