import 'package:dio/dio.dart';

class DioErrorUtil {
  // general methods:------------------------------------------------------------
  static String handleError(DioError error) {
    String errorDescription = "";
      switch (error.type) {
        case DioErrorType.cancel:
          errorDescription = "Request to API server was cancelled";
          break;
        case DioErrorType.connectionTimeout:
          errorDescription = "Connection timeout with API server";
          break;
        case DioErrorType.unknown:
          errorDescription =
          "Connection to API server failed due to internet connection";
          break;
        case DioErrorType.receiveTimeout:
          errorDescription = "Receive timeout in connection with API server";
          break;
        case DioErrorType.badResponse:
          errorDescription =
          "Received invalid status code: ${error.response!.statusCode}";
          break;
        case DioErrorType.sendTimeout:
          errorDescription = "Send timeout in connection with API server";
          break;
          default:
          errorDescription = "Unexpected error occured";
          break;
      }
      return errorDescription;
  }
}