import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setRates } from "../../redux/features/currencySlice";
import { store } from "../../redux/store";

const useFetchConversionRates = () => {
  const dispatch = useDispatch();

  const API_KEY = "5e5ca8bd829f5a9bb5ef977f58b04551";

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangeratesapi.io/v1/latest",
          {
            params: {
              access_key: API_KEY,
              base: "NGN",
            },
          },
        );
        const rates = response.data.rates;
        dispatch(setRates(rates));
      } catch (error) {
        console.error("Error fetching conversion rates:", error);
        console.error(
          "Error details:",
          error.response ? error.response.data : null,
        );
      }
    };

    fetchConversionRate();
  }, [dispatch]);
};

export default useFetchConversionRates;
