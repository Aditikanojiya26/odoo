// src/pages/SingleItem.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItem} from "../services/items";
import ItemCard from "../components/ItemCard";

const SingleItem = () => {
  const { id } = useParams();
  const { data: item, isLoading, error } = useQuery({
    queryKey: ["item", id],
    queryFn: () =>  getItem(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading item</p>;

  return <ItemCard item={item} />;
};

export default SingleItem;
