using System.Reflection;
using System.Threading.Tasks;
using Abp.Application.Features;
using Abp.Authorization;
using Abp.Configuration.Startup;
using Abp.Localization;
using NSubstitute;
using Shouldly;
using Xunit;

namespace Abp.Tests.Authorization
{
    public class AuthorizationHelper_Tests
    {
        private readonly AuthorizationHelper _authorizeHelper;

        public AuthorizationHelper_Tests()
        {
            var featureChecker = Substitute.For<IFeatureChecker>();
            featureChecker.GetValueAsync(Arg.Any<string>()).Returns("false");

            var permissionChecker = Substitute.For<IPermissionChecker>();
            permissionChecker.IsGrantedAsync(Arg.Any<string>()).Returns(false);

            var configuration = Substitute.For<IAuthorizationConfiguration>();
            configuration.IsEnabled.Returns(true);

            _authorizeHelper = new AuthorizationHelper(featureChecker, configuration)
            {
                PermissionChecker = permissionChecker
            };
        }

        [Fact]
        public async Task NotAuthorizedMethodsCanBeCalledAnonymously()
        {
            await _authorizeHelper.AuthorizeAsync(
                typeof(MyNonAuthorizedClass).GetTypeInfo().GetMethod(nameof(MyNonAuthorizedClass.Test_NotAuthorized)),
                typeof(MyNonAuthorizedClass)
                );

            await _authorizeHelper.AuthorizeAsync(
                typeof(MyAuthorizedClass).GetTypeInfo().GetMethod(nameof(MyAuthorizedClass.Test_NotAuthorized)),
                typeof(MyAuthorizedClass)
            );
        }

        [Fact]
        public async Task AuthorizedMethodsCanNotBeCalledAnonymously()
        {
            await Assert.ThrowsAsync<AbpAuthorizationException>(async () =>
            {
                await _authorizeHelper.AuthorizeAsync(
                    typeof(MyNonAuthorizedClass).GetTypeInfo().GetMethod(nameof(MyNonAuthorizedClass.Test_Authorized)),
                    typeof(MyNonAuthorizedClass)
                );
            });

            await Assert.ThrowsAsync<AbpAuthorizationException>(async () =>
            {
                await _authorizeHelper.AuthorizeAsync(
                    typeof(MyAuthorizedClass).GetTypeInfo().GetMethod(nameof(MyAuthorizedClass.Test_Authorized)),
                    typeof(MyAuthorizedClass)
                );
            });
        }

        public class MyNonAuthorizedClass
        {
            public void Test_NotAuthorized()
            {

            }

            [AbpAuthorize]
            public void Test_Authorized()
            {

            }
        }

        [AbpAuthorize]
        public class MyAuthorizedClass
        {
            [AbpAllowAnonymous]
            public void Test_NotAuthorized()
            {

            }

            public void Test_Authorized()
            {

            }
        }
    }

    public class MyAuthorizationProvider1 : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //Create a root permission group for 'Administration' permissions
            var administration = context.CreatePermission("Abp.Zero.Administration", new FixedLocalizableString("Administration"));

            //Create 'User management' permission under 'Administration' group
            var userManagement = administration.CreateChildPermission("Abp.Zero.Administration.UserManagement", new FixedLocalizableString("User management"));

            //Create 'Change permissions' (to be able to change permissions of a user) permission as child of 'User management' permission.
            userManagement.CreateChildPermission("Abp.Zero.Administration.UserManagement.ChangePermissions", new FixedLocalizableString("Change permissions"));
        }
    }

    public class MyAuthorizationProvider2 : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //Get existing root permission group 'Administration'
            var administration = context.GetPermissionOrNull("Abp.Zero.Administration");
            administration.ShouldNotBe(null);

            //Create 'Role management' permission under 'Administration' group
            var roleManegement = administration.CreateChildPermission("Abp.Zero.Administration.RoleManagement", new FixedLocalizableString("Role management"));

            //Create 'Create role' (to be able to create a new role) permission  as child of 'Role management' permission.
            roleManegement.CreateChildPermission("Abp.Zero.Administration.RoleManagement.CreateRole", new FixedLocalizableString("Create role"));
        }
    }
}
