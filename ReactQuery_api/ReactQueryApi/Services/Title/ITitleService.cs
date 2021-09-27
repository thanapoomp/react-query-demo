using ReactQueryApi.DTOs;
using ReactQueryApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactQueryApi.Services.Title
{
    public interface ITitleService
    {
        Task<ServiceResponse<List<TitleDTO_ToReturn>>> GetTitles();
        Task<ServiceResponse<TitleDTO_ToReturn>> GetTitleById(Guid id);
        Task<ServiceResponseWithPagination<List<TitleDTO_ToReturn>>> GetTitlefilter(TitleDTO_Filter input);

        Task<ServiceResponse<TitleDTO_ToReturn>> CreateTitle(TitleDTO_ToCreate input);
        Task<ServiceResponse<TitleDTO_ToReturn>> UpdateTitle(TitleDTO_ToUpdate input);
        Task<ServiceResponse<TitleDTO_ToReturn>> DeleteTitle(Guid id);

    }
}
