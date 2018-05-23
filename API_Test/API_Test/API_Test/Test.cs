using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;

namespace API_Test
{
    public static class Test
    {
        static readonly HttpClientHandler handler = new HttpClientHandler();
        static readonly HttpClient client = new HttpClient(handler);
        public static bool TestPost(string website, string address, Action<string> InitialStateCreation, Dictionary<string, string> content,
               UserTest Unauthenticated,
               UserTest Student,
               UserTest Teacher,
               UserTest ServiceDesk,
               UserTest Admin)
        {
            return _Test(SendPostMessage, website, address, InitialStateCreation, content, Unauthenticated, Student, Teacher, ServiceDesk, Admin);
        }
        public static bool TestPut(string website, string address, Action<string> InitialStateCreation, Dictionary<string, string> content,
           UserTest Unauthenticated,
           UserTest Student,
           UserTest Teacher,
           UserTest ServiceDesk,
           UserTest Admin)
        {
            return _Test(SendPutMessage, website, address, InitialStateCreation, content, Unauthenticated, Student, Teacher, ServiceDesk, Admin);
        }
        public static bool TestGet(string website, string address, Action<string> InitialStateCreation, Dictionary<string, string> content,
           UserTest Unauthenticated,
           UserTest Student,
           UserTest Teacher,
           UserTest ServiceDesk,
           UserTest Admin)
        {
            return _Test((_address, _content, _cookies) => SendGetMessage(_address, _cookies), website, address, InitialStateCreation, content, Unauthenticated, Student, Teacher, ServiceDesk, Admin);
        }
        public static bool TestDelete(string website, string address, Action<string> InitialStateCreation, Dictionary<string, string> content,
           UserTest Unauthenticated,
           UserTest Student,
           UserTest Teacher,
           UserTest ServiceDesk,
           UserTest Admin)
        {
            return _Test((_address, _content, _cookies) => SendDeleteMessage(_address, _cookies), website, address, InitialStateCreation, content, Unauthenticated, Student, Teacher, ServiceDesk, Admin);
        }

        private static bool _Test(Func<string, Dictionary<string, string>, CookieContainer, Response> method, string website, string address, Action<string> InitialStateCreation, Dictionary<string, string> content,
            UserTest Unauthenticated,
            UserTest Student,
            UserTest Teacher,
            UserTest ServiceDesk,
            UserTest Admin)
        {
            string API_address = website + address;
            Func<UserTest, bool> test = x =>
            {
                InitialStateCreation.Invoke(website);
                return x.test(method(API_address, content, x.cookie));
            };
            return test(Unauthenticated) && test(Student) && test(Teacher) && test(ServiceDesk) && test(Admin);
        }

        private static Response SendPostMessage(string address, Dictionary<string, string> content, CookieContainer cookies)
        {
            handler.CookieContainer = cookies;
            var parsedcontent = new FormUrlEncodedContent(content);
            var response = client.PostAsync(address, parsedcontent).Result;
            return new Response(response.StatusCode, response.Content.ReadAsStringAsync().Result, handler.CookieContainer);
        }
        private static Response SendPutMessage(string address, Dictionary<string, string> content, CookieContainer cookies)
        {
            handler.CookieContainer = cookies;
            var parsedcontent = new FormUrlEncodedContent(content);
            var response = client.PutAsync(address, parsedcontent).Result;
            return new Response(response.StatusCode, response.Content.ReadAsStringAsync().Result, handler.CookieContainer);
        }
        private static Response SendGetMessage(string address, CookieContainer cookies)
        {
            handler.CookieContainer = cookies;
            var response = client.GetAsync(address).Result;
            return new Response(response.StatusCode, response.Content.ReadAsStringAsync().Result, handler.CookieContainer);
        }
        private static Response SendDeleteMessage(string address, CookieContainer cookies)
        {
            handler.CookieContainer = cookies;
            var response = client.DeleteAsync(address).Result;
            return new Response(response.StatusCode, response.Content.ReadAsStringAsync().Result, handler.CookieContainer);
        }
    }
}
