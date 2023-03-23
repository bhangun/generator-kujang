
import 'package:<%= appsName %>/utils/routes.dart';
import 'package:<%= appsName %>/utils/modules/module.dart';
import 'package:<%= appsName %>/modules/user/services/user_routes.dart';

import 'services/user_services.dart';

class UserModule implements Module {
  @override
  String? name = 'User';

  @override
  pages() {
    return [
      Page(title: 'User Detail', route: UserRoutes.userDetail),
      Page(title: 'User Form', route: UserRoutes.userForm),
      Page(
          title: 'User List',
          route: UserRoutes.userList,
          showInDrawer: true,
          showInHome: true)
    ];
  }

  @override
  services() {}

  @override
  routes() =>[UserRoutes.routes];
  

  @override
  providers() {
    return [
      
    ];
  }
}
