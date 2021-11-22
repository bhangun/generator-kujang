import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class KAlert extends StatelessWidget {
  final String? title;
  final Function onCancel;
  final Function onOk;
  final String? content;
  final String cancelTitle;
  final String okTitle;

  const KAlert({Key? key, this.title,
      this.content,
      required this.onCancel,
      required this.onOk,
      this.cancelTitle='Cancel',
      this.okTitle='Ok'}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      key: key,
      title: Text(title!),
      content: Text(content!),
      actions: <Widget>[
        TextButton(
          child: Text(cancelTitle),
          onPressed: ()=> onCancel,
        ),
        TextButton(
          child: Text(okTitle),
          onPressed: ()=> onOk,
        ),
      ],
    );
  }
}
