using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using ReserveerBackend;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Linq;
using System.Threading;

namespace XUnitTest
{
    class Server
    {
        private HttpClient client { get; set; }
        private TestServer server;
        public ReserveerDBContext database { get; private set; }
        public UnitTestEmailService EmailService { get; private set; }
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

        public HttpResponseMessage Post(string URI, IEnumerable<KeyValuePair<string, string>> content)
        {
            return client.PostAsync(URI, new FormUrlEncodedContent(content)).Result;
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
