import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../bloc/user_bloc.dart';

class UserDetail extends ConsumerStatefulWidget {
  const UserDetail({Key? key}) : super(key: key);
  
  @override
  ConsumerState<ConsumerStatefulWidget> createState()  => _UserDetailState();
}

class _UserDetailState extends ConsumerState<UserDetail> {
  UserBloc _userBloc = UserBloc();

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
   _userBloc = ref.watch(userBloc);
   
    return Scaffold(
            appBar: AppBar(title: const Text('User Detail')),
            body: _userBloc.isItemEmpty
                ? const Center(child: Text('User data are empty'))
                : userDetail(),
            floatingActionButton: FloatingActionButton(
              onPressed: () => _userBloc.update(),
              tooltip: 'Edit',
              child: const Icon(Icons.edit),
            ));
  }

  userDetail() {
    return ListView(
        padding: const EdgeInsets.symmetric(horizontal: 24.0),
        children: <Widget>[
          const SizedBox(height: 100.0),
          Icon(Icons.person, size: 100, color: Colors.blue[500]),
          Column(children: <Widget>[
            Text(_userBloc.user!.login!),
            Text(_userBloc.user!.firstName!),
            Text(_userBloc.user!.lastName!),
            Text(_userBloc.user!.email!),
            Text(_userBloc.user!.password!),
            Text(_userBloc.user!.phone!),
            //Text(_userBloc.user!.userStatus!),
          ])
        ]);
  }
}