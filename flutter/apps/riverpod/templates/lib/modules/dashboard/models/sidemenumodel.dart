import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

import '../../../utils/modules/menu.dart';
import 'header.dart';

part 'sidemenumodel.g.dart';

@JsonSerializable(explicitToJson: true)
class SideMenuModel extends Equatable {
  final Header? header;
  final List<Menu>? menu;

  const SideMenuModel({this.header, this.menu});
  factory SideMenuModel.fromJson(Map<String, dynamic> json) =>
      _$SideMenuModelFromJson(json);
  Map<String, dynamic> toJson() => _$SideMenuModelToJson(this);

  @override
  List<Object?> get props => throw UnimplementedError();
}
