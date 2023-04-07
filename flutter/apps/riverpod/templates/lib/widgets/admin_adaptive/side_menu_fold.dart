import 'package:flutter/material.dart';

import '../../utils/helper.dart';
import '../../utils/modules/menu.dart';

class SideMenuFold extends StatelessWidget {
  const SideMenuFold(
      {Key? key,
      this.floatingActionButton,
      required this.menuItems,
      this.onMenuClick,
      this.currentIndex})
      : super(key: key);
  final Widget? floatingActionButton;
  final List<Menu>? menuItems;
  final void Function(int)? onMenuClick;
  final int? currentIndex;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: NavigationRail(
      minWidth: 50,
      minExtendedWidth: 70,
      leading: floatingActionButton,
      destinations: [
        ...menuItems!.map(
          (d) => NavigationRailDestination(
            icon: getIcon(d.icon!),
            label: Text(d.title!),
          ),
        ),
      ],
      selectedIndex: currentIndex,
      onDestinationSelected: onMenuClick ?? (_) {},
    ));
  }
}


  /* Widget sideMenuIcon() => Scrollbar(child: NavigationRail(
        leading: widget.floatingActionButton,
        destinations: [
          ...widget.menuItems.map(
            (d) => NavigationRailDestination(
              icon: d.icon,
              label: Text(d.title),
            ),
          ),
        ],
        selectedIndex: widget.currentIndex,
        onDestinationSelected: widget.onMenuClick ?? (_) {},
      )); */