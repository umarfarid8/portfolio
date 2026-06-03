using PortfolioAPI.Models;
using PortfolioAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// ── CORS ──────────────────────────────────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("PortfolioCors", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000",
                "https://umar-farid-portfolio.vercel.app"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ── Controllers ───────────────────────────────────────────────────────────────
builder.Services.AddControllers();

// ── Swagger / OpenAPI ─────────────────────────────────────────────────────────
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ── Email Service ─────────────────────────────────────────────────────────────
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));
builder.Services.AddScoped<IEmailService, SmtpEmailService>();

var app = builder.Build();

// ── Middleware pipeline ───────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Portfolio API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseCors("PortfolioCors");
app.MapControllers();

app.Run();
