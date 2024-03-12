import { collection, getDocs, query, where } from "firebase/firestore";
import dayjs from "dayjs";

import { db } from "services/firebase/firebase-config";

export const fetchMembersList = async (clubId, fromDate=[1, 'year']) => {
  // Get reference to members collection of a club
  const membersRef = collection(db, `clubs/${clubId}/members`);

  // Get all members in the club
  const memberDocs = await getDocs(membersRef);

  // Use Promise.all to make sure we have all the attendance data before returning the result
  const userScoresPromises = memberDocs.docs.map(async (memberDoc) => {
    const memberId = memberDoc.id;
    const memberData = memberDoc.data();
    const memberName = memberData.name;

    // Get reference to attendance collection of a member
    const attendanceRef = collection(
      db,
      `clubs/${clubId}/members/${memberId}/attendance`
    );

    const todaysDate = dayjs();

    const attendanceQuery = query(
      attendanceRef,
      where("date", "<", todaysDate.format("YYYY-MM-DD")),
      where("date", ">=", todaysDate.subtract(...fromDate).format("YYYY-MM-DD"))
    );

    const attendanceDocs = await getDocs(attendanceQuery);

    // Get max score of the member
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
  });

  const membersList = await Promise.all(userScoresPromises);
  membersList.sort((m1, m2) => m2.score - m1.score);
  return membersList;
};
