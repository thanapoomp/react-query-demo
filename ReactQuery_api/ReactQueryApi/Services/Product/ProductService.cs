using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ReactQueryApi.Data;
using ReactQueryApi.DTOs;
using ReactQueryApi.Helpers;
using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace ReactQueryApi.Services.Product
{
    public class ProductService : ServiceBase, IProductService
    {
        private readonly IMapper _mapper;
        private readonly ReactQueryContext _dBContext;
        private readonly ILogger<ProductService> _log;
        private readonly IHttpContextAccessor _httpContext;

        public ProductService(IMapper mapper, IHttpContextAccessor httpContext, ReactQueryContext dBContext, ILogger<ProductService> log) : base(dBContext, mapper, httpContext)
        {
            this._httpContext = httpContext;
            this._log = log;
            this._mapper = mapper;
            this._dBContext = dBContext;
        }

        /// <summary>
        /// Create Product
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ProductDTO_ToReturn>> CreateProduct(ProductDTO_ToCreate input)
        {
            //validate productGroup exsist
            var productGroupExsist = await ProductGroupExsist(input.ProductGroupId.Value);

            if (!productGroupExsist)
            {
                return ResponseResult.Failure<ProductDTO_ToReturn>($"ProductGroup {input.ProductGroupId} not exsist");
            }

            var itemToCreate = new Models.Product();
            itemToCreate.Id = Guid.NewGuid();
            itemToCreate.ProductGroupId = input.ProductGroupId;
            itemToCreate.Name = input.Name;
            itemToCreate.Price = input.Price;
            itemToCreate.Stock = input.Stock;
            itemToCreate.IsActive = true;
            itemToCreate.CreatedUserId = new Guid(GetUserId());
            itemToCreate.UpdatedUserId = new Guid(GetUserId());
            itemToCreate.CreatedDate = DateTime.Now;
            itemToCreate.UpdatedDate = DateTime.Now;

            await _dBContext.Products.AddAsync(itemToCreate);
            await _dBContext.SaveChangesAsync();

            var result = _mapper.Map<ProductDTO_ToReturn>(itemToCreate);
            return ResponseResult.Success(result);
        }

        /// <summary>
        /// Update Product
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ProductDTO_ToReturn>> UpdateProduct(ProductDTO_ToUpdate input)
        {
            //validate product exsist
            var productExsist = await ProductExsist(input.Id);

            if (!productExsist)
            {
                return ResponseResult.Failure<ProductDTO_ToReturn>($"Product {input.Id} not exsist.");
            }

            //validate productGroup exsist
            var productGroupExsist = await ProductGroupExsist(input.ProductGroupId.Value);

            if (!productGroupExsist)
            {
                return ResponseResult.Failure<ProductDTO_ToReturn>($"ProductGroup {input.ProductGroupId} not exsist");
            }

            var itemToUpdate = await _dBContext.Products.Where(x => x.Id == input.Id)
                .Include(x => x.CreatedUser)
                .Include(x => x.UpdatedUser)
                .FirstOrDefaultAsync();
            itemToUpdate.ProductGroupId = input.ProductGroupId;
            itemToUpdate.Name = input.Name;
            itemToUpdate.Price = input.Price;
            itemToUpdate.Stock = input.Stock;
            itemToUpdate.UpdatedUserId = new Guid(GetUserId());
            itemToUpdate.UpdatedDate = DateTime.Now;

            await _dBContext.SaveChangesAsync();

            var result = _mapper.Map<ProductDTO_ToReturn>(itemToUpdate);
            return ResponseResult.Success(result);
        }

        /// <summary>
        /// Delete Product
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ProductDTO_ToReturn>> DeleteProduct(Guid id)
        {
            //validate product exsist
            var productExsist = await ProductExsist(id);

            if (!productExsist)
            {
                return ResponseResult.Failure<ProductDTO_ToReturn>($"Product {id} not exsist.");
            }
            
            var itemToDelete = await _dBContext.Products.Where(x => x.Id == id)
                .Include(x => x.CreatedUser)
                .Include(x => x.UpdatedUser)
                .FirstOrDefaultAsync();

            itemToDelete.IsActive = false;
            itemToDelete.UpdatedUserId = new Guid(GetUserId());
            itemToDelete.UpdatedDate = DateTime.Now;

            await _dBContext.SaveChangesAsync();

            var result = _mapper.Map<ProductDTO_ToReturn>(itemToDelete);
            return ResponseResult.Success(result);

        }

        /// <summary>
        /// Get Product By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ProductDTO_ToReturn>> GetProductById(Guid id)
        {
            //validate product exsist
            var productExsist = await ProductExsist(id);

            if (!productExsist)
            {
                return ResponseResult.Failure<ProductDTO_ToReturn>($"Product {id} not exsist.");
            }

            var itemToReturn = await _dBContext.Products.Where(x => x.Id == id)
                .Include(x => x.ProductGroup)
                .Include(x => x.CreatedUser)
                .Include(x => x.UpdatedUser)
                .FirstOrDefaultAsync();

            var result = _mapper.Map<ProductDTO_ToReturn>(itemToReturn);
            return ResponseResult.Success(result);
        }

        /// <summary>
        /// Get Product Filter
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<List<ProductDTO_ToReturn>>> GetProductfilter(ProductDTO_Filter input)
        {
            var queryable = _dBContext.Products
               .Include(x => x.ProductGroup)
               .Include(x => x.CreatedUser)
               .Include(x => x.UpdatedUser)
               .AsQueryable();

            if (!string.IsNullOrEmpty(input.SearchText))
            {
                queryable = queryable.Where(x => x.Name.Contains(input.SearchText)
                || x.ProductGroup.Name.Contains(input.SearchText));
            }

            if (!string.IsNullOrWhiteSpace(input.OrderingField))
            {
                try
                {
                    queryable = queryable.OrderBy($"{input.OrderingField} {(input.AscendingOrder ? "ascending" : "descending")}");
                }
                catch
                {
                    return ResponseResultWithPagination.Failure<List<ProductDTO_ToReturn>>($"Could not order by field: {input.OrderingField}");
                }
            }

            //add data to pagination
            var paginationResult = await _httpContext.HttpContext.InsertPaginationParametersInResponse(queryable, input.RecordsPerPage, input.Page);

            var lstResult = await queryable.Paginate(input).ToListAsync();
            var resultDto = _mapper.Map<List<ProductDTO_ToReturn>>(lstResult);
            return ResponseResultWithPagination.Success(resultDto, paginationResult);
        }



        private async Task<bool> ProductExsist(Guid id)
        {
            var result = await _dBContext.Products.Where(x => x.Id == id).AnyAsync();
            return result;
        }

        private async Task<bool> ProductGroupExsist(Guid id)
        {
            var result = await _dBContext.ProductGroups.Where(x => x.Id == id).AnyAsync();
            return result;
        }
    }
}
