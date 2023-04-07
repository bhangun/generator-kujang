import 'package:flutter/foundation.dart';

@immutable
class Status {
  const Status(
      {this.success = false,
      this.showError = false,
      this.loading = false,
      this.errorMessage = '',
      this.hasErrorInForgotPassword = false,
      this.hasErrorsInLogin = false});

  final bool success;
  final bool loading;
  final bool showError;
  final String errorMessage;
  final bool hasErrorInForgotPassword;
  final bool hasErrorsInLogin;

  Status copyWith(
      {bool? success,
      bool? showError,
      bool? loading,
      String? errorMessage,
      bool? hasErrorInForgotPassword,
      String? confirmPasswordMessage,
      bool? hasErrorsInLogin}) {
    return Status(
        success: success ?? this.success,
        showError: showError ?? this.showError,
        loading: loading ?? this.loading,
        errorMessage: errorMessage ?? this.errorMessage,
        hasErrorInForgotPassword: hasErrorInForgotPassword ?? this.hasErrorInForgotPassword,
        hasErrorsInLogin: hasErrorsInLogin ?? this.hasErrorsInLogin);
      }
    
}

