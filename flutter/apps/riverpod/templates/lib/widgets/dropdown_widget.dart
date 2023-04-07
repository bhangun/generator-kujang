import 'package:flutter/material.dart';
import '../utils/helper.dart';

class DropdownItem {
  DropdownItem({this.title = '', this.icon = 'home', this.onTap});
  final String title;
  final String icon;
  final void Function()? onTap;
}

class Dropdown extends StatefulWidget {
  const Dropdown(
      {super.key, //required this.account,
      required this.items});
  // final String account;
  final List<DropdownItem> items;

  @override
  State<Dropdown> createState() => _DropdownState();
}

class _DropdownState extends State<Dropdown> {
  String dropdownValue = '';
  @override
  Widget build(BuildContext context) {
    dropdownValue = widget.items[0].title;
    return DropdownButton<String>(
      value: dropdownValue,
      icon: const Icon(Icons.keyboard_arrow_down),
      elevation: 10,
      style:  TextStyle(color: Theme.of(context).colorScheme.onBackground),
      /*  underline: Container(
        height: 2,
        color: Colors.deepPurpleAccent,
      ), */
      onChanged: (String? value) {
        // This is called when the user selects an item.
        setState(() {
          dropdownValue = value!;
        });
      },
      items: widget.items
          .map<DropdownMenuItem<String>>(
              (DropdownItem m) => DropdownMenuItem<String>(
                    value: m.title,
                    onTap: m.onTap,
                    child: Row(children: [
                      getIcon(m.icon),
                      Text(m.title),
                    ]),
                  ))
          .toList(),
    );
  }
}
