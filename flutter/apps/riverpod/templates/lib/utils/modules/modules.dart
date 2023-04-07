

import 'menu.dart';

class Modules {
    // singleton object
  static final Modules _singleton = Modules._();

  // factory method to return the same object each time its needed
  factory Modules() => _singleton;

  Modules._();
  
  static final _pages  = <Menu>[];

  static addPages(Menu newPages){
    _pages.add(newPages);
  }

  static List<Menu> get pages => _pages;
}
