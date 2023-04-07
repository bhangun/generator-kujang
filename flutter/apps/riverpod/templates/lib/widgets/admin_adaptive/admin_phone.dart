import 'package:awesome_bottom_bar/awesome_bottom_bar.dart';
import 'package:awesome_bottom_bar/widgets/inspired/inspired.dart';
import 'package:flutter/material.dart';

import '../../utils/helper.dart';
import '../../utils/modules/menu.dart';

class AdaptivePhone extends StatefulWidget {
  const AdaptivePhone(
      {Key? key,
      this.floatingActionButton,
      required this.menuItems,
      this.onBottomTap,
      this.currentIndex,
      this.title,
      this.width,
      this.image,
      this.drawer,
      this.body,
      this.actions})
      : super(key: key);
  final Widget? floatingActionButton;
  final List<Menu>? menuItems;
  final void Function(int)? onBottomTap;
  final int? currentIndex;
  final Widget? title;
  final double? width;
  final String? image;
  final Widget? body;
  final Widget? drawer;
  final List<Widget>? actions;

  @override
  State<AdaptivePhone> createState() => _AdaptivePhoneState();
}

class _AdaptivePhoneState extends State<AdaptivePhone> {
  @override
  Widget build(BuildContext context) {
    // List<TabItem<Menu>> mm = <TabItem<Menu>>[];

    return Scaffold(
      body: widget.body,
      drawer: widget.drawer,
      appBar: AppBar(
        // leading: const Icon(Icons.cabin),
        title: widget.title,
        backgroundColor: Theme.of(context).colorScheme.primary,

        // actions: widget.actions,
      ),
      bottomNavigationBar: BottomBarInspiredOutside(
        curve: Curves.easeInOut,
        elevation: 5,
        items: const <TabItem>[
          TabItem(icon: Icons.home, title: ''),
          TabItem(icon: Icons.access_alarms_sharp, title: ''),
          TabItem(icon: Icons.account_circle_outlined, title: ''),
          TabItem(icon: Icons.home, title: ''),
          TabItem(icon: Icons.access_alarms_sharp, title: ''),
        ],
        backgroundColor: Theme.of(context).colorScheme.primary,
        height: 30,
        color: Theme.of(context).colorScheme.onBackground,
        colorSelected: Theme.of(context).colorScheme.onBackground,
        indexSelected: widget.currentIndex!,
        onTap: widget.onBottomTap,
        itemStyle: ItemStyle.circle,
        animated: true,
        chipStyle: ChipStyle(
            notchSmoothness: NotchSmoothness.verySmoothEdge,
            background: Theme.of(context).colorScheme.primary),
      ),
      floatingActionButton: widget.floatingActionButton,
    );
  }

  Widget bottomDefault() => BottomNavigationBar(
        items: [
          ...widget.menuItems!.map(
            (d) => BottomNavigationBarItem(
              icon: getIcon(d.icon!),
              label: d.title,
            ),
          ),
        ],
        currentIndex: widget.currentIndex!,
        onTap: widget.onBottomTap,
      );
}
