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
        this.template(`gitignore`, `${packageFolder}/.gitignore`);
        this.template(`run_update_locale`, `${packageFolder}/run_update_locale`);

        // Unit Test & Integration test
        this.template('integration_test/main_test.ejs', `${packageFolder}/integration_test/main_test.ejs`, this, this.props);
        this.template('test/widget_test.ejs', `${packageFolder}/test/widget_test.dart`, this, this.props);
   
        // add assets
        this.template(`${flutterDir}lib/data/users.json`, `${packageFolder}/lib/data/users.json`);
        this.template(`${flutterDir}lib/data/menu_data.ejs`, `${packageFolder}/lib/data/menu_data.dart`, this, this.props);

        this.template(`${flutterDir}assets/fonts/Product-Sans-Bold-Italic.ttf`, `${packageFolder}/assets/fonts/Product-Sans-Bold-Italic.ttf`);
        this.template(`${flutterDir}assets/fonts/Product-Sans-Italic.ttf`, `${packageFolder}/assets/fonts/Product-Sans-Italic.ttf`);
        
        this.template(`${flutterDir}assets/icons/ic_appicon.png`, `${packageFolder}/assets/icons/ic_appicon.png`);
        this.template(`${flutterDir}assets/icons/ic_launcher.png`, `${packageFolder}/assets/icons/ic_launcher.png`);
        this.template(`${flutterDir}assets/icons/ic_launcher.png`, `${packageFolder}/assets/images/ic_launcher.png`);
        this.template(`${flutterDir}assets/icons/kujang-only.svg`, `${packageFolder}/assets/icons/kujang-only.svg`);
        this.template(`${flutterDir}assets/icons/logo-kujang.svg`, `${packageFolder}/assets/icons/logo-kujang.svg`);

        // Stores
        this.template(`${flutterDir}lib/bloc/auth/auth_bloc.dart`, `${packageFolder}/lib/bloc/auth/auth_bloc.dart`);
        this.template(`${flutterDir}lib/bloc/settings/settings_bloc.dart`, `${packageFolder}/lib/bloc/settings/settings_bloc.dart`);
       
        // Locale
        this.template(`${flutterDir}lib/l10n/app_en.ejs`, `${packageFolder}/lib/l10n/app_en.arb`, this, this.props);
        this.template(`${flutterDir}lib/l10n/app_id.ejs`, `${packageFolder}/lib/l10n/app_id.arb`, this, this.props);

        // Model
        this.template(`${flutterDir}lib/models/app_data.dart`, `${packageFolder}/lib/models/app_data.dart`);
        this.template(`${flutterDir}lib/models/status.dart`, `${packageFolder}/lib/models/status.dart`);

        // Modules
        /// Module Dashboard
        this.template(`${flutterDir}lib/modules/dashboard/bloc/menu_bloc.dart`, `${packageFolder}/lib/modules/dashboard/bloc/menu_bloc.dart`);
        
        this.template(`${flutterDir}lib/modules/dashboard/models/header.dart`, `${packageFolder}/lib/modules/dashboard/models/header.dart`);
        this.template(`${flutterDir}lib/modules/dashboard/models/header.g.dart`, `${packageFolder}/lib/modules/dashboard/models/header.g.dart`);
        this.template(`${flutterDir}lib/modules/dashboard/models/sidemenumodel.dart`, `${packageFolder}/lib/modules/dashboard/models/sidemenumodel.dart`);
        this.template(`${flutterDir}lib/modules/dashboard/models/sidemenumodel.g.dart`, `${packageFolder}/lib/modules/dashboard/models/sidemenumodel.g.dart`);

        this.template(`${flutterDir}lib/modules/dashboard/pages/dashboard.dart`, `${packageFolder}/lib/modules/dashboard/pages/dashboard.dart`);
        this.template(`${flutterDir}lib/modules/dashboard/pages/header_appbar.dart`, `${packageFolder}/lib/modules/dashboard/pages/header_appbar.dart`);
        this.template(`${flutterDir}lib/modules/dashboard/pages/header_base.dart`, `${packageFolder}/lib/modules/dashboard/pages/header_base.dart`);
        this.template(`${flutterDir}lib/modules/dashboard/pages/main_screen.dart`, `${packageFolder}/lib/modules/dashboard/pages/main_screen.dart`);
        
        this.template(`${flutterDir}lib/modules/dashboard/widgets/side_menu_item_widget.dart`, `${packageFolder}/lib/modules/dashboard/widgets/side_menu_item_widget.dart`);
        this.template(`${flutterDir}lib/modules/dashboard/widgets/side_menu_widget.dart`, `${packageFolder}/lib/modules/dashboard/widgets/side_menu_widget.dart`);
        
        /// Module User
        this.template(`${flutterDir}lib/modules/user/bloc/user_bloc.dart`, `${packageFolder}/lib/modules/user/bloc/user_bloc.dart`);
        this.template(`${flutterDir}lib/modules/user/models/user.dart`, `${packageFolder}/lib/modules/user/models/user.dart`);
 
        this.template(`${flutterDir}lib/modules/user/services/user_services.dart`, `${packageFolder}/lib/modules/user/services/user_services.dart`);

        this.template(`${flutterDir}lib/modules/user/pages/user_detail.dart`, `${packageFolder}/lib/modules/user/pages/user_detail.dart`);
        this.template(`${flutterDir}lib/modules/user/pages/user_form.dart`, `${packageFolder}/lib/modules/user/pages/user_form.dart`);
        this.template(`${flutterDir}lib/modules/user/pages/user_list.dart`, `${packageFolder}/lib/modules/user/pages/user_list.dart`);
        this.template(`${flutterDir}lib/modules/user/user_module.dart`, `${packageFolder}/lib/modules/user/user_module.dart`);
        this.template(`${flutterDir}lib/modules/user/user_routes.dart`, `${packageFolder}/lib/modules/user/user_routes.dart`);


        this.template(`${flutterDir}lib/modules/register_modules.dart`, `${packageFolder}/lib/modules/register_modules.dart`);

        // Views
        this.template(`${flutterDir}lib/pages/about.dart`, `${packageFolder}/lib/pages/about.dart`);
        this.template(`${flutterDir}lib/pages/home.ejs`, `${packageFolder}/lib/pages/home.dart`, this, this.props);
        this.template(`${flutterDir}lib/pages/login.dart`, `${packageFolder}/lib/pages/login.dart`);
        this.template(`${flutterDir}lib/pages/splash.dart`, `${packageFolder}/lib/pages/splash.dart`);

        // Services
        this.template(`${flutterDir}lib/services/local_database/db_services.dart`, `${packageFolder}/lib/services/local_database/db_services.dart`);
        this.template(`${flutterDir}lib/services/local_database/db_encryption.dart`, `${packageFolder}/lib/services/local_database/db_encryption.dart`);
        this.template(`${flutterDir}lib/services/local_database/db.dart`, `${packageFolder}/lib/services/local_database/db.dart`);

        this.template(`${flutterDir}lib/services/rest/rest_services.dart`, `${packageFolder}/lib/services/rest/rest_services.dart`);
        this.template(`${flutterDir}lib/services/rest/rest_error_util.dart`, `${packageFolder}/lib/services/rest/rest_error_util.dart`);

        this.template(`${flutterDir}lib/services/apps_services.ejs`, `${packageFolder}/lib/services/apps_services.dart`, this, this.props);
        this.template(`${flutterDir}lib/services/auth_jwt_services.dart`, `${packageFolder}/lib/services/auth_jwt_services.dart`);
        //this.template(`${flutterDir}lib/services/navigation.dart`, `${packageFolder}/lib/services/navigation.dart`);
       
        // Utils
        this.template(`${flutterDir}lib/utils/modules/modules_registry.dart`, `${packageFolder}/lib/utils/modules/modules_registry.dart`);
        this.template(`${flutterDir}lib/utils/modules/module_model.dart`, `${packageFolder}/lib/utils/modules/module_model.dart`);
        this.template(`${flutterDir}lib/utils/modules/modules.dart`, `${packageFolder}/lib/utils/modules/modules.dart`);
        this.template(`${flutterDir}lib/utils/modules/menu.dart`, `${packageFolder}/lib/utils/modules/menu.dart`);
        this.template(`${flutterDir}lib/utils/modules/menu.g.dart`, `${packageFolder}/lib/utils/modules/menu.g.dart`);
       
        // Themes
        this.template(`${flutterDir}lib/utils/themes/material_colors.dart`, `${packageFolder}/lib/utils/themes/material_colors.dart`);
        this.template(`${flutterDir}lib/utils/themes/color_scheme.dart`, `${packageFolder}/lib/utils/themes/color_scheme.dart`);
        this.template(`${flutterDir}lib/utils/themes/app_theme.dart`, `${packageFolder}/lib/utils/themes/app_theme.dart`);
        this.template(`${flutterDir}lib/utils/themes/README.md`, `${packageFolder}/lib/utils/themes/README.md`);
         
        this.template(`${flutterDir}lib/utils/config.ejs`, `${packageFolder}/lib/utils/config.dart`, this, this.props);
        this.template(`${flutterDir}lib/utils/helper.dart`, `${packageFolder}/lib/utils/helper.dart`);
        this.template(`${flutterDir}lib/utils/routes.dart`, `${packageFolder}/lib/utils/routes.dart`);
        this.template(`${flutterDir}lib/utils/constants.dart`, `${packageFolder}/lib/utils/constants.dart`);
      
        // Widgets
        this.template(`${flutterDir}lib/widgets/admin_adaptive/admin_adaptive.dart`, `${packageFolder}/lib/widgets/admin_adaptive/admin_adaptive.dart`);
        this.template(`${flutterDir}lib/widgets/admin_adaptive/admin_phone.dart`, `${packageFolder}/lib/widgets/admin_adaptive/admin_phone.dart`);
        this.template(`${flutterDir}lib/widgets/admin_adaptive/side_menu_fold.dart`, `${packageFolder}/lib/widgets/admin_adaptive/side_menu_fold.dart`);
        this.template(`${flutterDir}lib/widgets/admin_adaptive/side_menu.dart`, `${packageFolder}/lib/widgets/admin_adaptive/side_menu.dart`);
        
        this.template(`${flutterDir}lib/widgets/buttons/button_widget.dart`, `${packageFolder}/lib/widgets/buttons/button_widget.dart`);
        
        this.template(`${flutterDir}lib/widgets/form/date_picker.dart`, `${packageFolder}/lib/widgets/form/date_picker.dart`);
        this.template(`${flutterDir}lib/widgets/form/textfield_widget.dart`, `${packageFolder}/lib/widgets/form/textfield_widget.dart`);
       
        this.template(`${flutterDir}lib/widgets/transitions/fade_transition.dart`, `${packageFolder}/lib/widgets/transitions/fade_transition.dart`);
        
        this.template(`${flutterDir}lib/widgets/alert_widget.dart`, `${packageFolder}/lib/widgets/alert_widget.dart`);
        this.template(`${flutterDir}lib/widgets/appbar_widget.dart`, `${packageFolder}/lib/widgets/appbar_widget.dart`);
        this.template(`${flutterDir}lib/widgets/bottom_bar_widget.dart`, `${packageFolder}/lib/widgets/bottom_bar_widget.dart`);
        
        
       // this.template(`${flutterDir}lib/widgets/drawer_widget.ejs`, `${packageFolder}/lib/widgets/drawer_widget.dart`, this, this.props);
        this.template(`${flutterDir}lib/widgets/empty_app_bar_widget.dart`, `${packageFolder}/lib/widgets/empty_app_bar_widget.dart`);
        this.template(`${flutterDir}lib/widgets/global_methods.dart`, `${packageFolder}/lib/widgets/global_methods.dart`);
        this.template(`${flutterDir}lib/widgets/progress_indicator_widget.dart`, `${packageFolder}/lib/widgets/progress_indicator_widget.dart`);
        this.template(`${flutterDir}lib/widgets/dropdown_widget.dart`, `${packageFolder}/lib/widgets/dropdown_widget.dart`);
        this.template(`${flutterDir}lib/widgets/profile_widget.dart`, `${packageFolder}/lib/widgets/profile_widget.dart`);


        // Root 
        this.template(`${flutterDir}lib/main.dart`, `${packageFolder}/lib/main.dart`);
        this.template(`${flutterDir}lib/main_module.dart`, `${packageFolder}/lib/main_module.dart`);
        this.template(`${flutterDir}lib/main_routes.dart`, `${packageFolder}/lib/main_routes.dart`);

        // macos
        this.template(`${flutterDir}macos/Runner/DebugProfile.entitlements`, `${packageFolder}/macos/Runner/DebugProfile.entitlements`);
        this.template(`${flutterDir}macos/Runner/Release.entitlements`, `${packageFolder}/macos/Runner/Release.entitlements`);

    }
}