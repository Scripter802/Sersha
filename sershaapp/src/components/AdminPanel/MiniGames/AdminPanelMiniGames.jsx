import React, { useState } from 'react'
import AdminPanelSnapJudgment from './SnapJudgment/AdminPanelSnapJudgment';
import AdminPanelEmojiEmotions from './EmojiEmotions/AdminPanelEmojiEmotions';
import AdminPanelPostingChallenge from './PostingChallenge/AdminPanelPostingChallenge';
import AdminPanelFriendOrFoe from './FriendOrFoe/AdminPanelFriendOrFoe';
import { useGlobalContext } from '../../../context/context';
import SnapJudgmentCreateNew from './SnapJudgment/SnapJudgmentCreateNew/SnapJudgmentCreateNew';
import FriendOrFoeCreateNew from './FriendOrFoe/FriendOrFoeCreateNew/FriendOrFoeCreateNew';
import EmojiEmotionsCreateNew from './EmojiEmotions/EmojiEmotionsCreateNew/EmojiEmotionsCreateNew';
import './adminPanelMiniGames.css';

const AdminPanelMiniGames = () => {
  const { miniGamesActiveTab, PostingChallengeCreateNew, SnapJudgmentCreateNew, FriendOrFoeCreateNew, EmojiEmotionsCreateNew } = useGlobalContext();
  const [miniGames, setMiniGames] = useState(['Snap Judgment', 'Emoji Emotions', 'Posting Challenge', 'Friend Or Foe']);

  return (
    <div className="adminPanelMiniGamesContainer" style={PostingChallengeCreateNew || SnapJudgmentCreateNew || FriendOrFoeCreateNew || EmojiEmotionsCreateNew ? { display: 'none', position: 'relative' } : { position: 'relative' }}>
      {miniGamesActiveTab === 'Snap Judgment' && <AdminPanelSnapJudgment />}
      {miniGamesActiveTab === 'Emoji Emotions' && <AdminPanelEmojiEmotions />}
      {miniGamesActiveTab === 'Posting Challenge' && <AdminPanelPostingChallenge />}
      {miniGamesActiveTab === 'Friend Or Foe' && <AdminPanelFriendOrFoe />}
    </div>
  );
}

export default AdminPanelMiniGames