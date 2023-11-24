import { useState, useEffect } from "react";
import axios from "axios";

const useCatApi = () => {
  const [catList, setCatList] = useState([]);
  const [votes, setVotes] = useState({});
  const [favorites, setFavorites] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catResponse, voteResponse, favoritesResponse] = await Promise.all([
          axios.get("https://api.thecatapi.com/v1/images"),
          axios.get("https://api.thecatapi.com/v1/votes"),
          axios.get("https://api.thecatapi.com/v1/favourites", {
            headers: {
              "x-api-key": "live_oC5bgGGSQ2R3O5m59uF3XAyB9fWu3EDUxjUXJLgyIiitnd3aJ6mC6O1QaKRQ508m",
            },
          }),
        ]);

        setCatList(catResponse.data);

        const voteData = {};
        voteResponse.data.forEach((vote) => {
          voteData[vote.image_id] = vote;
        });
        setVotes(voteData);

        const favoritesData = {};
        favoritesResponse.data.forEach((favorite) => {
          favoritesData[favorite.image.id] = favorite.id;
        });
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching cat data:", error);
        setError(`Error fetching cat data: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const uploadCat = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("https://api.thecatapi.com/v1/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-api-key": "live_oC5bgGGSQ2R3O5m59uF3XAyB9fWu3EDUxjUXJLgyIiitnd3aJ6mC6O1QaKRQ508m",
        },
      });

      return response.data;
    } catch (error) {
      setError("Error uploading cat image.");
      console.error("Error uploading cat image:", error);
    }
  };

  const voteCat = async (catId, value) => {
    try {
      const response = await axios.post(
        "https://api.thecatapi.com/v1/votes",
        {
          image_id: catId,
          value: value,
        },
        {
          headers: {
            "x-api-key": "live_oC5bgGGSQ2R3O5m59uF3XAyB9fWu3EDUxjUXJLgyIiitnd3aJ6mC6O1QaKRQ508m",
          },
        }
      );

      setVotes((prevVotes) => ({
        ...prevVotes,
        [catId]: response.data,
      }));
    } catch (error) {
      setError("Error voting for cat.");
      console.error("Error voting for cat:", error);
    }
  };

  const favoriteCat = async (catId) => {
    try {
      if (favorites[catId]) {
        await axios.delete(`https://api.thecatapi.com/v1/favourites/${favorites[catId]}`, {
          headers: {
            "x-api-key": "live_oC5bgGGSQ2R3O5m59uF3XAyB9fWu3EDUxjUXJLgyIiitnd3aJ6mC6O1QaKRQ508m",
          },
        });

        setFavorites((prevFavorites) => {
          const newFavorites = { ...prevFavorites };
          delete newFavorites[catId];
          return newFavorites;
        });
      } else {
        const response = await axios.post(
          "https://api.thecatapi.com/v1/favourites",
          {
            image_id: catId,
          },
          {
            headers: {
              "x-api-key": "live_oC5bgGGSQ2R3O5m59uF3XAyB9fWu3EDUxjUXJLgyIiitnd3aJ6mC6O1QaKRQ508m",
            },
          }
        );

        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [catId]: response.data.id,
        }));
      }
    } catch (error) {
      setError("Error favoriting cat.");
      console.error("Error favoriting cat:", error);
    }
  };

  return {
    catList,
    votes,
    favorites,
    error,
    uploadCat,
    voteCat,
    favoriteCat,
  };
};

export default useCatApi;
