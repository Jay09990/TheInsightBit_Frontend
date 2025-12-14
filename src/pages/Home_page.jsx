import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '../components/home_components/Slider';
import HeadlineCardsList from '../components/home_components/HeadlineCards';
import Spinner from '../components/util/Spinner';

const Home_page = () => {
  const [sliderData, setSliderData] = useState([]);
  const [headlineData, setHeadlineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Resolve API base URL from environment. If neither render nor local env var is set,
        // fall back to a safe default (local backend). This prevents building malformed
        // requests like `undefined/post/...` when env vars are missing.
        // Recommended: set VITE_API_BASE_URL_RENDER (production) or VITE_API_BASE_URL_LOCAL (dev).
        const API_BASE_URL =
          import.meta.env.VITE_API_BASE_URL_RENDER ||
          import.meta.env.VITE_API_BASE_URL_LOCAL ||
          'http://localhost:5000';

        if (!import.meta.env.VITE_API_BASE_URL_RENDER && !import.meta.env.VITE_API_BASE_URL_LOCAL) {
          // eslint-disable-next-line no-console
          console.warn(
            '[Warning] No VITE_API_BASE_URL_RENDER or VITE_API_BASE_URL_LOCAL found. Using fallback:',
            API_BASE_URL
          );
        }
        const [sliderRes, headlinesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/post/slider?limit=5`),
          axios.get(`${API_BASE_URL}/post/headlines?limit=15`)
        ]);
  setSliderData(sliderRes.data?.data || []);
  setHeadlineData(headlinesRes.data?.data || []);
      } catch (error) {
        console.error("Error fetching data for home page:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <Slider slides={sliderData} />
          <HeadlineCardsList headlines={headlineData} />
        </>
      )}
    </div>
  );
};

export default Home_page;
