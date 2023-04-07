

import 'modules/menu.dart';

class Menus {
  // singleton object
  static final Menus _singleton = Menus._();

  // factory method to return the same object each time its needed
  factory Menus() => _singleton;

  Menus._();

  static final List<Menu> _menus = [];

  static get routes => _menus;

  static addRoutes(List<Menu> menus) {
    _menus.addAll(menus);
  }
}