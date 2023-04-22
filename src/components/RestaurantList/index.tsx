import "./index.css";
import { useState, useEffect } from "react";
import RestaurantItem from "../RestaurantItem";
import { CategoryOption, Restaurant, SortOption } from "../../types/restaurant";
import { useLocalStorage, useRestaurantList } from "../../hooks";
import getMockData from "../../data/getMockData";
import { LOCAL_STORAGE_KEY } from "../../constants";

interface RestaurantListProps {
  currentCategory: CategoryOption;
  currentSort: SortOption;
  onClickRestaurantItem: (Restaurant: Restaurant) => void;
}

const RestaurantList = ({ currentCategory, currentSort, onClickRestaurantItem }: RestaurantListProps) => {
  const mockList: Restaurant[] = getMockData();
  const [allRestaurantList] = useLocalStorage<Restaurant[]>(LOCAL_STORAGE_KEY, mockList);
  const { restaurantList, setListByCategory, setListBySort } = useRestaurantList(allRestaurantList);

  useEffect(() => {
    setListByCategory(currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    setListBySort(currentSort);
  }, [currentSort]);

  return (
    <section className="restaurant-list-container">
      <ul className="restaurant-list">
        {restaurantList.map((restaurant) => {
          const handleClickRestaurantItem = () => {
            onClickRestaurantItem(restaurant);
          };

          return (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              onClickRestaurantItem={handleClickRestaurantItem}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default RestaurantList;
