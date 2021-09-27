using ReactQueryApi.DTOs;
using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Services.ProductGroup
{
    public interface IProductGroupService
    {
        Task<ServiceResponse<List<ProductGroupDTO_ToReturn>>> GetProductGroups();
        Task<ServiceResponse<ProductGroupDTO_ToReturn>> GetProductGroupById(Guid id);
        Task<ServiceResponse<List<ProductGroupDTO_ToReturn>>> GetProductGroupfilter(ProductGroupDTO_Filter input);

        Task<ServiceResponse<ProductGroupDTO_ToReturn>> CreateProductGroup(ProductGroupDTO_ToCreate input);
        Task<ServiceResponse<ProductGroupDTO_ToReturn>> UpdateProductGroup(ProductGroupDTO_ToUpdate input);
        Task<ServiceResponse<ProductGroupDTO_ToReturn>> DeleteProductGroup(Guid id);
    }
}
