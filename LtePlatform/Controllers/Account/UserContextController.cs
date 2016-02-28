﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using LtePlatform.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace LtePlatform.Controllers.Account
{
    [Authorize]
    public class CurrentUserController : ApiController
    {
        [HttpGet]
        public IndexViewModel Get()
        {
            return UserContextConfiguration.CurrentUser;
        } 
    }

    public class CurrentMessageController : ApiController
    {
        [HttpGet]
        public string Get()
        {
            return UserContextConfiguration.CurrentMessage;
        }

        [HttpDelete]
        public void Delete()
        {
            UserContextConfiguration.CurrentMessage = "";
        }
    }
}
