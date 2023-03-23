// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'bloc/settings/settings_bloc.dart';
import 'services/apps_routes.dart';
import 'services/navigation.dart';
import 'utils/modules/modules_registry.dart';
import 'utils/routes.dart';
import 'utils/themes/theme_services.dart';

Future<void> main() async {
  // Initialized
  WidgetsFlutterBinding.ensureInitialized();

  // Register all module
  ModulesRegistry.registry();

  // Run main app
  runApp(const ProviderScope(child: KujangApp()));
}

class KujangApp extends ConsumerWidget {
  const KujangApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final _settingsBloc = ref.watch(settingsBloc);
    List<Locale> _supportedLocales = ref.read(settingsBloc).supportedLocales; 

    return MaterialApp(
      key: GlobalKey<NavigatorState>(),
      theme: ThemeServices.lightTheme(),
      darkTheme: ThemeServices.darkTheme(),
      themeMode: _settingsBloc.isLightTheme ? ThemeMode.light:ThemeMode.dark ,
      routes: RoutesService.routes,
      initialRoute: AppsRoutes.splash,
      navigatorKey: NavigationServices.navigatorKey,
      debugShowCheckedModeBanner: false,
      locale: _settingsBloc.locale,
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: _supportedLocales,
    );
  }
}
