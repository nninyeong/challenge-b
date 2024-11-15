import { useState } from 'react';

const useFAQ = () => {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleFAQ = (id: number) => {
    setExpandedIds((prevExpandedIds) => {
      const newExpandedIds = new Set(prevExpandedIds);
      if (newExpandedIds.has(id)) {
        newExpandedIds.delete(id);
      } else {
        newExpandedIds.add(id);
      }
      return newExpandedIds;
    });
  };

  return { expandedIds, toggleFAQ };
};

export default useFAQ;