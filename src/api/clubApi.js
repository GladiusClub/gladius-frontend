import { collection, getDocs, query, where } from "firebase/firestore";
import dayjs from "dayjs";

import { db } from "services/firebase/firebase-config";

export const fetchMembers = async (uid, clubId, fromDate = [1, "year"]) => {
  // Get reference to groups collection of a club
  const groupsRef = collection(db, `clubs/${clubId}/groups`);

  // Get only those groups in which user is assigned
  const groupsQuery = query(
    groupsRef,
    where("member_uuids", "array-contains", uid)
  );

  const groupDocs = await getDocs(groupsQuery);

  const membersObj = {};

  //Get memberIds of the memebers assigned to groups.
  if (!groupDocs.empty) {
    const groupMembersId = groupDocs.docs.map((groupDoc) => {
      const groupData = groupDoc.data();
      return groupData.member_uuids;
    });
    for (let memberId of groupMembersId) {
      membersObj[memberId] = true;
    }
  }

  const groupsMembersIds = Object.keys(membersObj);

  // Get reference to members collection of a club
  const membersRef = collection(db, `clubs/${clubId}/members`);
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
        `clubs/${clubId}/members/${memberId}/attendance`
      );

      const todaysDate = dayjs();

      // Get attendance data less than today's date and greater than given date
      const fromDateFormatted = todaysDate
        .subtract(...fromDate)
        .format("YYYY-MM-DD");

      const attendanceQuery = query(
        attendanceRef,
        where("date", "<", todaysDate.format("YYYY-MM-DD")),
        where("date", ">=", fromDateFormatted)
      );

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
