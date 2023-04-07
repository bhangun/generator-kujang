import 'package:go_router/go_router.dart';

import '../dashboard/pages/dashboard.dart';
import '../../utils/routes.dart';

class DashboardRoutes {
  DashboardRoutes._();
  static String dashboard = '/dashboard';

  static final List<GoRoute> goroutes = <GoRoute>[
    Routes.pageFadeTrans(dashboard, const DashboardPage()),
  ];
}
