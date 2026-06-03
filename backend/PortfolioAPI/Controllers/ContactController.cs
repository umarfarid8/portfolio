using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using PortfolioAPI.Services;

namespace PortfolioAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IEmailService emailService, ILogger<ContactController> logger)
    {
        _emailService = emailService;
        _logger       = logger;
    }

    /// <summary>POST /api/contact — receives portfolio contact form and emails Umar.</summary>
    [HttpPost]
    public async Task<IActionResult> SendMessage([FromBody] ContactRequest request)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage);
            return BadRequest(new { success = false, message = string.Join(" ", errors) });
        }

        try
        {
            await _emailService.SendContactEmailAsync(request.Name, request.Email, request.Message);

            return Ok(new
            {
                success = true,
                message = "Message sent! I'll get back to you soon. 🎉"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Email delivery failed for {Email}", request.Email);
            return StatusCode(500, new
            {
                success = false,
                message = "Failed to send email. Please contact umarfarid034@gmail.com directly."
            });
        }
    }
}

/// <summary>Contact form payload model with validation.</summary>
public class ContactRequest
{
    [Required(ErrorMessage = "Name is required.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be 2–100 characters.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Message is required.")]
    [StringLength(2000, MinimumLength = 10, ErrorMessage = "Message must be 10–2000 characters.")]
    public string Message { get; set; } = string.Empty;
}
