namespace Domain
{
    public class Enums
    {
         public enum Difficulty
        {
            Easy = 0,
            Medium = 1,
            Hard = 2
        }

        public enum QuestionType
        {
            RightAnswer = 0,
            CorrectIncorrect = 1,
            FillInTheBlank = 2,
            Grouping = 3,
            SnapJudgement = 4, 
            EmojiEmotions = 5,
            FriendOrFoe = 6,
            PostingChallenge = 7
        }

        public enum SershaItemType
        {
            Hat,
            Glasses,
            Torso,
            Legs
        }

        public enum SershaItemBodyPart
        {
            Head,
            Body
        }

        public enum SubscribtionPeriod
        {
            Monthly,
            Yearly
        }
    }
}