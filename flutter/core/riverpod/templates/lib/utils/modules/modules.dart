import 'module.dart';

class Modules {
  static final _pages  = <Page>[];

  static addPages(Page newPages){
    _pages.add(newPages);
  }

  static List<Page> get pages => _pages;
}
