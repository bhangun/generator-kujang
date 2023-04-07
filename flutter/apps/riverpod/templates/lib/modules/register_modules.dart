import '../main_module.dart';
import '../utils/modules/module_model.dart';
import 'user/user_module.dart';

List<Module> registerModules(){
  return [
    MainModule(),
    UserModule(),
  ];
}