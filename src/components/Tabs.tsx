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
    <div className="w-full max-w-md mx-auto">
      {/* Tab List */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`flex-1 py-2 text-center transition-colors duration-300 ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
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
