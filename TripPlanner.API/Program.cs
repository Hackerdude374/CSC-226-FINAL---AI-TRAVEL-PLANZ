using Microsoft.EntityFrameworkCore;
using TripPlanner.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });

// Add DbContext
builder.Services.AddDbContext<TripPlannerContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Swagger/OpenAPI support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:5173") // Your React app's URL
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Important: Put UseCors before UseHttpsRedirection
app.UseCors("AllowAll");

// Comment this out temporarily for development
// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

app.Run();