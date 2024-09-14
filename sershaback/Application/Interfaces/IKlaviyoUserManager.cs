using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IKlaviyoUserManager
    {
         public Task<string> createProfile(string email, string FullName, string phoneNumber);
         public Task addProfileToList(string listId, string profileId);
         public Task removeProfileFromList(string listId, string profileId);
    }
}