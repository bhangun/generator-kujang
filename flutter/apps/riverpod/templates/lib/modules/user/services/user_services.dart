import 'dart:async';
import 'dart:convert';

import 'package:flutter/services.dart';

import '../models/user.dart';
import '../../../services/rest/rest_services.dart';

class UserServices {
  static Future<User> user(String id) async {
    var response = await RestServices.fetch('/api/user$id');
    return User.fromJson(json.decode(response));
  }

  static Future<List<User>> users([var page, var size, var sort]) async {
    // You can comment below or remove it to change using RestServices 
    List<User> data =
        json.decode(await rootBundle.loadString('assets/data/users.json'));
    // You can uncomment below using RestServices to your respository instead
    // List<User> data = await RestServices.fetch('/api/users');
    return User.listFromJson(data);
  }

  static createUser(User user) async {}

  //
  static updateUser(User user) async {}

  //
  static deleteUser(int id) async {}
}
