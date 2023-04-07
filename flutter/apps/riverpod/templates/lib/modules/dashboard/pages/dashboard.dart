import 'package:adaptive_screen/device_info.dart';
import 'package:flutter/material.dart';

import '../../../data/menu_data.dart';


class DashboardPage extends StatefulWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
        child:  Text('Kujang')
    );
  }
}
