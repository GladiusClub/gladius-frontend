import _ from "lodash";
import dayjs from "dayjs";

export const generateUserInfo = ({ user, club, ...rest }) => {
  let userObj = {};
  let clubObj = null;

  if (user) {
    userObj = {
      name: user.name,
      email: user.email,
      stellarWallet: user.stellar_wallet,
      role: user.clubs_roles.length ? user.clubs_roles[0].role : null,
    };
  }
  if (club) {
    clubObj = {
      id: _.get(user, "clubs_roles[0].club_id"),
      calendarId: _.get(club, "calendars[0]"),
      name: club.name,
      description: club.description,
    };
  }

  return {
    ...userObj,
    club: clubObj,
    ...rest
  };
};

export const getPointsAndPercentInWeek = (pointsBalance, eventsList) => {
  if (pointsBalance === 0) {
    return {
      pointsInWeek: 0,
      percentInWeek: 0,
    };
  }

  const today = dayjs();
  const lastWeekDate = today.subtract(1, "week");
  const firstDateOfLastWeek = lastWeekDate.startOf("week");
  const firstDateOfCurrWeek = today.startOf("week");
  let pointsInWeek = 0;

  for (let event of eventsList) {
    if (dayjs(event.date).isBefore(firstDateOfLastWeek)) {
      break;
    }
    if (dayjs(event.date).isBefore(firstDateOfCurrWeek)) {
      pointsInWeek += event.score;
    }
  }

  return {
    pointsInWeek,
    percentInWeek: ((pointsInWeek / pointsBalance) * 100)
      .toFixed(1)
      .replace(/\.0+$/, ""),
  };
};
