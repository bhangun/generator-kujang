
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../utils/constants.dart';
import 'dropdown_widget.dart';

class ProfileCard extends ConsumerWidget {
   const ProfileCard({
    Key? key, required this.accountName, this.onTap, this.imagePath='assets/images/profile.png'
  }) : super(key: key);
  final String accountName;
  final String imagePath;
  final void Function()? onTap;

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    List<DropdownItem> profileMenu = [
         DropdownItem(
            title: accountName,
            icon: "list",
            onTap: ()=>print('list')         
        ),
         DropdownItem(
            title: "Sign out",
            icon: "home",
            onTap: onTap     
        )
        ];
    return Container(
      margin: const EdgeInsets.only(left: defaultPadding),
      padding: const EdgeInsets.symmetric(
        horizontal: defaultPadding,
        vertical: defaultPadding / 2,
      ),
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.all(Radius.circular(10)),
        border: Border.all(color: Colors.white10),
      ),
      child:
       Dropdown(items: profileMenu,)
      /*  Row(
        children: [
          Image.asset(imagePath,
            height: 38,
          ),
          if (!DeviceScreen.isPhone(context))
             Padding(
              padding: const EdgeInsets.symmetric(horizontal: defaultPadding / 2),
              child: Text(accountName),
            ),
           // IconButton(onPressed: (){}, icon:  const Icon(Icons.keyboard_arrow_down))
          
        ], 
         /* Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextButton(
            style: TextButton.styleFrom(foregroundColor: Colors.white),
            onPressed: () => _handleSignOut(),
            child: const Text('Sign Out'),
          ),
        ) */
        
        */
      
    );
  }
}