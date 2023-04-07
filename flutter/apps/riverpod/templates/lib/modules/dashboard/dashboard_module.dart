
import '../../utils/modules/menu.dart';
import '../../utils/modules/module_model.dart';
import 'dashboard_routes.dart';


class DashboardModule implements Module {

  @override
  String? name = 'Dashboard';

  @override
  String? baseRoute = '/dashboard';

  @override
  pages() => [
        Menu(title: '', path: DashboardRoutes.dashboard),
      ];

  @override
  services() {}

  @override
  goroutes() => DashboardRoutes.goroutes;
}
