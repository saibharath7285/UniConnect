namespace UniConnect.API.Models;

public class OperationResult<T>
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public T? Data { get; set; }

    public static OperationResult<T> Ok(T data, string message = "Success") =>
        new() { Success = true, Message = message, Data = data };

    public static OperationResult<T> Fail(string message) =>
        new() { Success = false, Message = message, Data = default };
}
