import React, { useState } from "react";
import JournalWidget from "../Journal/JournalWidget";
import JournalPage from "../pages/journalPage";

export default function closeEditState() {
  const [showXmark, setShowXmark] = useState(false);

  const handleEditClick = () => {
    setShowXmark(true);
  };

  const handleCloseClick = () => {
    setShowXmark(false);
  };

  return (
    <div>
      <JournalWidget onEditClick={handleEditClick} />
      <JournalPage showXmark={showXmark} onClose={handleCloseClick} />
    </div>
  );
}
