import { useEffect, useState } from "react";
import { CategoryOption, Restaurant, SortOption } from "../types/restaurant";

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const item = localStorage.getItem(key);
  const [value, setValue] = useState<T>(item ? JSON.parse(item) : initialValue);

  const setLocalValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, setLocalValue];
};

export const useRestaurantList = (initialList: Restaurant[]) => {
  const [restaurantList, setRestaurantList] = useState(initialList);
  const [currentSort, setCurrentSort] = useState<SortOption>("name");

  useEffect(() => {
    setListBySort(currentSort);
  }, []);

  const setListByCategory = (category: CategoryOption) => {
    const sortedRestaurant = getListBySort(currentSort, initialList);

    if (category === "all") {
      setRestaurantList(sortedRestaurant);
      return;
    }

    const categorizedList = sortedRestaurant.filter((restaurant) => restaurant.category === category);
    setRestaurantList(categorizedList);
  };

  const setListBySort = (sort: SortOption) => {
    const sortedList = getListBySort(sort, restaurantList);
    setCurrentSort(sort);
    setRestaurantList(sortedList);
  };

  const getListBySort = (sort: SortOption, restaurantList: Restaurant[]) => {
    if (sort === "name") {
      return getSortedListByName(restaurantList);
    }
    if (sort === "distance") {
      return getSortedListByDistance(restaurantList);
    }
    return restaurantList;
  };

  const getSortedListByName = (restaurants: Restaurant[]) => {
    return [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
  };

  const getSortedListByDistance = (restaurants: Restaurant[]) => {
    return [...restaurants].sort((a, b) => a.distance - b.distance);
  };

  return { restaurantList, setListByCategory, setListBySort };
};
