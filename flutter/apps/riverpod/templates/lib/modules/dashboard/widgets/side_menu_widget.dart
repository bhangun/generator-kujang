import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../models/sidemenumodel.dart';
import 'side_menu_item_widget.dart';

class SideMenu extends StatelessWidget {
  const SideMenu({
    Key? key, required this.data,
  }) : super(key: key);
  final SideMenuModel data; 

  @override
  Widget build(BuildContext context) {
    return Drawer(
      elevation: 0,
      child: ListView(
        children: [
          DrawerHeader(
            child: Image.asset(data.header!.logo!),
          ),
          for (var e in data.menu!) SideMenuItem(
            title: e.title!,
            svgSrc: e.icon!,
            press: ()=> context.go(e.path!),
          ) 
        ],
      ),
    );
  }
}

