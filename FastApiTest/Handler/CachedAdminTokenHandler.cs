using Microsoft.Extensions.Caching.Memory;
using NSwag;
using System.Web;

namespace MocoApi.Handler
{
    public class CachedAdminTokenHandler : DelegatingHandler
    {
        private readonly IMemoryCache _cache;

        public CachedAdminTokenHandler(IMemoryCache cache)
        {
            this._cache = cache;
        }
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            
            var key = $"admin_token";

            var cached = _cache.Get<string>(key);

            if (cached is not null)
            {
                return new HttpResponseMessage(System.Net.HttpStatusCode.OK)
                {
                    Content = new StringContent(cached)
                };
            }

            var res =  await base.SendAsync(request, cancellationToken);
            var content = await res.Content.ReadAsStringAsync(cancellationToken);

            _cache.Set(key, content, TimeSpan.FromMinutes(25));

            return res;
        }
    }
}
