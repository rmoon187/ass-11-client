import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner"; // Assume we have a custom loading component

// Lazy load components with prefetching
const SliderB = lazy(() => import("../components/SliderB"));
const RecentQueries = lazy(() => import("../components/RecentQueries"));
const HowItWorks = lazy(() => import("../components/HowItWorks"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));
const TrendingProducts = lazy(() => import("../components/TrendingProducts"));

// Error boundary with better error handling
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component Error:", error, errorInfo);
    // You could log this to an error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={`${this.props.heightClass} bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 p-4`}>
          <div className="text-center">
            <p className="text-red-500 font-medium">{this.props.fallback}</p>
            {this.state.error && (
              <details className="mt-2 text-xs">
                <summary>Error details</summary>
                {this.state.error.toString()}
              </details>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const Home = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Preload components during idle time
  useEffect(() => {
    const preloadComponents = () => {
      const components = [
        import("../components/SliderB"),
        import("../components/RecentQueries"),
        import("../components/HowItWorks"),
        import("../components/WhyChooseUs"),
        import("../components/TrendingProducts")
      ];
      
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          components.forEach(component => component().catch(() => {}));
        });
      } else {
        const timer = setTimeout(() => {
          components.forEach(component => component().catch(() => {}));
        }, 2000);
        return () => clearTimeout(timer);
      }
    };

    preloadComponents();
  }, []);

  // Fetch data with cancellation
  useEffect(() => {
    const source = axios.CancelToken.source();
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-queries?limit=6`,
          {
            withCredentials: true,
            cancelToken: source.token,
          }
        );

        if (isMounted) {
          const formatted = response.data.map((q) => ({
            ...q,
            createdAt: q.createdAt 
              ? new Date(q.createdAt).toLocaleDateString() 
              : "N/A",
          }));
          setQueries(formatted);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted && !axios.isCancel(err)) {
          setError(err.message || "Failed to load data");
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      source.cancel("Component unmounted");
    };
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <main className="dark:text-white w-full max-w-7xl mx-auto my-14 space-y-20 px-4 sm:px-6 lg:px-8">
      <Section fallback="Slider failed to load" heightClass="lg:h-[700px]">
        <SliderB />
      </Section>

      <Section fallback="Recent Queries failed to load">
        <RecentQueries queries={queries} />
      </Section>

      <Section fallback="How It Works failed to load">
        <HowItWorks />
      </Section>

      <Section fallback="Why Choose Us failed to load">
        <WhyChooseUs />
      </Section>

      <Section fallback="Trending Products failed to load">
        <TrendingProducts />
      </Section>
    </main>
  );
};

// Reusable Section wrapper with optimized loading states
const Section = ({ children, fallback, heightClass = "h-96" }) => (
  <ErrorBoundary fallback={fallback} heightClass={heightClass}>
    <Suspense fallback={<SectionPlaceholder heightClass={heightClass} />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// Optimized loading placeholder
const SectionPlaceholder = ({ heightClass }) => (
  <div 
    className={`${heightClass} bg-gray-200 dark:bg-gray-800 rounded-2xl relative overflow-hidden`}
    aria-hidden="true"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1.5s_infinite]"></div>
  </div>
);

// Full-page loading screen
const LoadingScreen = () => (
  <div className="flex justify-center items-center h-screen bg-white dark:bg-gray-900">
    <LoadingSpinner size="lg" />
    <span className="sr-only">Loading...</span>
  </div>
);

// Full-page error screen
const ErrorScreen = ({ error }) => (
  <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900 p-4 text-center">
    <div className="max-w-md">
      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {error || "Failed to load page content"}
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default Home;