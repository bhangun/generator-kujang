import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/svg.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '../bloc/settings/settings_bloc.dart';
import '../bloc/auth/auth_bloc.dart';
import '../utils/helper.dart';
import '../services/apps_routes.dart';
import '../services/navigation.dart';
import '../utils/config.dart';
import '../widgets/textfield_widget.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _Loginpagestate createState() => _Loginpagestate();
}

class _Loginpagestate extends ConsumerState<LoginScreen> {
  final TextEditingController _usernameController = TextEditingController();

  final TextEditingController _passwordController = TextEditingController();

  late FocusNode _passwordFocusNode;

  final _formKey = GlobalKey<FormState>();

  AuthBloc _authBloc = AuthBloc();

  bool _isEyeOpen = true;

  bool _isObscure = true;

  bool _isLight = true;

  @override
  void initState() {
    super.initState();

    _passwordFocusNode = FocusNode();

    _usernameController.addListener(() {
      // this will be called whenever user types in some value
      _authBloc.setUserId(_usernameController.text);
    });

    _passwordController.addListener(() {
      //this will be called whenever user types in some value
      _authBloc.setPassword(_passwordController.text);
    });
  }

  @override
  void dispose() {
    // Clean up the controller when the Widget is removed from the Widget tree
    _usernameController.dispose();
    _passwordController.dispose();
    _passwordFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _authBloc = ref.watch(authBloc);
    _isLight = ref.watch(settingsBloc).isLightTheme;

    return Scaffold(
        primary: true,
        appBar: AppBar(
            backgroundColor: Theme.of(context).scaffoldBackgroundColor,
            elevation: 0,
            actions: [
              IconButton(
                splashRadius: 15,
                color: Theme.of(context).errorColor,
                icon: const Icon(Icons.info),
                onPressed: () =>
                    NavigationServices.navigateTo(AppsRoutes.about),
              ),
              IconButton(
                  splashRadius: 15,
                  color: Theme.of(context).errorColor,
                  icon: _isLight
                      ? const Icon(Icons.dark_mode)
                      : const Icon(Icons.light_mode),
                  onPressed: () => ref.read(settingsBloc).switchTheme()),
              IconButton(
                  splashRadius: 15,
                  color: Theme.of(context).errorColor,
                  icon: const Icon(Icons.flag),
                  onPressed: () => _showLocales()),
            ]),
        body: Material(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.max,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SvgPicture.asset(
                  imageSplash,
                  width: 60,
                  height: 60,
                ),
                const SizedBox(height: 24.0),
                _usernameField(),
                _passwordField(),
                _forgotPasswordButton(),
                _signInButton(),
              ],
            )));
  }

  Widget _usernameField() => TextFieldWidget(
        hint: AppLocalizations.of(context)!.email,
        inputType: TextInputType.emailAddress,
        icon: Icons.person,
        iconColor: Colors.black54,
        textController: _usernameController,
        inputAction: TextInputAction.next,
        onFieldSubmitted: (value) {
          FocusScope.of(context).requestFocus(_passwordFocusNode);
        },
        errorText: _authBloc.loginMessage,
      );

  Widget _passwordField() => TextFieldWidget(
        hint: AppLocalizations.of(context)!.password,
        isObscure: _isObscure,
        padding: const EdgeInsets.only(top: 16.0),
        icon: Icons.lock,
        iconColor: Colors.black54,
        textController: _passwordController,
        focusNode: _passwordFocusNode,
        errorText: _authBloc.passwordMessage,
        onEyePressed: () => _onEyePressed(),
        isEyeOpen: _isEyeOpen,
        showEye: true,
      );

  Widget _forgotPasswordButton() => Align(
      alignment: FractionalOffset.centerRight,
      child: TextButton(
          key: const Key('user_forgot_password'),
          child: Text(AppLocalizations.of(context)!.forgot_password),
          onPressed: () => ref.read(authBloc).forgotPassword()));

  Widget _signInButton() => ElevatedButton(
        key: const Key('user_sign_button'),
        onPressed: () {
          ref.read(authBloc).signIn(context);
          showModal(context, _authBloc.errorMessage, () => {});
        },
        child: Text(AppLocalizations.of(context)!.sign_in),
      );

  _onEyePressed() {
    setState(() {
      _isEyeOpen = _isEyeOpen ? false : true;
      _isObscure = _isEyeOpen ? true : false;
    });
  }

  _showLocales() {
    showModalBottomSheet<void>(
        context: context,
        builder: (BuildContext context) => SizedBox(
            height: 200,
            child: ListView(
              children: [
                _localeBtn('Bahasa', 'ID'),
                _localeBtn('English', 'EN'),
              ],
            )));
  }

  _localeBtn(title, key) => TextButton(
      child: Text(title),
      onPressed: () => ref.read(settingsBloc).switchLocale(key));
}
