import 'package:flutter/widgets.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../../../models/status.dart';
import '../../../services/auth_jwt_services.dart';

final authBloc = ChangeNotifierProvider((ref) => AuthBloc(ref: ref));

class AuthBloc extends ChangeNotifier {
  Ref ref;

  String username = '';
  String password = '';
  bool rememberMe = false;
  String token = '';
  // final User user;
  bool loggedIn = false;
  String loginMessage = '';
  String passwordMessage = '';
  String confirmPassword = '';
  String confirmPasswordMessage = '';
  late Status status;
  AuthBloc({required this.ref}) {
    status = const Status();
  }

  bool canRegister() {
    return username.isNotEmpty &&
        password.isNotEmpty &&
        confirmPassword.isNotEmpty;
  }

  bool canForgetPassword() {
    return !status.hasErrorInForgotPassword && username.isNotEmpty;
  }

  signUpDefault() {}

  void setPassword(String value) async {
    _validatePassword(value);
    value;
    notifyListeners();
  }

  void setConfirmPassword(String value) {
    _validateConfirmPassword(value);
    notifyListeners();
  }

  void _validatePassword(String value) {
    if (value.isEmpty) {
      passwordMessage = 'empty';
    } else if (value.length < 6) {
      passwordMessage = 'length';
    } else {
      passwordMessage = '';
    }
  }

  void _validateConfirmPassword(String value) {
    if (value.isEmpty) {
      confirmPasswordMessage = "confirm";
    } else if (value == password) {
      confirmPasswordMessage = "match";
    } else {
      confirmPasswordMessage = '';
    }
  }

  String messagePassword(context) {
    switch (passwordMessage) {
      case "confirm":
        return AppLocalizations.of(context).passwordConfirm;
      case "empty":
        return AppLocalizations.of(context).passwordEmpty;
      case "length":
        return AppLocalizations.of(context).passwordLength;
      case "match":
        return AppLocalizations.of(context).passwordMatch;
      default:
        return "";
    }
  }

  message(context) {
    Status(errorMessage: AppLocalizations.of(context).errorUnauthorized);
    switch (status.errorMessage) {
      case "unauthorized":
        Status(errorMessage: AppLocalizations.of(context).errorUnauthorized);
        break;
      case "username":
        return AppLocalizations.of(context).errorUsername;
      default:
        return AppLocalizations.of(context).errorNetwork;
    }
  }

  signIn(context) {
    print('----ssdfsfd---');
   // Status(errorMessage: message(context));
    loggedIn = true;
    /*  AuthServices.login(username, password, rememberMe).then((v) {
      _loggedin(v);
    }); */
    notifyListeners();
  }

  void _loggedin(value) async {
    
  }

  Future register() async {
    const Status(loading: true);
  }

  Future gotoHome() async {
   
  }

  Future forgotPassword() async {
    const Status(loading: true);
  }

  void signUpWithGoogle() async {}

  void signUpWithFacebook() async {}

  void signUpWithApple() async {}

  void signUpWithTwitter() async {}

  Future<void> logout() async {
    const Status(loading: true);
    AuthServices.logout();
   
    const Status(loading: false);
  }

  void signOut() {
    loggedIn =false;
    notifyListeners();
  }
}
