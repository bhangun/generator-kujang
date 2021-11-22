import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:<%= appsName %>/modules/user/bloc/user_bloc.dart';
import 'package:<%= appsName %>/modules/user/model/user.dart';

class UserList extends ConsumerStatefulWidget {
  const UserList({Key? key}) : super(key: key);
  @override
  _UserListState createState() => _UserListState();
}

class _UserListState extends ConsumerState<UserList> {
  final _listKey = GlobalKey<ScaffoldState>();

  UserBloc _userBloc = UserBloc();
  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _userBloc = ref.watch(userBloc);
    AsyncValue<List<User>> _userList = ref.watch(_userBloc.users());

    AsyncValue<List<User>> _userProv = ref.watch(userProv);

    int _totalUser = 0;

    return Scaffold(
        key: _listKey,
        appBar: AppBar(title: Text('User List ( $_totalUser )')),
        body: _userProv.when(
            loading: () => const CircularProgressIndicator(),
            error: (err, stack) => Text('Error: $err'),
            data: (users) {
              _totalUser = users.length;
              return _buildSlidelist(context, users);
            }),
        floatingActionButton: FloatingActionButton(
          onPressed: _userBloc.add,
          tooltip: 'Add',
          child: const Icon(Icons.add),
        ));
  }

  _buildSlidelist(BuildContext context, List<User> users) {
    return ListView.separated(
        itemCount: users.length,
        separatorBuilder: (context, index) {
          return const Divider();
        },
        itemBuilder: (context, index) {
          return ListTile(
              leading: const Icon(Icons.person),
              title: Text(
                users[index].firstName!,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                softWrap: false,
                style: Theme.of(context).textTheme.bodyText1,
              ),
              subtitle: Text(
                '${users[index].email} ',
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                softWrap: false,
                style: Theme.of(context).textTheme.bodyText2,
              ),
              onTap: () => _userBloc.itemTap(index));
        });
  }
}
