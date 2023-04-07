import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../bloc/user_bloc.dart';
import '../models/user.dart';

class UserForm extends ConsumerStatefulWidget {
  final User? data;
  const UserForm({Key? key, this.data}) : super(key: key);

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _UserFormState();
}

class _UserFormState extends ConsumerState<UserForm> {
  final _username = TextEditingController();
  final _firstName = TextEditingController();
  final _lastName = TextEditingController();
  final _email = TextEditingController();
  final _password = TextEditingController();
  final _phone = TextEditingController();
  final _userStatus = TextEditingController();

  var _userBloc = UserBloc();
  @override
  void dispose() {
    _username.dispose();
    _firstName.dispose();
    _lastName.dispose();
    _email.dispose();
    _password.dispose();
    _phone.dispose();
    _userStatus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _userBloc = ref.watch(userBloc);

    AsyncValue<List<User>> userP = ref.watch(userProv);
    int id = 0;

    _username.addListener(() {
      _userBloc.setUser(User(username: _username.text, id: id));
    });

    _firstName.addListener(() {
      _userBloc.setUser(User(username: _firstName.text, id: id));
    });

    _lastName.addListener(() {
      _userBloc.setUser(User(username: _lastName.text, id: id));
    });

    _email.addListener(() {
      _userBloc.setUser(User(username: _email.text, id: id));
    });

    _password.addListener(() {
      _userBloc.setUser(User(username: _password.text, id: id));
    });

    _phone.addListener(() {
      _userBloc.setUser(User(username: _phone.text, id: id));
    });

    _userStatus.addListener(() {
      _userBloc.setUser(User(username: _userStatus.text, id: id));
    });

    return Scaffold(
        appBar: AppBar(
          title: Text(_userBloc.formTitle),
        ),
        body: userP.when(
            loading: () => const CircularProgressIndicator(),
            error: (err, stack) => Text('Error: $err'),
            data: (config) {
              return Material(child: _form());
            }),
        floatingActionButton: FloatingActionButton(
          onPressed: () => _userBloc.save(),
          tooltip: 'Add',
          child: const Icon(Icons.save),
        ));
  }

  _form() {
    return SafeArea(
        child: ListView(
            padding: const EdgeInsets.symmetric(horizontal: 24.0),
            children: <Widget>[
          const SizedBox(height: 120.0),
          _textField(_username, 'Username'),
          _textField(_firstName, 'Firstname'),
          _textField(_lastName, 'Lastname'),
          _textField(_email, 'Email'),
          _textField(_password, 'Password'),
          _textField(_phone, 'Phone'),
          _textField(_userStatus, 'UserStatus')
        ]));
  }

  _textField(controler, text) => TextField(
        controller: controler,
        decoration: InputDecoration(
          filled: true,
          labelText: text,
        ),
      );
}
