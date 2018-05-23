using System;
using System.Collections.Generic;
using System.Text;
using System.Net;

namespace API_Test
{
    public struct UserTest
    {
        public Func<Response, bool> test;
        public CookieContainer cookie;
        public UserTest(CookieContainer cookie, Func<Response, bool> test)
        {
            this.cookie = cookie;
            this.test = test;
        }
    }
}
