import { collection, getDocs } from "firebase/firestore";

import { db } from "services/firebase/firebase-config";
import { sortArrayInAscByKey } from "utils/commonUtils";

export const fetchClubs = async () => {
  const clubsRef = collection(db, `clubs`);
  const clubDocs = await getDocs(clubsRef);

  let clubs = [];
  if (!clubDocs.empty) {
    clubs = clubDocs.docs.map((clubDoc) => {
      const clubData = clubDoc.data();
      return {
        uid: clubDoc.id,
        name: clubData.name,
      };
    });
  }

  sortArrayInAscByKey(clubs, "name");

  return clubs;
};

export const fetchGroups = async (clubId) => {
  const groupsRef = collection(db, `clubs/${clubId}/groups`);
  const groupDocs = await getDocs(groupsRef);

  let groups = [];
  if (!groupDocs.empty) {
    groups = groupDocs.docs.map((groupDoc) => {
      const groupData = groupDoc.data();
      return {
        uid: groupDoc.id,
        name: groupData.name,
      };
    });
  }

  sortArrayInAscByKey(groups, "name");

  return groups;
};
