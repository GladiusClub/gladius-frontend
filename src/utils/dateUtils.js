export const getDatesWithinWeek = (date) => {
  let result = [];

  const currentDate = date ? new Date(date) : new Date();
  const dayOfWeek = currentDate.getDay();
  const startingDate = currentDate;
  startingDate.setDate(currentDate.getDate() - dayOfWeek);

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(startingDate);
    newDate.setDate(newDate.getDate() + i);
    result.push(newDate);
  }

  return result;
};

export const getNextDatesByDays = (days, date) => {
  const currentDate = date ? new Date(date) : new Date();
  let result = [];

  for (let i = 1; i <= days; i++) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + i);
    result.push(newDate);
  }

  return result;
};

export const getPrevDatesByDays = (days, date) => {
  const currentDate = date ? new Date(date) : new Date();
  let result = [];

  for (let i = days; i >= 1; i--) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - i);
    result.push(newDate);
  }

  return result;
};

export const getDatesRange = (days, date) => {
  return [
    ...getPrevDatesByDays(days, date),
    date,
    ...getNextDatesByDays(days, date),
  ];
};

export const getNextDay = (date) => {
  const currentDate = date ? new Date(date) : new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  return currentDate;
};

export const getPrevDay = (date) => {
  const currentDate = date ? new Date(date) : new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  return currentDate;
};
