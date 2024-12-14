using Microsoft.EntityFrameworkCore;
using TripPlanner.API.Models;

namespace TripPlanner.API.Data
{
    public class TripPlannerContext : DbContext
    {
        public TripPlannerContext(DbContextOptions<TripPlannerContext> options)
            : base(options)
        {
        }

        public DbSet<Trip> Trips { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Trip>(entity =>
            {
                entity.ToTable("trips");
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.UserEmail).HasColumnName("user_email");
                entity.Property(e => e.UserSelection).HasColumnName("user_selection");
                entity.Property(e => e.TripData).HasColumnName("trip_data");
                entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            });
        }
    }
}