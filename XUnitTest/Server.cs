using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using ReserveerBackend;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Linq;

namespace XUnitTest
{
    class Server
    {
        private HttpClient client { get; set; }
        private TestServer server;
        public ReserveerDBContext database { get; private set; }
        public UnitTestEmailService EmailService { get; private set; }
        Dictionary<string, string> Cookies = new Dictionary<string, string>();
        public Server()
        {
            EmailService = new UnitTestEmailService();

            var builder = new WebHostBuilder()
            .UseStartup<Startup>()
            .UseEnvironment("Testing")
            .WithEmailService(EmailService);

            server = new TestServer(builder);
            database = server.Host.Services.GetService(typeof(ReserveerDBContext)) as ReserveerDBContext;
            client = server.CreateClient();
        }

        private void UpdateCookies(HttpResponseMessage message)
        {
            var cookies = message.Headers.GetValues("Set-Cookie").Select(x => x.Split('=')).Where(x => x.Length == 2);
            foreach (var item in cookies)
            {
                Cookies.Add(item[0], item[1]);
            }
        }
        private string GetCookies()
        {
            string cookie = "";
            foreach (var item in Cookies)
            {
                cookie += item.Key + "=" + item.Value + ";";
            }
            return cookie;
        }

        public HttpResponseMessage Post(string URI, IEnumerable<KeyValuePair<string, string>> content)
        {
            var result = server.CreateRequest(URI).AddHeader("Cookie", GetCookies()).PostAsync().Result;
            //var result = client.PostAsync(URI, new FormUrlEncodedContent(content)).Result;
            UpdateCookies(result);
            return result;
        }
        public HttpResponseMessage Get(string URI)
        {
            return client.GetAsync(URI).Result;
        }
        public HttpResponseMessage Delete(string URI, IEnumerable<KeyValuePair<string, string>> content)
        {
            return client.DeleteAsync(URI).Result;
        }
        public HttpResponseMessage Put(string URI, IEnumerable<KeyValuePair<string, string>> content)
        {
            return client.PutAsync(URI, new FormUrlEncodedContent(content)).Result;
        }
    }
}
