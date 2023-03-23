import 'package:<%= appsName %>/modules/register_modules.dart';
import 'package:logging/logging.dart';

import '../routes.dart';
import 'modules.dart';

class ModulesRegistry {
  final log = Logger('AuthBloc');
  // singleton object
  static final ModulesRegistry _singleton = ModulesRegistry._();

  // factory method to return the same object each time its needed
  factory ModulesRegistry() =>  _singleton;

  ModulesRegistry._();
 
  static registry(){
    registerModules().forEach((m){
        m.pages().forEach((p){
          p.name = m.name;
          Modules.addPages(p);
        });
    
        m.routes().forEach((r) {
          RoutesService.addRoutes(r);
        });
        m.services();
    });
  }
}