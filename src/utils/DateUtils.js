export const disableDate = (args) => {
    if (args.date.getDay() === 0 || args.date.getDay() === 6) {
      args.isDisabled = true;
    }
  };

export const convertDateString = (str) => {
    return str.split("-").reverse().join("-");
  };