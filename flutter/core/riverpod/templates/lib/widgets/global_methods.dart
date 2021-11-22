import 'package:flutter/material.dart';

listMenuDrawer(){
   var list = <Widget>[];
   list.add(Text(""));
   return list;
}

Widget listTitle(String name) =>
    ListTile(
      title: Text(
        name,
        style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 18.0),
      ),
      leading: const Icon(
        Icons.person,
        color: Colors.blue,
      ),
    );

Widget header(String accountName,String accountEmail,String imgPath) =>
    UserAccountsDrawerHeader(
      accountName: Text(
        accountName,
      ),
      accountEmail: Text(
        accountEmail,
      ),
      currentAccountPicture: CircleAvatar(
        backgroundImage:  AssetImage(imgPath),
      ),
    );