import { collection, getDocs, query, where } from "firebase/firestore";
import dayjs from "dayjs";
import { capitalize } from "lodash";

import { db } from "services/firebase/firebase-config";
import { sortArrayInAscByKey } from "utils/commonUtils";
import { collections } from "constants/collections";

export const fetchGroupMembers = async ({ minDate, maxDate, uid, clubId }) => {
  // Get reference to groups collection of a club
  const groupsRef = collection(db, `${collections.clubs}/${clubId}/${collections.groups}`);

  // Get only those groups in which user is assigned
  const groupsQuery = query(
    groupsRef,
    where("member_uuids", "array-contains", uid)
  );

  const groupDocs = await getDocs(groupsQuery);

  const membersObj = {};

  //Get memberIds of the memebers assigned to groups.
  if (!groupDocs.empty) {
    groupDocs.docs.forEach((groupDoc) => {
      const groupData = groupDoc.data();
      groupData.member_uuids.forEach((memberId) => {
        membersObj[memberId] = true;
      });
    });
  }

  const groupsMembersIds = Object.keys(membersObj);

  // Get reference to members collection of a club
  const membersRef = collection(db, `${collections.clubs}/${clubId}/members`);
  // Get only those members which are under user groups
  const membersQuery = query(membersRef, where("user", "in", groupsMembersIds));
  const membersDocs = await getDocs(membersQuery);

  let members = [];
  if (!membersDocs.empty) {
    members = membersDocs.docs;
  }

  // Use Promise.all to make sure we have all the members scores before returning the result
  const membersScoresPromises = members.map(async (memberDoc) => {
    const memberId = memberDoc.id;
    const memberData = memberDoc.data();
    const memberName = memberData.name;

    try {
      // Get reference to attendance collection of a member
      const attendanceRef = collection(
        db,
        `${collections.clubs}/${clubId}/${collections.members}/${memberId}/${collections.attendance}`
      );

      // Get attendance data using
      const datesQuery = [];
      if (minDate) {
        datesQuery.push(
          where("date", ">=", dayjs(minDate).format("YYYY-MM-DD"))
        );
      }
      if (maxDate) {
        datesQuery.push(
          where("date", "<=", dayjs(maxDate).format("YYYY-MM-DD"))
        );
      }

      const attendanceQuery = query(attendanceRef, ...datesQuery);

      const attendanceDocs = await getDocs(attendanceQuery);

      // Get sum of all scores of the member
      let score = 0;

      if (!attendanceDocs.empty) {
        score = attendanceDocs.docs.reduce((acc, doc) => {
          const data = doc.data();
          if (data.score) {
            acc += +data.score;
          }
          return acc;
        }, 0);
      }

      // Return an object containing the member id, name, and overall score
      return {
        id: memberId,
        name: memberName,
        score,
      };
    } catch (err) {
      console.error(err);
      return {
        id: memberId,
        name: memberName,
        score: 0,
      };
    }
  });

  const membersList = await Promise.all(membersScoresPromises);
  membersList.sort((m1, m2) => m2.score - m1.score);
  return membersList;
};

export const fetchClubMembers = async (clubId) => {
  const usersRef = collection(db, `${collections.clubs}/${clubId}/members`);
  const userDocs = await getDocs(usersRef);

  let clubMembers = [];
  if (!userDocs.empty) {
    clubMembers = userDocs.docs.map((userDoc) => {
      const userData = userDoc.data();

      let name = userData.name;
      const email = userData.email;

      if (name.includes("@")) {
        name = name.split("@")[0];
      } else if (!name) {
        name = email.split("@")[0];
      }

      return {
        name: capitalize(name),
        email,
        uid: userData.user,
      };
    });
  }

  sortArrayInAscByKey(clubMembers, "name");

  return clubMembers;
};
