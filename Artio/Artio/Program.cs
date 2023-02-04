using Core.Mapping;
using DAL;
using DAL.Abstractions;
using DAL.Repositories.ef;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

IConfiguration appConfig = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

builder.Services.AddDbContext<ApplicationContext>(options =>
                options.UseNpgsql(
                    appConfig.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<ILikeRepository, LikeRepository>();
builder.Services.AddScoped<IPostRepository, PostRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
