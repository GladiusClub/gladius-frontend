import { compact, get } from "lodash";
import { getDocs, getDoc, collection, doc } from "firebase/firestore";

import { db } from "services/firebase/firebase-config";
import { collections } from "constants/collections";

export const fetchStudentsDetailsFromGuardian = async (uid) => {
  const childrensRef = collection(
    db,
    `${collections.users}/${uid}/${collections.children}`
  );
  const childrenDocs = await getDocs(childrensRef);
  let studentsPromises = [];

  if (!childrenDocs.empty) {
    studentsPromises = childrenDocs.docs.map(async (childrenDoc) => {
      try {
        const children = childrenDoc.data();
        children.uid = childrenDoc.id;

        // Get data from clubs collection
        const clubRef = doc(db, collections.clubs, children.ClubUID);
        const clubDoc = await getDoc(clubRef);

        if (clubDoc.exists()) {
          const clubData = clubDoc.data();
          children.club = {
            id: clubDoc.id,
            stellarWallet: clubData.club_stellar_wallet,
            calendarId: get(clubData, "calendars[0]")
          }
        }

        // Get data from groups collection
        const groupRef = doc(
          db,
          `${collections.clubs}/${children.ClubUID}/${collections.groups}`,
          children.GroupUID
        );
        const groupDoc = await getDoc(groupRef);

        if (groupDoc.exists()) {
          const groupData = groupDoc.data();
          children.groupName = groupData.name;
        }
        return children;
      } catch (err) {
        console.error(err);
      }
    });
  }

  const students = await Promise.all(studentsPromises);
  return compact(students);
};
