// Copyright 2020, the Kujang project authors. Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:adaptive_screen/adaptive_screen.dart';
import 'package:flutter/material.dart';

import '../../widgets/admin_adaptive/side_menu.dart';

import '../../utils/config.dart';
import '../../utils/constants.dart';
import '../../utils/modules/menu.dart';
import 'admin_phone.dart';
import 'side_menu_fold.dart';

class AdminAdaptive extends StatefulWidget {
  final Widget? title;
  final List<Widget> actions;
  final Widget? body;
  final int currentIndex;
  final List<Menu> menuItems;
  final ValueChanged<int>? onBottomTap;
  final ValueChanged<int>? onFoldMenuTap;
  final ValueChanged<Menu>? onMenuClick;
  final FloatingActionButton? floatingActionButton;

  const AdminAdaptive({
    this.title,
    this.body,
    this.actions = const [],
    required this.currentIndex,
    required this.menuItems,
    this.onMenuClick,
    this.floatingActionButton,
    super.key,
    this.onBottomTap,
    this.onFoldMenuTap,
  });

  @override
  State<AdminAdaptive> createState() => _AdminAdaptiveState();
}

class _AdminAdaptiveState extends State<AdminAdaptive> {
  @override
  Widget build(BuildContext context) => AdaptiveScreen(
      // If fit large screen (Desktop)
      largeScreen: largeScreen(),
      // If fit medium screen (Tablet)
      mediumScreen: mediumScreen(context),
      // If fit small screen (Phone)
      phone: phoneScreen());

  Widget largeScreen() => Row(
        children: [
          // Side Menu
          SideMenu(
              width: sideMenuWidth,
              image: imageSplash,
              menuItems: widget.menuItems,
              currentIndex: widget.currentIndex,
              title: widget.title,
              onMenuClick: widget.onMenuClick),

          // Divider
          verticalDivider(),

          // Main Section
          Expanded(
            child: Scaffold(
              appBar: AppBar(
                actions: widget.actions,
                backgroundColor: Theme.of(context).colorScheme.primary,
              ),
              body: widget.body,
              floatingActionButton: widget.floatingActionButton,
            ),
          )
        ],
      );

  Widget mediumScreen(context) => Scaffold(
        appBar: AppBar(
          leading: const Text('icon'),
          title: widget.title,
          actions: widget.actions,
        ),
        body: Row(
          children: [
            // Side Menu
            SideMenuFold(
              menuItems: widget.menuItems,
              currentIndex: widget.currentIndex,
              onMenuClick: widget.onFoldMenuTap,
            ),

            // Divider
            verticalDivider(),

            // Main Section
            Expanded(
              child: widget.body!,
            ),
          ],
        ),
      );

  Widget phoneScreen() => AdaptivePhone(
        body: widget.body,
        title: widget.title,
        drawer: SideMenu(
            width: sideMenuWidth,
            image: imageSplash,
            menuItems: widget.menuItems,
            currentIndex: widget.currentIndex,
            title: widget.title,
            onMenuClick: widget.onMenuClick),
        actions: widget.actions,
        currentIndex: widget.currentIndex,
        onBottomTap: widget.onBottomTap,
        floatingActionButton: widget.floatingActionButton,
        menuItems: widget.menuItems,
      );

  Widget verticalDivider() => VerticalDivider(
        width: 1,
        thickness: 1,
        color: Theme.of(context).dividerColor,
      );
}
