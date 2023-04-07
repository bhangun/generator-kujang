import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'menu.g.dart';

@JsonSerializable(explicitToJson: true)
class Menu extends Equatable {
  final String? name;
  final String? title;
  final String? subtitle;
  final String? description;
  final String? icon;
  final String? path;
  final String? basePath;
  final List<Menu> items;
  final List<String>? roles;
  final bool? enabled;
  final bool showInDrawer;
  final bool showInHome;

  const Menu(
      {this.title,
      this.name,
      this.subtitle,
      this.description,
      this.icon,
      this.path,
      this.roles,
      this.basePath,
      this.enabled,
      this.showInDrawer = true,
      this.showInHome = false,
      this.items = const []});

  factory Menu.fromJson(Map<String, dynamic> json) => _$MenuFromJson(json);
  Map<String, dynamic> toJson() => _$MenuToJson(this);

  @override
  List<Object?> get props => ['$title'];
}
