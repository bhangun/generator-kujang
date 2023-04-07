import 'package:go_router/go_router.dart';

import 'menu.dart';


abstract class Module {
  String? name;
  String? baseRoute;
  List<Menu> pages();
  void services();
  List<GoRoute> goroutes();
}
