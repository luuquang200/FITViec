namespace EmployerService.Domain.DTO
{
    public class CreateEmployerResult
    {
        public bool IsSuccess { get; set; }
        public string ErrorMessage { get; set; }
        public string EmployerId { get; set; }
        public string CompanyId { get; set; }
    }
}
