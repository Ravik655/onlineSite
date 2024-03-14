import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://onlinesite.onrender.com";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${ BASE_URL}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
