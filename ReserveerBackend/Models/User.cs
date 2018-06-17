using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ReserveerBackend.Models
{
    public class User
    {
        public User() { }
        public User(Role role, string Email, bool emailnotification)
        {
            this.Role = role;
            this.EmailNotification = emailnotification;
            this.Email = Email;
        }

        public User(UserPasswordLogin login, Role role, string email, bool emailnotification) : this(role, email, emailnotification)
        {
            PasswordLogin = login;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public Role Role { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public Boolean EmailNotification { get; set; }
        public UserPasswordLogin PasswordLogin { get; set; }

        public List<Report> Reports { get; set; }
        public List<Participant> Participants { get; set; }
        public List<ParticipantChange> ParticipantChanges { get; set; }




        public static string _Role = "Role";
        public static string _Email = "Email";
        public static string _EmailNotification = "EmailNotification";
        public static string _ID = "ID";

        public ClaimsIdentity ToClaimsIdentity(string AuthenticationScheme)
        {
            return new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Role, ((int)Role).ToString()),
                new Claim(_Email, Email),
                new Claim(_EmailNotification, EmailNotification.ToString()),
                new Claim(_ID, Id.ToString())
            }, AuthenticationScheme);
        }

        public static User FromClaims(IEnumerable<Claim> claims, ReserveerDBContext context)
        {
            return context.Users.Where(x => x.Id == int.Parse(claims.Where(z => z.Type == _ID).First().Value)).First();
        }
    }
}
