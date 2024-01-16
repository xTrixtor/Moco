using Moco.Api.Models.Moco.Resource;
using MocoApi.Models.Moco.Resource;

namespace Moco.Api.Extensions
{
    public static class DeleteExtension
    {
        public static async Task DeleteAsync(this FixedCost fixedCost, MoCoContext moCoContext)
        {
            if (fixedCost is null)
            {
                throw new Exception("To Delete FixedCost could not be found");
            }

            moCoContext.Remove(fixedCost);
        }

        public static async Task DeleteAsync(this Charge change, MoCoContext moCoContext)
        {
            if (change is null)
            {
                throw new Exception("To Delete FixedCost could not be found");
            }

            moCoContext.Remove(change);
        }
    }
}
