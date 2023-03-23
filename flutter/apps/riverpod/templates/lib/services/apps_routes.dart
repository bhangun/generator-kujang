import 'package:flutter/material.dart';
import '../screens/about.dart';
import '../screens/home.dart';
import '../screens/login.dart';
import '../screens/splash.dart';

class AppsRoutes {
  AppsRoutes._();

  static const String splash = '/splash';
  static const String login = '/login';
  static const String home = '/home';
  static const String about = '/about';
  static const String register = '/register';
  static const String forgotPassword = '/forgot_password';

  static final routes = <String, WidgetBuilder>{
    splash: (BuildContext context) => const SplashScreen(),
    login: (BuildContext context) => const LoginScreen(),
    home: (BuildContext context) => HomeScreen(),
    about: (BuildContext context) => AboutPage(),
  };
}
