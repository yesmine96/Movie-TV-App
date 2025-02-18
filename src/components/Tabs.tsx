"use client";
import React, { useState } from "react";

type TabsProps = {
  onChange: (activeTab: string) => void; // Callback to notify the active tab
  tabs: string[]; // Array of tab titles
  defaultActive?: number; // Default active tab index
};

const Tabs: React.FC<TabsProps> = ({ tabs, onChange, defaultActive = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    onChange(tabs[index]);
  };

  return (
    <div className="w-full max-w-xs ">
      {/* Tab List */}
      <div className="flex rounded-md border border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`rounded-md flex-1 py-2 text-center transition-colors duration-300 ${
              activeTab === index
                ? "border-2 bg-blue-500 border-blue-500 text-white"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
