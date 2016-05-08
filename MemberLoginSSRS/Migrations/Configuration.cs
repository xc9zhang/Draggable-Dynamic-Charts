namespace MemberLoginSSRS.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<MemberLoginSSRS.DAL.MemberLoginSSRSContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            ContextKey = "MemberLoginSSRS.DAL.MemberLoginSSRSContext";
        }

        protected override void Seed(MemberLoginSSRS.DAL.MemberLoginSSRSContext context)
        {
            context.Users.AddOrUpdate(
                  p => p.Name,
                  new MemberLoginSSRS.Models.User { Name = "John.Smith", Layout = "{\"A\":[],\"B\":[]}" }

                );
        }
    }
}
