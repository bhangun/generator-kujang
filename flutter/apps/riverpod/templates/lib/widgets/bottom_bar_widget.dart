import 'package:flutter/material.dart';

class KBottomBar extends StatefulWidget {
  const KBottomBar({Key? key}) : super(key: key);

  @override
  _KBottomBarState createState() => _KBottomBarState();
}

class _KBottomBarState extends State<KBottomBar> {
  final _appBloc = null;
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.business),
          label: 'Business',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.school),
          label: 'School',
        ),
      ],
      currentIndex: _selectedIndex,
      selectedItemColor: Colors.amber[800],
      onTap: _onItemTapped,
    );
  }

  _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      _appBloc.goTo(_selectedIndex);
    });
  }
}
