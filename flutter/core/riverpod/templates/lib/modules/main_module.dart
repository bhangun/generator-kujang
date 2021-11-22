
import '../services/apps_routes.dart';

import '../utils/modules/module.dart';
import 'user/services/user_routes.dart';

class MainModule implements Module {
  @override
  String? name = 'Main';

  @override
  pages() => [
        Page(title: 'User Detail', route: UserRoutes.userDetail),
        Page(title: 'User Form', route: UserRoutes.userForm),
        Page(
            title: 'User List',
            route: UserRoutes.userList,
            showInDrawer: true,
            showInHome: true)
      ];

  @override
  services() {}



  @override
  routes() => [AppsRoutes.routes, UserRoutes.routes];
}
