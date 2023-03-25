const GenBase = require('keris/core');

module.exports = class extends GenBase {

    constructor(args, opts) {
        super(args, opts);
        this.appsName = opts.appsName
        this.props = opts
    }

    writeCore(){
        const packageFolder = this.props.appsName

        const flutterDir = '';
        
        this.props._ = this._

        this.template('pubspec.ejs', `${packageFolder}/pubspec.yaml`, this, this.props);
        this.template('README.ejs', `${packageFolder}/README.md`, this, this.props);
        this.template('l10n.yaml', `${packageFolder}/l10n.yaml`);
        this.template(`gitignore`, `${packageFolder}/.gitignore`);


        this.template('pubspec.ejs', `${packageFolder}/pubspec.yaml`, this, this.props);
        this.template('README.ejs', `${packageFolder}/README.md`, this, this.props);
        this.template('l10n.yaml', `${packageFolder}/l10n.yaml`);
        this.template(`gitignore`, `${packageFolder}/.gitignore`);
   
        // add assets
        this.template(`${flutterDir}assets/data/users.json`, `${packageFolder}/assets/data/users.json`);

        this.template(`${flutterDir}assets/fonts/Product-Sans-Bold-Italic.ttf`, `${packageFolder}/assets/fonts/Product-Sans-Bold-Italic.ttf`);
        this.template(`${flutterDir}assets/fonts/Product-Sans-Italic.ttf`, `${packageFolder}/assets/fonts/Product-Sans-Italic.ttf`);
        // this.template(`${flutterDir}assets/fonts/Product-Sans-Regular.ttf`, `${packageFolder}/assets/fonts/Product-Sans-Regular.ttf`);
        
        this.template(`${flutterDir}assets/icons/ic_appicon.png`, `${packageFolder}/assets/icons/ic_appicon.png`);
        this.template(`${flutterDir}assets/icons/ic_launcher.png`, `${packageFolder}/assets/icons/ic_launcher.png`);
        this.template(`${flutterDir}assets/icons/ic_launcher.png`, `${packageFolder}/assets/images/ic_launcher.png`);
        this.template(`${flutterDir}assets/icons/kujang-only.svg`, `${packageFolder}/assets/icons/kujang-only.svg`);
        this.template(`${flutterDir}assets/icons/logo-kujang.svg`, `${packageFolder}/assets/icons/logo-kujang.svg`);

        // Stores
        this.template(`${flutterDir}lib/bloc/auth/auth_bloc.dart`, `${packageFolder}/lib/bloc/auth/auth_bloc.dart`);
        this.template(`${flutterDir}lib/bloc/settings/settings_bloc.dart`, `${packageFolder}/lib/bloc/settings/settings_bloc.dart`);
       
        // Locale
        this.template(`${flutterDir}lib/l10n/app_en.arb`, `${packageFolder}/lib/l10n/app_en.arb`);
        this.template(`${flutterDir}lib/l10n/app_id.arb`, `${packageFolder}/lib/l10n/app_id.arb`);

        // Layout
        this.template(`${flutterDir}lib/layout/desktop.dart`, `${packageFolder}/lib/layout/desktop.dart`);
        this.template(`${flutterDir}lib/layout/mobile.dart`, `${packageFolder}/lib/layout/mobile.dart`);
        this.template(`${flutterDir}lib/layout/web.dart`, `${packageFolder}/lib/layout/web.dart`);

        // Model
       this.template(`${flutterDir}lib/models/app_data.dart`, `${packageFolder}/lib/models/app_data.dart`);

        // Modules
        this.template(`${flutterDir}lib/modules/user/bloc/user_bloc.dart`, `${packageFolder}/lib/modules/user/bloc/user_bloc.dart`);
        this.template(`${flutterDir}lib/modules/user/models/user.dart`, `${packageFolder}/lib/modules/user/models/user.dart`);
 
        this.template(`${flutterDir}lib/modules/user/services/user_routes.dart`, `${packageFolder}/lib/modules/user/services/user_routes.dart`);
        this.template(`${flutterDir}lib/modules/user/services/user_services.dart`, `${packageFolder}/lib/modules/user/services/user_services.dart`);

        this.template(`${flutterDir}lib/modules/user/screens/user_detail.dart`, `${packageFolder}/lib/modules/user/screens/user_detail.dart`);
        this.template(`${flutterDir}lib/modules/user/screens/user_form.dart`, `${packageFolder}/lib/modules/user/screens/user_form.dart`);
        this.template(`${flutterDir}lib/modules/user/screens/user_list.dart`, `${packageFolder}/lib/modules/user/screens/user_list.dart`);

        this.template(`${flutterDir}lib/modules/main_module.dart`, `${packageFolder}/lib/modules/main_module.dart`);
        this.template(`${flutterDir}lib/modules/register_modules.dart`, `${packageFolder}/lib/modules/register_modules.dart`);

        // Views
        this.template(`${flutterDir}lib/screens/about.dart`, `${packageFolder}/lib/screens/about.dart`);
        this.template(`${flutterDir}lib/screens/home.ejs`, `${packageFolder}/lib/screens/home.dart`, this, this.props);
        this.template(`${flutterDir}lib/screens/login.dart`, `${packageFolder}/lib/screens/login.dart`);
        this.template(`${flutterDir}lib/screens/splash.dart`, `${packageFolder}/lib/screens/splash.dart`);

        // Services
        
        this.template(`${flutterDir}lib/services/local/database_services.dart`, `${packageFolder}/lib/services/local/database_services.dart`);
        this.template(`${flutterDir}lib/services/local/database.dart`, `${packageFolder}/lib/services/local/database.dart`);
        this.template(`${flutterDir}lib/services/local/local_db_constants.dart`, `${packageFolder}/lib/services/local/local_db_constants.dart`);

        this.template(`${flutterDir}lib/services/network/rest_services.dart`, `${packageFolder}/lib/services/network/rest_services.dart`);
        this.template(`${flutterDir}lib/services/network/rest_error_util.dart`, `${packageFolder}/lib/services/network/rest_error_util.dart`);

        this.template(`${flutterDir}lib/services/apps_routes.dart`, `${packageFolder}/lib/services/apps_routes.dart`, this, this.props);
        this.template(`${flutterDir}lib/services/apps_services.ejs`, `${packageFolder}/lib/services/apps_services.dart`, this, this.props);
        this.template(`${flutterDir}lib/services/auth_jwt_services.dart`, `${packageFolder}/lib/services/auth_jwt_services.dart`);
        this.template(`${flutterDir}lib/services/navigation.dart`, `${packageFolder}/lib/services/navigation.dart`);
       
        // Utils
        this.template(`${flutterDir}lib/utils/encryption/xxtea.dart`, `${packageFolder}/lib/utils/encryption/xxtea.dart`);

        this.template(`${flutterDir}lib/utils/modules/modules_registry.dart`, `${packageFolder}/lib/utils/modules/modules_registry.dart`);
        this.template(`${flutterDir}lib/utils/modules/modules.dart`, `${packageFolder}/lib/utils/modules/modules.dart`);
        this.template(`${flutterDir}lib/utils/modules/module.dart`, `${packageFolder}/lib/utils/modules/module.dart`);

        // Themes
        this.template(`${flutterDir}lib/utils/themes/material_theme_colors.dart`, `${packageFolder}/lib/utils/themes/material_theme_colors.dart`);
        this.template(`${flutterDir}lib/utils/themes/theme_services.dart`, `${packageFolder}/lib/utils/themes/theme_services.dart`);
         
        this.template(`${flutterDir}lib/utils/config.ejs`, `${packageFolder}/lib/utils/config.dart`, this, this.props);
        this.template(`${flutterDir}lib/utils/helper.dart`, `${packageFolder}/lib/utils/helper.dart`);
        this.template(`${flutterDir}lib/utils/routes.dart`, `${packageFolder}/lib/utils/routes.dart`);
      
        // Widgets
        this.template(`${flutterDir}lib/widgets/alert_widget.dart`, `${packageFolder}/lib/widgets/alert_widget.dart`);
        this.template(`${flutterDir}lib/widgets/appbar_widget.dart`, `${packageFolder}/lib/widgets/appbar_widget.dart`);
        this.template(`${flutterDir}lib/widgets/bottom_bar_widget.dart`, `${packageFolder}/lib/widgets/bottom_bar_widget.dart`);
        this.template(`${flutterDir}lib/widgets/button_widget.dart`, `${packageFolder}/lib/widgets/button_widget.dart`);
        this.template(`${flutterDir}lib/widgets/drawer_widget.ejs`, `${packageFolder}/lib/widgets/drawer_widget.dart`, this, this.props);
        this.template(`${flutterDir}lib/widgets/empty_app_bar_widget.dart`, `${packageFolder}/lib/widgets/empty_app_bar_widget.dart`);
        this.template(`${flutterDir}lib/widgets/global_methods.dart`, `${packageFolder}/lib/widgets/global_methods.dart`);
        this.template(`${flutterDir}lib/widgets/textfield_widget.dart`, `${packageFolder}/lib/widgets/textfield_widget.dart`);

        this.template(`${flutterDir}lib/main.dart`, `${packageFolder}/lib/main.dart`);

        // macos
        this.template(`${flutterDir}macos/Runner/DebugProfile.entitlements`, `${packageFolder}/macos/Runner/DebugProfile.entitlements`);
        this.template(`${flutterDir}macos/Runner/Release.entitlements`, `${packageFolder}/macos/Runner/Release.entitlements`);

    }
}