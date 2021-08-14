import React, { useState } from "react";

const BookSlotContext = React.createContext({
  slotList: [],
  totalSlots: 0,
  addSlot: (bookSlot) => {},
  removeSlot: (slotId) => {},
  cleanAllSlot: () => {},
});

export const BookSlotContextProvider = (props) => {
  const [bookSlotList, setBookSlotList] = useState(
    JSON.parse(localStorage.getItem("slotList") || "[]")
  );

  const addSlotHandler = (bookSlot) => {
    const newSlot = {
      slotId: bookSlotList.length + 1,
      date: bookSlot.date,
      startTime: bookSlot.startTime,
      endTime: bookSlot.endTime,
      roomName: bookSlot.roomName,
      amount: bookSlot.amount,
    };
    setBookSlotList((prevSlots) => {
      localStorage.setItem(
        "slotList",
        JSON.stringify(prevSlots.concat(newSlot))
      );
      return prevSlots.concat(newSlot);
    });
  };

  const removeSlotHandler = (slotId) => {
    setBookSlotList((prevSlots) => {
      localStorage.setItem(
        "slotList",
        JSON.stringify(prevSlots.filter((slot) => slot.slotId !== slotId))
      );
      return prevSlots.filter((slot) => slot.slotId !== slotId);
    });
  };

  const cleanAllSlotHandler = () => {
    setBookSlotList([]);
    localStorage.setItem(
        "slotList",
        JSON.stringify([])
      );
  };

  const contextValue = {
    slotList: bookSlotList,
    totalSlots: bookSlotList.length,
    addSlot: addSlotHandler,
    removeSlot: removeSlotHandler,
    cleanAllSlot: cleanAllSlotHandler,
  };

  return (
    <BookSlotContext.Provider value={contextValue}>
      {props.children}
    </BookSlotContext.Provider>
  );
};

export default BookSlotContext;
