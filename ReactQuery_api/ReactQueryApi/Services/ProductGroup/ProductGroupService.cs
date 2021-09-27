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

namespace ReactQueryApi.Services.ProductGroup
{
    public class ProductGroupService : ServiceBase, IProductGroupService
    {
        private readonly IMapper _mapper;
        private readonly ReactQueryContext _dBContext;
        private readonly ILogger<ProductGroupService> _log;
        private readonly IHttpContextAccessor _httpContext;

        public ProductGroupService(IMapper mapper, IHttpContextAccessor httpContext, ReactQueryContext dBContext, ILogger<ProductGroupService> log) : base(dBContext, mapper, httpContext)
        {
            this._httpContext = httpContext;
            this._log = log;
            this._mapper = mapper;
            this._dBContext = dBContext;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<ProductGroupDTO_ToReturn>> CreateProductGroup(ProductGroupDTO_ToCreate input)
        {
            //validate isExsist
            var exsist = await _dBContext.ProductGroups.Where(x => x.Name == input.Name.Trim()).AnyAsync();
            if (exsist)
            {
                return ResponseResult.Failure<ProductGroupDTO_ToReturn>($"ProductGroup {input.Name} already exsist");
            }

            var itemToCreate = new Models.ProductGroup();
            itemToCreate.Id = Guid.NewGuid();
            itemToCreate.Name = input.Name;
            itemToCreate.IsActive = true;
            itemToCreate.CreatedUserId = new Guid(GetUserId());
            itemToCreate.UpdatedUserId = new Guid(GetUserId());
            itemToCreate.CreatedDate = DateTime.Now;
            itemToCreate.UpdatedDate = DateTime.Now;

            await _dBContext.ProductGroups.AddAsync(itemToCreate);
            await _dBContext.SaveChangesAsync();
            var result = _mapper.Map<ProductGroupDTO_ToReturn>(itemToCreate);
            return ResponseResult.Success(result);
        }

        public async Task<ServiceResponse<ProductGroupDTO_ToReturn>> UpdateProductGroup(ProductGroupDTO_ToUpdate input)
        {
            //validate isExsist
            var exsist = await _dBContext.ProductGroups.Where(x => x.Id == input.Id).AnyAsync();
            if (!exsist)
            {
                return ResponseResult.Failure<ProductGroupDTO_ToReturn>($"ProductGroup {input.Id} not exsist");
            }

            var itemToUpdate = await _dBContext.ProductGroups.Where(x => x.Id == input.Id).FirstOrDefaultAsync();

            itemToUpdate.Name = input.Name;
            itemToUpdate.UpdatedDate = DateTime.Now;
            itemToUpdate.UpdatedUserId = new Guid(GetUserId());

            await _dBContext.SaveChangesAsync();

            var result = _mapper.Map<ProductGroupDTO_ToReturn>(itemToUpdate);
            return ResponseResult.Success(result);
        }

        public async Task<ServiceResponse<ProductGroupDTO_ToReturn>> DeleteProductGroup(Guid id)
        {
            //validate isExsist
            var exsist = await _dBContext.ProductGroups.Where(x => x.Id == id).AnyAsync();
            if (!exsist)
            {
                return ResponseResult.Failure<ProductGroupDTO_ToReturn>($"ProductGroup {id} not exsist");
            }

            var itemToDelete = await _dBContext.ProductGroups.Where(x => x.Id == id).Include(x => x.CreatedUser).Include(x => x.UpdatedUser).FirstOrDefaultAsync();
            itemToDelete.IsActive = false;
            itemToDelete.UpdatedUserId = new Guid(GetUserId());
            itemToDelete.UpdatedDate = DateTime.Now;

            await _dBContext.SaveChangesAsync();
            var result = _mapper.Map<ProductGroupDTO_ToReturn>(itemToDelete);
            return ResponseResult.Success(result);
        }

        public async Task<ServiceResponse<ProductGroupDTO_ToReturn>> GetProductGroupById(Guid id)
        {
            //validate isExsist
            var exsist = await _dBContext.ProductGroups.Where(x => x.Id == id).AnyAsync();
            if (!exsist)
            {
                return ResponseResult.Failure<ProductGroupDTO_ToReturn>($"ProductGroup {id} not exsist");
            }

            var itemToReturn = await _dBContext.ProductGroups
                .Where(x => x.Id == id)
                .Include(x => x.UpdatedUser)
                .Include(x => x.CreatedUser)
                .FirstOrDefaultAsync();
            var result = _mapper.Map<ProductGroupDTO_ToReturn>(itemToReturn);
            return ResponseResult.Success(result);
        }

        public async Task<ServiceResponse<List<ProductGroupDTO_ToReturn>>> GetProductGroupfilter(ProductGroupDTO_Filter input)
        {
            var queryable = _dBContext.ProductGroups
                .Include(x => x.CreatedUser)
                .Include(x => x.UpdatedUser)
                .AsQueryable();

            if (!string.IsNullOrEmpty(input.SearchText))
            {
                queryable = queryable.Where(x => x.Name.Contains(input.SearchText));
            }

            if (!string.IsNullOrWhiteSpace(input.OrderingField))
            {
                try
                {
                    queryable = queryable.OrderBy($"{input.OrderingField} {(input.AscendingOrder ? "ascending" : "descending")}");
                }
                catch
                {
                    return ResponseResultWithPagination.Failure<List<ProductGroupDTO_ToReturn>>($"Could not order by field: {input.OrderingField}");
                }
            }

            //add data to pagination
            var paginationResult = await _httpContext.HttpContext.InsertPaginationParametersInResponse(queryable, input.RecordsPerPage, input.Page);

            var lstResult = await queryable.Paginate(input).ToListAsync();
            var resultDto = _mapper.Map<List<ProductGroupDTO_ToReturn>>(lstResult);
            return ResponseResultWithPagination.Success(resultDto, paginationResult);
        }

        public async Task<ServiceResponse<List<ProductGroupDTO_ToReturn>>> GetProductGroups()
        {
            var itemsToReturn = await _dBContext.ProductGroups
                 .Where(x => x.IsActive == true)
                 .Include(x => x.CreatedUser)
                 .Include(x => x.UpdatedUser)
                 .OrderBy(x => x.Name).ToListAsync();
            var result = _mapper.Map<List<ProductGroupDTO_ToReturn>>(itemsToReturn);
            return ResponseResult.Success(result);
        }


    }
}
