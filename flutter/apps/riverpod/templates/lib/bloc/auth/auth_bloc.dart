import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:<%= appsName %>/modules/user/models/user.dart';
import 'package:<%= appsName %>/services/local/database_services.dart';

import '../../services/apps_routes.dart';
import '../../services/auth_jwt_services.dart';
import '../../services/navigation.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

final authBloc = ChangeNotifierProvider<AuthBloc>((ref) => AuthBloc());

class AuthBloc extends ChangeNotifier {
  String username = '';

  User? user;

  String loginMessage = '';

  String password = '';

  String passwordMessage = '';

  String confirmPassword = '';

  String confirmPasswordMessage = '';

  bool success = false;

  bool loggedIn = false;

  bool loading = false;

  bool rememberMe = false;

  String errorMessage = '';

  bool showError = false;

  bool get canRegister =>
      username.isNotEmpty && password.isNotEmpty && confirmPassword.isNotEmpty;

  bool get canForgetPassword =>
      !hasErrorInForgotPassword && username.isNotEmpty;

  bool hasErrorsInLogin = false;

  bool hasErrorInForgotPassword = false;

  void setUserId(String value) {
    _validateUserEmail(value);
    username = value;
  }

  void setPassword(String value) {
    _validatePassword(value);
    password = value;
  }

  void setConfirmPassword(String value) {
    _validateConfirmPassword(value);
    confirmPassword = value;
  }

  void _validateUserEmail(String value) {
    // Regex for email validation
    String pattern = "[a-zA-Z0-9+._%-+]{1,256}\\@"
        "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}"
        "(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+";

    RegExp regExp = RegExp(pattern);

    if (value.isEmpty) {
      loginMessage = "empty";
    } else if (regExp.hasMatch(value)) {
      showError = true;
      loginMessage = '';
    } else {
      showError = true;
      loginMessage = 'unauthorized';
    }

    notifyListeners();
  }

  void _validatePassword(String value) {
    if (value.isEmpty) {
      passwordMessage = "empty";
    } else if (value.length < 6) {
      passwordMessage = "length";
    } else {
      passwordMessage = '';
    }
    notifyListeners();
  }

  void _validateConfirmPassword(String value) {
    if (value.isEmpty) {
      confirmPasswordMessage = "confirm";
    } else if (value != password) {
      confirmPasswordMessage = "match";
    } else {
      confirmPasswordMessage = '';
    }
    notifyListeners();
  }

  String messagePassword(context) {
    switch (passwordMessage) {
      case "confirm":
        return AppLocalizations.of(context)!.passwordConfirm;
      case "empty":
        return AppLocalizations.of(context)!.passwordEmpty;
      case "length":
        return AppLocalizations.of(context)!.passwordLength;
      case "match":
        return AppLocalizations.of(context)!.passwordMatch;
      default:
        return "";
    }
  }

  message(context) {
    errorMessage = AppLocalizations.of(context)!.errorUnauthorized;
    switch (errorMessage) {
      case "unauthorized":
        errorMessage = AppLocalizations.of(context)!.errorUnauthorized;
        break;
      case "username":
        return AppLocalizations.of(context)!.errorUsername;
      default:
        return AppLocalizations.of(context)!.errorNetwork;
    }
  }

  signIn(context) {
    errorMessage = message(context);

    AuthServices.login(username, password, rememberMe).then((v) {
      _loggedin(v);
    });
  }

  void _loggedin(value) async{
    int id = (await DatabaseServices.db.fetchObject(value))["user"];
    for (var user in await AuthServices.userStatic()) {
      if (user.id == id) {
        this.user = user;
      }
    }
   
    NavigationServices.navigateTo(AppsRoutes.home);
    /* if (value == 'SUCCESS') {
      FLog.info(text: "Success login!");
      NavigationServices.navigateTo(AppsRoutes.home);
    } else if (value.toString().contains("[401]")) {
      showError = true;
      loading = false;
      errorMessage = "unauthorized";
    } else if (value.toString().contains("[400]")) {
      showError = true;
      loading = false;
      errorMessage = "username";
    } */
  }

  Future register() async {
    loading = true;
  }

  Future gotoHome() async {
    if (loggedIn) NavigationServices.navigateTo(AppsRoutes.home);
  }

  Future forgotPassword() async {
    loading = true;
  }

  Future<void> logout() async {
    loading = true;
    AuthServices.logout();
    NavigationServices.navigateTo(AppsRoutes.login);
    loading = false;
  }
}
