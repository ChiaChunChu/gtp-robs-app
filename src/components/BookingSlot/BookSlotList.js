import BookSlotItem from "./BookSlotItem";

const BookSlotList = (props) => {
  return (
    <div>
      {props.slots.map((slot, key) => (
        <BookSlotItem key={key} slot={slot} />
      ))}
    </div>
  );
};

export default BookSlotList;
