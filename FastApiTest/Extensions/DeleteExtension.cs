using Moco.Api.Models.Moco.Resource;

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
    }
}
