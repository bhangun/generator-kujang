import 'package:flutter/material.dart';

class KAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String? title;
  final VoidCallback? onLogout;

  const KAppBar({Key? key, this.title, this.onLogout}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PreferredSize(
            preferredSize: const Size.fromHeight(100.0),
            child: AppBar(
              title: Text(title!),
              actions: <Widget>[
                IconButton(
                  splashRadius: 15,
                  onPressed: () => onLogout,
                  icon: const Icon(
                    Icons.power_settings_new,
                  ),
                )
              ],
            )
            );
  }

  @override
  Size get preferredSize => const Size.fromHeight(100.0);
}
