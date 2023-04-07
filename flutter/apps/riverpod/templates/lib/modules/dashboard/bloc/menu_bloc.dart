import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final menuBloc = ChangeNotifierProvider((ref) => MenuBloc());

class MenuBloc extends ChangeNotifier {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  GlobalKey<ScaffoldState> get scaffoldKey => _scaffoldKey;

  void controlMenu() {
    if (!_scaffoldKey.currentState!.isDrawerOpen) {
      _scaffoldKey.currentState!.openDrawer();
    }
  }
}
