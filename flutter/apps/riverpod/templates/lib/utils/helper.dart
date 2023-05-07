import 'dart:async';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

bool validateEmail(String value) {
  // Regex for email validation
  String pattern = "[a-zA-Z0-9+._%-+]{1,256}\\@"
      "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}"
      "(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+";
  RegExp regExp = RegExp(pattern);
  return regExp.hasMatch(value);
}

Future<String> jsonFromFile(String path) async {
  final String response = await rootBundle.loadString(path);
  return response;
}

Future<Map<String, dynamic>> jwt() async {
  return JwtDecoder.decode(''); //await DatabaseServices.db.saveToken(token));
}

Future<List<String>> roles() async {
  return (await jwt())["auth"].split(",");
}

Future<bool> isRole(String role) async {
  final List<String> b = await roles();
  return b.contains(role);
}

instantToDate(DateTime date) {
  return DateTime.parse(
      date.toString().substring(0, date.toString().length - 1));
}

void setupWindow() {
  if (!kIsWeb &&
      (Platform.isWindows || Platform.isLinux || Platform.isMacOS)) {}
  // Get the operating system as a string.
  // Or, use a predicate getter.
  if (Platform.isMacOS) {
  } else {}
}

String getOS() {
  String os = Platform.operatingSystem;
  return os;
}

String getScript() {
  // Get the URI of the script being run.
  var uri = Platform.script;
  return uri.toFilePath();
}

String getEnvironment(String envVarName) {
  // Get the value of an environment variable
  Map<String, String> envVars = Platform.environment;

  return envVars[envVarName].toString();
}

showModal(context, text, [onPressed]) =>
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      action: SnackBarAction(label: 'Action', onPressed: onPressed
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

Widget getIcon( String icon,
        {String? title, Color color = Colors.black, double size = 24.0}) =>
    Icon(
      getIconData(icon),
      color: color,
      size: size,
      semanticLabel: title,
    );

IconData getIconData(String name) => icons()[name]!;

Map<String, IconData> icons() => {
      'home': Icons.home,
      'label': Icons.label,
      'list': Icons.list,
      'access_alarm': Icons.access_alarm,
      'yt_search': Icons.youtube_searched_for,
      'abc': Icons.abc,
      'add_photo': Icons.add_a_photo,
      'add': Icons.add
};


transformStringParam(List<String> text) {
    String payload = '';
    var del = '&';
    var i = 0;
    for (var e in text) {
      payload += e + (i<text.length-1?del:'');
      i++;
    }
    return payload;
}
