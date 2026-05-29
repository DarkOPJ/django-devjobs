import bear from '../assets/images/avatars/bear.png';
import chicken from '../assets/images/avatars/chicken.png';
import duck from '../assets/images/avatars/duck.png';
import lion from '../assets/images/avatars/lion.png';
import meerkat from '../assets/images/avatars/meerkat.png';
import panda from '../assets/images/avatars/panda.png';

const avatars = [bear, chicken, duck, lion, meerkat, panda];

/**
 * Returns a consistent avatar based on the given user ID.
 * Uses a simple hash of the ID (or string) to select one of the 6 avatars.
 */
export const getAvatarForUser = (userId) => {
  if (!userId) return avatars[0];
  
  // Convert ID to a string to handle both numeric and string IDs
  const idStr = String(userId);
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = idStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Get positive index within avatars array length
  const index = Math.abs(hash) % avatars.length;
  return avatars[index];
};
