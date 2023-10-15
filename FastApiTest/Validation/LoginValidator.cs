using FastApiTest.Endpoints.User;
using FastEndpoints;
using FluentValidation;

namespace FastApiTest.Validation
{
    public class LoginValidator : Validator<LoginRequest>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty()
                .WithMessage("Bitte gib deinen Usernamen an");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Bitte gib dein Passwort an");
        }
    }
}
