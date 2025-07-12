import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItem, getMySwapItems, sendSwapRequest } from "../services/items";
import { useState } from "react";

const SingleItem = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch the item detail
  const { data: item, isLoading, error } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItem(id),
  });

  // ✅ Fetch my swap items (enabled only when modal opens)
  const { data: mySwapItems = [], refetch } = useQuery({
    queryKey: ["mySwapItems"],
    queryFn: getMySwapItems,
    enabled: false, // manual trigger
  });

  // ✅ Mutation to send swap request
  const swapMutation = useMutation({
    mutationFn: ({ requesterItemId, receiverItemId }) =>
      sendSwapRequest(requesterItemId, receiverItemId),
    onSuccess: () => {
      alert("Swap request sent!");
      setIsModalOpen(false);
      queryClient.invalidateQueries(["item", id]); // Optional: refresh item status
    },
    onError: () => {
      alert("Failed to send swap request.");
    },
  });

  const handleSwapRequest = async () => {
    try {
      await refetch();
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch your swap items", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading item</p>;

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <img src={item.images?.[0]} alt={item.title} className="w-full h-auto rounded" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          <p className="text-gray-700 mb-2">{item.description}</p>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Size:</strong> {item.size}</p>
          <p><strong>Condition:</strong> {item.condition}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Points:</strong> {item.points}</p>

          {item.type === "swap" && item.status === "available" && (
            <button
              onClick={handleSwapRequest}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Swap Request
            </button>
          )}
        </div>
      </div>

      {/* Swap Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Choose an item to offer in swap</h2>
            <div className="grid grid-cols-2 gap-4">
              {mySwapItems.length > 0 ? (
                mySwapItems.map((myItem) => (
                  <div
                    key={myItem._id}
                    className="border rounded p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      swapMutation.mutate({
                        requesterItemId: myItem._id,
                        receiverItemId: item._id,
                      })
                    }
                  >
                    <img
                      src={myItem.images[0]}
                      alt={myItem.title}
                      className="w-full h-24 object-cover rounded"
                    />
                    <p className="text-sm mt-2">{myItem.title}</p>
                  </div>
                ))
              ) : (
                <p>You don’t have any available swap items.</p>
              )}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleItem;
