import '../../utils/modules/menu.dart';
import '../../utils/modules/module_model.dart';
import 'user_routes.dart';

class UserModule implements Module {
  @override
  String? name = 'User';

  @override
  pages() {
    return [
      Menu(title: '', path: UserRoutes.detail),
      /* p.Page(title: 'User Form', path: UserRoutes.userForm),
      p.Page(
          title: 'User List',
          path: UserRoutes.userList,
          showInDrawer: true,
          showInHome: true) */
    ];
  }

  @override
  services() {}

  @override
  goroutes() => UserRoutes.goroutes;

  @override
  String? baseRoute = '';
}
