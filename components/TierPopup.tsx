"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function TierPopup() {
  const { user, isLoaded } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>("Free");

  const tiers = [
    { value: "Free", label: "Free", description: "Basic features" },
    { value: "Silver", label: "Silver", description: "Enhanced features" },
    { value: "Gold", label: "Gold", description: "Premium features" },
    { value: "Platinum", label: "Platinum", description: "All features" }
  ];

  useEffect(() => {
    if (isLoaded && user && !user.unsafeMetadata.tier) {
      setShowModal(true);
    }
  }, [isLoaded, user]);

  const setTier = async (tier: string) => {
    try {
      await user?.update({
        unsafeMetadata: {
          tier: tier
        }
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating tier:", error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-2xl text-center">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Choose your Tier</h2>
        <div className="flex flex-col gap-3">
          {tiers.map((tier) => (
            <label
              key={tier.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                selectedTier === tier.value
                  ? "border-blue-500 bg-blue-50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="tier"
                value={tier.value}
                checked={selectedTier === tier.value}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-4 h-4 text-blue-500 mr-3"
              />
              <div className="text-left flex-1">
                <div className="font-medium text-gray-800">{tier.label}</div>
                <div className="text-sm text-gray-500">{tier.description}</div>
              </div>
            </label>
          ))}
          
          <button
            onClick={() => setTier(selectedTier)}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Set {selectedTier} Tier
          </button>
        </div>
      </div>
    </div>
  );
}