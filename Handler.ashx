<%@ WebHandler Language="C#" Class="Handler" %>

using NReco.PhantomJS;
using System.Web;
using System.Text;

public class Handler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        var t = new PhantomJS();

        t.ErrorReceived += (sender, e) =>
        {
            context.Response.ContentType = "text/html";
            context.Response.Charset = "utf-8";
            context.Response.ContentEncoding = Encoding.UTF8;
            context.Response.Write(e.Data);
        };
        t.OutputReceived += (sender, e) =>
        {
            context.Response.ContentType = "text/html";
            context.Response.Charset = "utf-8";
            context.Response.ContentEncoding = Encoding.UTF8;
            context.Response.Write(e.Data);
        };

        var query = context.Request.QueryString["url"];
        //context.Response.Write(query);
        t.Run("echo-html.js", new string[] { query, "--output-encoding=utf-8" });
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}