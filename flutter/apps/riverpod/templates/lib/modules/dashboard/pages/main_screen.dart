import 'dart:convert';

import 'package:adaptive_screen/device_info.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../utils/helper.dart';
import '../models/sidemenumodel.dart';
import '../bloc/menu_bloc.dart';
import '../widgets/side_menu_widget.dart';
import 'header_appbar.dart';

class MainScreen extends ConsumerWidget {
  const MainScreen({super.key, this.child});
  final Widget? child;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    Future<String> data = jsonFromFile('assets/data/menu.json');

    return Scaffold(
      key: ref.read(menuBloc).scaffoldKey,
      //appBar: const HeaderBar(),
      //drawer: sidemenu(data),
      body: SafeArea(
        child: Row(
          // crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            // If large screen show side menu
            if (DeviceScreen.isLargeScreen(context))
              Expanded(
                child: sidemenu(data),
              ),
            Column(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                   const Expanded(
              child:
                    SizedBox(
                    height: 50,
                    width: 800,
                    child: HeaderBar(),
                  )),
                  /* Container(
                          height: MediaQuery.of(context).size.height,
                          width: MediaQuery.of(context).size.width,
                          decoration: const BoxDecoration(
                              gradient: LinearGradient(
                                  begin: Alignment.topRight,
                                  end: Alignment.bottomLeft,
                                  colors: [
                                Colors.black,
                                Colors.greenAccent,
                                Colors.black,
                              ])),
                          child: const Text('data')), */
                  // const HeaderBase(),
                  /*  SingleChildScrollView(
                          //  padding:  EdgeInsets.symmetric(horizontal: Spacing.s),
                          child: */
                  Expanded(
                      flex: 5,
                      child: SizedBox(
                          height: 200,
                          width: 700,
                          child:
                              child!) //Text('dash')//DashboardPage(child: Text('')),
                      // )
                      )
                ])
          ],
        ),
      ),
    );
  }

  Widget sidemenu(data) => FutureBuilder<String>(
      future: data,
      builder: (BuildContext context, AsyncSnapshot<String> snapshot) {
        if (snapshot.hasData) {
          return SideMenu(
              data: SideMenuModel.fromJson(json.decode(snapshot.data!)));
        }
        return Container();
      });
}
