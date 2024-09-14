using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Interfaces;

namespace Application.User
{
    public class KlaviyoUserManager : IKlaviyoUserManager
    {
        public async Task addProfileToList(string listId, string profileId)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri($"https://a.klaviyo.com/api/lists/{listId}/relationships/profiles/"),
                Headers =
                {
                    { "accept", "application/json" },
                    { "revision", "2024-07-15" },
                    { "Authorization", "Klaviyo-API-Key pk_59c0d28e591fe0a1caa0a5ebd85e8452a7" },
                },
                
                Content = new StringContent($@"{{""data"":{{""type"":""profile"",""id"":""{profileId}""}}}}")
                {
                    Headers =
                    {
                        ContentType = new MediaTypeHeaderValue("application/json")
                    }
                }
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
            }
        }


        public async Task removeProfileFromList(string listId, string profileId)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Delete,
                RequestUri = new Uri($"https://a.klaviyo.com/api/lists/{listId}/relationships/profiles/"),
                Headers =
                {
                    { "accept", "application/json" },
                    { "revision", "2024-07-15" },
                    { "Authorization", "Klaviyo-API-Key pk_59c0d28e591fe0a1caa0a5ebd85e8452a7" },
                },
                
                Content = new StringContent($@"{{""data"":{{""type"":""profile"",""id"":""{profileId}""}}}}")
                {
                    Headers =
                    {
                        ContentType = new MediaTypeHeaderValue("application/json")
                    }
                }
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
            }
        }

        public async Task<string> createProfile(string email, string FullName, string phoneNumber)
        {
            var client = new HttpClient();
            Console.WriteLine(FullName);
            Console.Write(phoneNumber);
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri("https://a.klaviyo.com/api/profiles/"),
                Headers =
                {
                    { "accept", "application/json" },
                    { "revision", "2024-07-15" },
                    { "Authorization", "Klaviyo-API-Key pk_59c0d28e591fe0a1caa0a5ebd85e8452a7" },
                },
                

                
                //Content = new StringContent($@"{{""data"":{{""type"":""profile"",""attributes"":{{""properties"":{{""newKey"":""New Value""}},""email"":""{email}"",""phone_number"":""{phoneNumber}"",""first_name"":""{FullName.Split(' ')[0]}"",""last_name"":""{FullName.Split(' ')[1]}""}}}}}}")
                Content = new StringContent($@"{{""data"":{{""type"":""profile"",""attributes"":{{""properties"":{{""newKey"":""New Value""}},""email"":""{email}"",""first_name"":""{FullName.Split(' ')[0]}"",""last_name"":""{FullName.Split(' ')[1]}""}}}}}}")
                {
                    Headers =
                    {
                        ContentType = new MediaTypeHeaderValue("application/json")
                    }
                }
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                var jsonDocument = JsonDocument.Parse(body);
                var root = jsonDocument.RootElement;

                // Extract the ID
                string id = root.GetProperty("data").GetProperty("id").GetString();
                await addProfileToList("WaD25M", id);
                return id;
            }
        }

    }
}