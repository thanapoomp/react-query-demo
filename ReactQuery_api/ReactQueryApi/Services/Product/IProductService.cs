using ReactQueryApi.DTOs;
using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Services.Product
{
    public interface IProductService
    {
        Task<ServiceResponse<ProductDTO_ToReturn>> GetProductById(Guid id);
        Task<ServiceResponse<List<ProductDTO_ToReturn>>> GetProductfilter(ProductDTO_Filter input);

        Task<ServiceResponse<ProductDTO_ToReturn>> CreateProduct(ProductDTO_ToCreate input);
        Task<ServiceResponse<ProductDTO_ToReturn>> UpdateProduct(ProductDTO_ToUpdate input);
        Task<ServiceResponse<ProductDTO_ToReturn>> DeleteProduct(Guid id);
    }
}
