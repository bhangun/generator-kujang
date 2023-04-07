import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'header.g.dart';

@JsonSerializable(explicitToJson: true)
class Header extends Equatable {
  final String? title;
  final String? logo;

  const Header({this.title, this.logo});

  factory Header.fromJson(Map<String, dynamic> json) => _$HeaderFromJson(json);
  Map<String, dynamic> toJson() => _$HeaderToJson(this);

  @override
  List<Object?> get props => throw UnimplementedError();
}
