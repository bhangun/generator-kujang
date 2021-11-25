/**
 * Copyright 2013-2021 the original author or authors Bhangun Hartani
 * This file is part of the Kujang Generator
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = {
    writeFiles
};

function writeFiles(props, obj) {

    console.log('-----------riverpod---11-------')
    
    const packageFolder = props.appsName

    const flutterDir = '';
   
    return {

        writeGlobalFiles() {
            obj.template('pubspec.ejs', `${packageFolder}/pubspec.yaml`, this, props);
            obj.template('README.ejs', `${packageFolder}/README.md`, this, props);
            obj.template('l10n.yaml', `${packageFolder}/l10n.yaml`);
            obj.template(`gitignore`, `${packageFolder}/.gitignore`);
       
            // add assets
            obj.template(`${flutterDir}assets/data/users.json`, `${packageFolder}/assets/data/users.json`);

            obj.template(`${flutterDir}assets/fonts/Product-Sans-Bold-Italic.ttf`, `${packageFolder}/assets/fonts/Product-Sans-Bold-Italic.ttf`);
            obj.template(`${flutterDir}assets/fonts/Product-Sans-Italic.ttf`, `${packageFolder}/assets/fonts/Product-Sans-Italic.ttf`);
            obj.template(`${flutterDir}assets/fonts/Product-Sans-Regular.ttf`, `${packageFolder}/assets/fonts/Product-Sans-Regular.ttf`);
            
            obj.template(`${flutterDir}assets/icons/ic_appicon.png`, `${packageFolder}/assets/icons/ic_appicon.png`);
            obj.template(`${flutterDir}assets/icons/ic_launcher.png`, `${packageFolder}/assets/icons/ic_launcher.png`);
            obj.template(`${flutterDir}assets/icons/ic_launcher.png`, `${packageFolder}/assets/images/ic_launcher.png`);
            obj.template(`${flutterDir}assets/icons/kujang-only.svg`, `${packageFolder}/assets/icons/kujang-only.svg`);
            obj.template(`${flutterDir}assets/icons/logo-kujang.svg`, `${packageFolder}/assets/icons/logo-kujang.svg`);

            // Stores
            obj.template(`${flutterDir}lib/bloc/auth/auth_bloc.dart`, `${packageFolder}/lib/bloc/auth/auth_bloc.dart`);
            obj.template(`${flutterDir}lib/bloc/settings/settings_bloc.dart`, `${packageFolder}/lib/bloc/settings/settings_bloc.dart`);
           
            // Locale
            obj.template(`${flutterDir}lib/l10n/app_en.arb`, `${packageFolder}/lib/l10n/app_en.arb`);
            obj.template(`${flutterDir}lib/l10n/app_id.arb`, `${packageFolder}/lib/l10n/app_id.arb`);

            // Layout
            obj.template(`${flutterDir}lib/layout/desktop.dart`, `${packageFolder}/lib/layout/desktop.dart`);
            obj.template(`${flutterDir}lib/layout/mobile.dart`, `${packageFolder}/lib/layout/mobile.dart`);
            obj.template(`${flutterDir}lib/layout/web.dart`, `${packageFolder}/lib/layout/web.dart`);

            // Model
            obj.template(`${flutterDir}lib/models/app_data.dart`, `${packageFolder}/lib/models/app_data.dart`);

            // Modules
            obj.template(`${flutterDir}lib/modules/user/bloc/user_bloc.dart`, `${packageFolder}/lib/modules/account/bloc/user_bloc.dart`);
            obj.template(`${flutterDir}lib/modules/user/models/user_model.dart`, `${packageFolder}/lib/modules/account/models/user_model.dart`);
            obj.template(`${flutterDir}lib/modules/user/models/user_profile.dart`, `${packageFolder}/lib/modules/account/models/user_profile.dart`);

            obj.template(`${flutterDir}lib/modules/user/services/user_routes.dart`, `${packageFolder}/lib/modules/account/services/user_routes.dart`);
            obj.template(`${flutterDir}lib/modules/user/services/user_services.dart`, `${packageFolder}/lib/modules/account/services/user_services.dart`);

            obj.template(`${flutterDir}lib/modules/user/screens/user_detail.dart`, `${packageFolder}/lib/modules/account/screens/user_detail.dart`);
            obj.template(`${flutterDir}lib/modules/user/screens/user_form.dart`, `${packageFolder}/lib/modules/account/screens/user_form.dart`);
            obj.template(`${flutterDir}lib/modules/user/screens/user_list.dart`, `${packageFolder}/lib/modules/account/screens/user_list.dart`);

            obj.template(`${flutterDir}lib/modules/main_module.dart`, `${packageFolder}/lib/modules/main_module.dart`);
            obj.template(`${flutterDir}lib/modules/register_modules.dart`, `${packageFolder}/lib/modules/register_modules.dart`);

            // Views
            obj.template(`${flutterDir}lib/screens/about.dart`, `${packageFolder}/lib/screens/about.dart`);
            obj.template(`${flutterDir}lib/screens/home.ejs`, `${packageFolder}/lib/screens/home.dart`, this, props);
            obj.template(`${flutterDir}lib/screens/login.dart`, `${packageFolder}/lib/screens/login.dart`);
            obj.template(`${flutterDir}lib/screens/splash.dart`, `${packageFolder}/lib/screens/splash.dart`);

            // Services
            obj.template(`${flutterDir}lib/services/local/database_services.dart`, `${packageFolder}/lib/services/local/database_services.dart`);
            obj.template(`${flutterDir}lib/services/local/database.dart`, `${packageFolder}/lib/services/local/database.dart`);
            obj.template(`${flutterDir}lib/services/local/local_db_constants.dart`, `${packageFolder}/lib/services/local/local_db_constants.dart`);

            obj.template(`${flutterDir}lib/services/network/rest_services.dart`, `${packageFolder}/lib/services/network/rest_services.dart`);
            obj.template(`${flutterDir}lib/services/network/rest_error_util.dart`, `${packageFolder}/lib/services/network/rest_error_util.dart`);
            obj.template(`${flutterDir}lib/services/apps_routes.dart`, `${packageFolder}/lib/services/apps_routes.dart`, this, this.props);
            obj.template(`${flutterDir}lib/services/apps_services.ejs`, `${packageFolder}/lib/services/apps_services.dart`, this, props);
            obj.template(`${flutterDir}lib/services/auth_jwt_services.dart`, `${packageFolder}/lib/services/auth_jwt_services.dart`);
            obj.template(`${flutterDir}lib/services/navigation.dart`, `${packageFolder}/lib/services/navigation.dart`);
           
            // Utils
            obj.template(`${flutterDir}lib/utils/encryption/xxtea.dart`, `${packageFolder}/lib/utils/encryption/xxtea.dart`);

            obj.template(`${flutterDir}lib/utils/modules/modules_registry.dart`, `${packageFolder}/lib/utils/modules/modules_registry.dart`);
            obj.template(`${flutterDir}lib/utils/modules/modules.dart`, `${packageFolder}/lib/utils/modules/modules.dart`);
            obj.template(`${flutterDir}lib/utils/modules/module.dart`, `${packageFolder}/lib/utils/modules/module.dart`);

            // Themes
            obj.template(`${flutterDir}lib/utils/themes/material_theme_colors.dart`, `${packageFolder}/lib/utils/themes/material_theme_colors.dart`);
            obj.template(`${flutterDir}lib/utils/themes/theme_services.dart`, `${packageFolder}/lib/utils/themes/theme_services.dart`);
             
            obj.template(`${flutterDir}lib/utils/config.ejs`, `${packageFolder}/lib/utils/config.dart`, this, props);
            obj.template(`${flutterDir}lib/utils/helper.dart`, `${packageFolder}/lib/utils/helper.dart`);
            obj.template(`${flutterDir}lib/utils/routes.dart`, `${packageFolder}/lib/utils/routes.dart`);
          
            // Widgets
            obj.template(`${flutterDir}lib/widgets/alert_widget.dart`, `${packageFolder}/lib/widgets/alert_widget.dart`);
            obj.template(`${flutterDir}lib/widgets/appbar_widget.dart`, `${packageFolder}/lib/widgets/appbar_widget.dart`);
            obj.template(`${flutterDir}lib/widgets/bottom_bar_widget.dart`, `${packageFolder}/lib/widgets/bottom_bar_widget.dart`);
            obj.template(`${flutterDir}lib/widgets/button_widget.dart`, `${packageFolder}/lib/widgets/button_widget.dart`);
            obj.template(`${flutterDir}lib/widgets/drawer_widget.ejs`, `${packageFolder}/lib/widgets/drawer_widget.dart`, this, props);
            obj.template(`${flutterDir}lib/widgets/empty_app_bar_widget.dart`, `${packageFolder}/lib/widgets/empty_app_bar_widget.dart`);
            obj.template(`${flutterDir}lib/widgets/global_methods.dart`, `${packageFolder}/lib/widgets/global_methods.dart`);
            obj.template(`${flutterDir}lib/widgets/textfield_widget.dart`, `${packageFolder}/lib/widgets/textfield_widget.dart`);

            obj.template(`${flutterDir}lib/main.dart`, `${packageFolder}/lib/main.dart`);

            // macos
            obj.template(`${flutterDir}macos/Runner/DebugProfile.entitlements`, `${packageFolder}/macos/Runner/DebugProfile.entitlements`);
            obj.template(`${flutterDir}macos/Runner/Release.entitlements`, `${packageFolder}/macos/Runner/Release.entitlements`);

            // test
        }
    };
}
