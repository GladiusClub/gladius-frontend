import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import dayjs from "dayjs";

import { db } from "services/firebase/firebase-config";
import { useFirebase } from "services/firebase/useFirebase";

const useClub = () => {
  const { checkForNavigateToSignIn } = useFirebase();
  const [members, setMembers] = useState({
    data: [],
    loading: false,
    error: null,
  });

  const handleFailure = (err) => {
    console.error(err);
    checkForNavigateToSignIn(err.code);
  };

  const getMembersList = async (clubId) => {
    setMembers((prev) => ({ ...prev, loading: true }));
    try {
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

        const attendanceDocs = await getDocs(attendanceRef);

        // Get max score of the member
        let score = 0;
        let latestDate = '1972-01-01';

        if (!attendanceDocs.empty) {
          score = attendanceDocs.docs.reduce((acc, doc) => {
            const data = doc.data();

            if (dayjs(data.date).isAfter(dayjs(latestDate))) {
              latestDate = data.date;
            }

            if (data.score && data.score > acc) {
              acc = +data.score;
            }
            return acc;
          }, 0);
        }

        // Return an object containing the member id, name, and score
        return {
          id: memberId,
          name: memberName,
          date: latestDate,
          score,
        };
      });

      const membersList = await Promise.all(userScoresPromises);
      membersList.sort((m1, m2) => m2.score - m1.score);
      setMembers({ data: membersList, error: null, loading: false });
    } catch (err) {
      console.error("Error getting members list", err);
      handleFailure(err);
      setMembers({ data: [], error: err.message, loading: false });
    }
  };

  return {
    members,
    getMembersList,
  };
};

export default useClub;
