import React, { useState } from 'react'
import AdminPanelSnapJudgment from './SnapJudgment/AdminPanelSnapJudgment';
import AdminPanelEmojiEmotions from './EmojiEmotions/AdminPanelEmojiEmotions';
import AdminPanelPostingChallenge from './PostingChallenge/AdminPanelPostingChallenge';
import AdminPanelFriendOrFoe from './FriendOrFoe/AdminPanelFriendOrFoe';
import { useGlobalContext } from '../../../context/context';

const AdminPanelMiniGames = () => {
  const { miniGamesActiveTab } = useGlobalContext();
  const [miniGames, setMiniGames] = useState(['Snap Judgment', 'Emoji Emotions', 'Posting Challenge', 'Friend Or Foe']);

  return (
    <div className="adminPanelQuizzesContainer" style={{ position: 'relative' }}>
      {miniGamesActiveTab === 'Snap Judgment' && <AdminPanelSnapJudgment />}
      {miniGamesActiveTab === 'Emoji Emotions' && <AdminPanelEmojiEmotions />}
      {miniGamesActiveTab === 'Posting Challenge' && <AdminPanelPostingChallenge />}
      {miniGamesActiveTab === 'Friend Or Foe' && <AdminPanelFriendOrFoe />}
    </div>
  );
}

export default AdminPanelMiniGames