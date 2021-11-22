import 'package:flutter/material.dart';
import 'package:<%= appsName %>/modules/user/services/user_routes.dart';

class KDrawer extends StatefulWidget {
  final String? firstName;
  final String? email;

  const KDrawer({Key? key,
  this.firstName,
  this.email
  }) : super(key: key);
  

  @override
  _KDrawerState createState() => _KDrawerState();
}

class _KDrawerState extends State<KDrawer> {

  @override
  Widget build(BuildContext context) {

    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          UserAccountsDrawerHeader(
            accountName: Text(widget.firstName!),
            accountEmail: Text(widget.email!),
            currentAccountPicture: const CircleAvatar(
                // backgroundImage: ,
                ),
          ),
          _listTitle("Register", context, "/users"),
          _listTitle("User", context, UserRoutes.userList),
          _listTitle("Dashboard", context, "/dashboard"),
          _listTitle("Logout", context, "/login")
        ],
      ),
    );
  }

  Widget _listTitle(String name, BuildContext context, String path) => ListTile(
        title: Text(
          name,
          style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 18.0),
        ),
        leading: const Icon(
          Icons.person,
          color: Colors.blue,
        ),
        onTap: () => Navigator.pushReplacementNamed(context, path),
      );
}
