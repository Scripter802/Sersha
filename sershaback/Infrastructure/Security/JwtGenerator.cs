using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Application.User;
using AutoMapper.Configuration;
using Domain;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;


namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        private readonly SymmetricSecurityKey _key;
        public JwtGenerator(IConfiguration config)
        {
            _key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }


        public string CreateToken(AppUser user)
        {
           var claims = new List<Claim>
           {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
           };

           // Ensure your secret key is long enough; it needs to be secure and typically loaded from a configuration file or environment variable
           //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
           var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

           var tokenDescriptor = new SecurityTokenDescriptor
           {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7), // Consider setting this expiration in a configuration setting
                SigningCredentials = creds
           };

           var tokenHandler = new JwtSecurityTokenHandler();
           var token = tokenHandler.CreateToken(tokenDescriptor);

           return tokenHandler.WriteToken(token);
        }

        public string CreateToken(User user)
        {
            throw new NotImplementedException();
        }

    }
}
