import 'dart:convert';
import 'package:equatable/equatable.dart';

class User extends Equatable {
  final int? id;
  final String? username;
  final String? firstName;
  final String? lastName;
  final String? email;
  final String? password;
  final String? phone;
  final int? userStatus;

  const User({
    this.id,
    this.username,
    this.firstName,
    this.lastName,
    this.email,
    this.password,
    this.phone,
    this.userStatus,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json['id'],
        username: json['username'],
        firstName: json['firstName'],
        lastName: json['lastName'],
        email: json['email'],
        password: json['password'],
        phone: json['phone'],
        userStatus: json['userStatus'],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "username": username,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "phone": phone,
        "userStatus": userStatus,
      };

  static List<User> listFromString(String str) =>
      List<User>.from(json.decode(str).map((x) => User.fromJson(x)));

  static List<User> listFromJson(List<dynamic> data) {
    return data.map((post) => User.fromJson(post)).toList();
  }

  static String listUserToJson(List<User> data) =>
      json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

  @override
  List<Object> get props => [
        id!,
        username!,
        firstName!,
        lastName!,
        email!,
        password!,
        phone!,
        userStatus!,
      ];
}

class UserList {
  final List<User>? users;

  UserList({
    this.users,
  });

  factory UserList.fromJson(List<dynamic> json) {
    List<User> users = [];
    users = json.map((post) => User.fromJson(post)).toList();

    return UserList(
      users: users,
    );
  }
}
