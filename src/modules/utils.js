import _ from "lodash";

export const generateUserInfo = ({ user, club }) => {
  let userObj = {};
  let clubObj = null;

  if (user) {
    userObj = {
      name: user.name,
      email: user.email,
      isActive: user.is_active,
      occupation: user.occupation,
      clubId: _.get(user, "clubs_roles[0].club_id", ""),
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
  };
};
