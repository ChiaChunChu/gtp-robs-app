import { useContext } from "react";
import BookSlotContext from "../../store/BookSlotContext";
import classes from "./BookSlotShowAmount.module.css";

const BookSlotShowAmount = (props) => {
  const bookSlotCtx = useContext(BookSlotContext);
  let totalAmount = 0;
  const slots = bookSlotCtx.slotList;
  slots.map(
    (slot, key) => (totalAmount = totalAmount + parseFloat(slot.amount))
  );
  const symbolTotalAmount = `€${totalAmount.toFixed(2)}`;
  console.log(symbolTotalAmount);
  return totalAmount === 0 ? (
    <label className={classes.label}></label>
  ) : (
    <label className={classes.label}>
      The total amount: {symbolTotalAmount}
    </label>
  );
};

export default BookSlotShowAmount;
