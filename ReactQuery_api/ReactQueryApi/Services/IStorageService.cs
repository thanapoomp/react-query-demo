using System.Threading.Tasks;

namespace ReactQueryApi.Services
{
    public interface IStorageService
    {
        Task DeleteFile(string fileRoute, string containerName);
        Task<string> SaveFile(byte[] content, string extension, string containerName, string contentType);
        Task<string> UpdateFile(byte[] content, string extension, string containerName, string fileRoute, string contentType);
    }
}