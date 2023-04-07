// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'menu.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Menu _$MenuFromJson(Map<String, dynamic> json) => Menu(
      title: json['title'] as String?,
      name: json['name'] as String?,
      subtitle: json['subtitle'] as String?,
      description: json['description'] as String?,
      icon: json['icon'] as String?,
      path: json['path'] as String?,
      roles:
          (json['roles'] as List<dynamic>?)?.map((e) => e as String).toList(),
      basePath: json['basePath'] as String?,
      enabled: json['enabled'] as bool?,
      showInDrawer: json['showInDrawer'] as bool? ?? true,
      showInHome: json['showInHome'] as bool? ?? false,
      items: (json['items'] as List<dynamic>?)
              ?.map((e) => Menu.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
    );

Map<String, dynamic> _$MenuToJson(Menu instance) => <String, dynamic>{
      'name': instance.name,
      'title': instance.title,
      'subtitle': instance.subtitle,
      'description': instance.description,
      'icon': instance.icon,
      'path': instance.path,
      'basePath': instance.basePath,
      'items': instance.items.map((e) => e.toJson()).toList(),
      'roles': instance.roles,
      'enabled': instance.enabled,
      'showInDrawer': instance.showInDrawer,
      'showInHome': instance.showInHome,
    };
