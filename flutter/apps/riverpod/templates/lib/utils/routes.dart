import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../main_routes.dart';
import '../pages/about.dart';
import '../pages/home.dart';
import '../pages/login.dart';
import '../bloc/auth/auth_bloc.dart';
import '../widgets/transitions/fade_transition.dart';

class Routes {
  static final Routes _singleton = Routes._();
  Routes._();

  factory Routes() => _singleton;

  static final List<GoRoute> _goroutes = [];

  static Future<Routes> get instance async {
    _goroutes.addAll(MainRoutes.goroutes);
    return _singleton;
  }

  static get routes => _goroutes;

  /* static addRoutes(List<RouteBase> newRoutes) {
    _goroutes.addAll(newRoutes);
  } */

  static addRoutes(List<GoRoute> newRoutes) {
    _goroutes.addAll(newRoutes);
  }

  static GoRouter config(
          {WidgetRef? ref,
          String? initial,
          bool debugLog = true,
          bool isLoggedIn = true}) =>
      GoRouter(
        navigatorKey: GlobalKey<NavigatorState>(),
        initialLocation: initial,
        routes: <RouteBase>[
           GoRoute(
            builder: (BuildContext context, GoRouterState state) =>  AboutPage(),

            path: MainRoutes.main,
          ),
          GoRoute(
            builder: (BuildContext context, GoRouterState state) {
              return const LoginPage();
            },

            path: MainRoutes.login,
          ),
          ShellRoute(
            builder: (BuildContext context, GoRouterState state, Widget child) {
             return HomePage(child: child);
            },
            routes: _goroutes,
          )
        ],
 
        debugLogDiagnostics: debugLog,
        // redirect to the login page if the user is not logged in
        redirect: (BuildContext context, GoRouterState state) {
          // 
          ref!.watch(authBloc.select((value) => value.loggedIn));
 
          // if the user is not logged in, they need to login
          final bool loggedIn = isLoggedIn;
         // final bool loggedIn = state.subloc == MainRoutes.login;
          if (!loggedIn) {
            return MainRoutes.login;
          }

          // if the user is logged in but still on the login page, send them to
          // the home page
          if (loggedIn && state.subloc != '/') {
            return state.subloc;
          } else {
            return MainRoutes.home;
          }
        },

        // changes on the listenable will cause the router to refresh it's route
        //refreshListenable: _loginInfo,
      );

  static GoRoute page(String path, Widget page) {
    return GoRoute(
      path: path,
      builder: (context, state) => page,
    );
  }

  static GoRoute pageNoTrans(String path, Widget page) {
    return GoRoute(
      path: path,
      pageBuilder: (context, state) => NoTransitionPage(
        child: page,
      ),
    );
  }

  static GoRoute pageFadeTrans(String path, Widget page) {
    return GoRoute(
      path: path,
      pageBuilder: (context, state) => FadeTransitionPage(child: page),
    );
  }

  ///  GoRoute(
  ///      path: '/book/:bookId',
  ///      redirect: (BuildContext context, GoRouterState state) =>
  ///          '/books/all/${state.params['bookId']}',)
  static GoRoute pageRedirect(String path, Widget page) {
    return GoRoute(
      path: path,
      redirect: (BuildContext context, GoRouterState state) =>
          '/books/all/${state.params['bookId']}',
    );
  }
}
