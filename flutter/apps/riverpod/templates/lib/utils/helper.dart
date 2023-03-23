import 'dart:async';
import 'package:flutter/material.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import '../services/local/database_services.dart';
import 'config.dart';


Future<Map<String, dynamic>> jwt() async {
  return JwtDecoder.decode(await DatabaseServices.db.saveToken(token));
}

Future<List<String>> roles() async {
  return (await jwt())["auth"].split(",");
}

Future<bool> isRole(String role) async {
  final List<String> b=await roles();
  return b.contains(role);
}

instantToDate(DateTime date){
  return DateTime.parse(date.toString().substring(0,date.toString().length-1));
}


showModal(context, text, onPressed) => ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        action: SnackBarAction(
          label: 'Action',
          onPressed: () => {}//onPressed
        ),
        content: Text(text),
        duration: const Duration(milliseconds: 1500),
        width: 280.0, // Width of the SnackBar.
        padding: const EdgeInsets.symmetric(
          horizontal: 8.0, // Inner padding for SnackBar content.
        ),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10.0),
        ),
      ));


