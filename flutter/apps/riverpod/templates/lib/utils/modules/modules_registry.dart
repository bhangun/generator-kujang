import 'package:flutter/material.dart';

import '../../modules/register_modules.dart';
import '../routes.dart';
import 'modules.dart';

class ModulesRegistry {
  // singleton object
  static final ModulesRegistry _singleton = ModulesRegistry._();

  // factory method to return the same object each time its needed
  factory ModulesRegistry() => _singleton;

  ModulesRegistry._();

  static routes() {
    registerModules().forEach((m) {
       m.pages().forEach((p) {
        Modules.addPages(p);
      });

      Routes.addRoutes(m.goroutes());
      m.services();
    });
  }

}
