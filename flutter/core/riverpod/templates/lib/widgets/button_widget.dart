import 'package:flutter/material.dart';

class KButton extends StatelessWidget {
  final String? label;
  final Color? color;
  final Color textColor;
  final VoidCallback? onPressed;

  const KButton(
      {Key? key,
      this.label,
      this.color,
      this.textColor = Colors.white,
      this.onPressed})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      child: Text(
        label!,
      ),
    );
  }
}
