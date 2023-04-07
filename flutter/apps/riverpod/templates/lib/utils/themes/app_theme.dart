import 'package:flutter/material.dart';
import 'color_scheme.dart';
import 'material_colors.dart';

class AppTheme {
  static TextTheme _buildTextTheme(TextTheme base) {
    return base
        .copyWith(
          titleLarge: base.titleLarge!.copyWith(fontSize: 18.0),
          bodySmall: base.bodySmall!.copyWith(
           // fontWeight: FontWeight.w400,
            fontSize: 12.0,
          ),
          bodyMedium: base.bodyMedium!.copyWith(
           // fontWeight: FontWeight.w500,
            fontSize: 14.0,
          ),
        )
        .apply(
         // displayColor: MaterialColors.black,
          // bodyColor: MaterialColors.black,
        );
  }

  static ThemeData lightTheme() {
    final ThemeData base = ThemeData(
      colorScheme: lightColorScheme,
    );
    return base.copyWith(
      textTheme: _buildTextTheme(base.textTheme),
      primaryTextTheme: _buildTextTheme(base.primaryTextTheme),
    );
  }

  static ThemeData darkTheme() {
    final ThemeData base = ThemeData(
      colorScheme: darkColorScheme,
    );
    return base.copyWith(
      textTheme: const TextTheme(bodySmall: TextStyle()),
    );
  }
}
