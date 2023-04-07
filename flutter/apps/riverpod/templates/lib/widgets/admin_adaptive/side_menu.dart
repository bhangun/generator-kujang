import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../utils/helper.dart';

import '../../utils/modules/menu.dart';

class SideMenu extends StatefulWidget {
  const SideMenu(
      {Key? key,
      this.floatingActionButton,
      required this.menuItems,
      this.onMenuClick,
      this.currentIndex,
      this.title,
      this.width,
      this.image})
      : super(key: key);
  final Widget? floatingActionButton;
  final List<Menu>? menuItems;
  final void Function(Menu)? onMenuClick;
  final int? currentIndex;
  final Widget? title;
  final double? width;
  final String? image;

  @override
  State<SideMenu> createState() => _SideMenuState();
}

class _SideMenuState extends State<SideMenu> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
        width: widget.width,
        child: SafeArea(
            child: SingleChildScrollView(
          child: Column(
            children: [
              // Side menu header
              DrawerHeader(
                child: Center(
                    child: Column(children: [
                  SvgPicture.asset(
                    widget.image!,
                    width: 60,
                    height: 60,
                  ),
                  widget.title!
                ])),
              ),

              // Menu list
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: widget.menuItems!.length,
                itemBuilder: (context, index) {
                  return _buildList(widget.menuItems![index]);
                },
              )
            ],
          ),
        )));
  }

  Widget _buildList(Menu menu) {
    return menu.items.isEmpty
        ? Builder(builder: (context) {
            return ListTile(
                onTap: () => widget.onMenuClick!(menu),
                leading: getIcon(menu.icon!),
                title: Text(menu.title!));
          })
        : ExpansionTile(
            leading: getIcon(menu.icon!),
            title: Text(
              menu.title!,
             // style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            children: menu.items.map(_buildList).toList(),
          );
  }
}
