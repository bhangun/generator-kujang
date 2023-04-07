// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sidemenumodel.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SideMenuModel _$SideMenuModelFromJson(Map<String, dynamic> json) =>
    SideMenuModel(
      header: json['header'] == null
          ? null
          : Header.fromJson(json['header'] as Map<String, dynamic>),
      menu: (json['menu'] as List<dynamic>?)
          ?.map((e) => Menu.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$SideMenuModelToJson(SideMenuModel instance) =>
    <String, dynamic>{
      'header': instance.header?.toJson(),
      'menu': instance.menu?.map((e) => e.toJson()).toList(),
    };
