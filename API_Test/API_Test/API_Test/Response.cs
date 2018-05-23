using System;
using System.Collections.Generic;
using System.Text;
using System.Net;

namespace API_Test
{
    public class Response
    {
        public Response(HttpStatusCode code, string content, CookieContainer cookies)
        {
            this.code = code;
            this.content = content;
            this.cookies = cookies;
        }
        HttpStatusCode code;
        string content;
        CookieContainer cookies;
    }
}
