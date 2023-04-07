
import 'utils/modules/menu.dart';
import 'main_routes.dart';
import 'utils/modules/module_model.dart';


class MainModule implements Module {

  @override
  String? name = 'Apps';

  @override
  String? baseRoute = '';

  @override
  pages() => [
        Menu(title: '', path: MainRoutes.home),
        Menu(title: '', path: MainRoutes.about),
      ];

  @override
  services() {}

  @override
  goroutes() => MainRoutes.goroutes;
}
