import 'dart:async';
import 'dart:io';
import 'package:sembast/sembast.dart';
import 'package:sembast/sembast_io.dart';
import 'package:path_provider/path_provider.dart';

import 'db_encryption.dart';
import '../../utils/config.dart';


class LocalDatabase {
  // Singleton instance
  static final LocalDatabase _singleton = LocalDatabase._();

  // Singleton accessor
  static LocalDatabase get db => _singleton;

  // A private constructor. Allows us to create instances of LocalDatabase
  // only from within the LocalDatabase class itself.
  LocalDatabase._();

  // Completer is used for transforming synchronous code into asynchronous code.
  Completer<Database>? _dbOpenCompleter;

  // Key for encryption
  var encryptionKey = "";

  // Database object accessor
  Future<Database> database(String key) async {
    encryptionKey = key;

    // If completer is null, LocalDatabaseClass is newly instantiated, so database is not yet opened
    if (_dbOpenCompleter == null) {
      _dbOpenCompleter = Completer();

      // Calling _openDatabase will also complete the completer with database instance
      _openDatabase();
    }
    // If the database is already opened, awaiting the future will happen instantly.
    // Otherwise, awaiting the returned future will take some time - until complete() is called
    // on the Completer in _openDatabase() below.
    return _dbOpenCompleter!.future;
  }

  Future _openDatabase() async {
    // Get a platform-specific directory where persistent app data can be stored
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;
    String dbPath = '$appDocPath/$dbName';

    // Check to see if encryption is set, then provide codec
    // else init normal db with path
    Database? database;

    if (encryptionKey.isNotEmpty) {
      // Initialize the encryption codec with a user password
      var codec = getXXTeaCodec(password: encryptionKey);

      database = await databaseFactoryIo.openDatabase(dbPath, codec: codec);
    }

    // Any code awaiting the Completer's future will now start executing
    _dbOpenCompleter!.complete(database);
  }
}
