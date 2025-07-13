# chrome-context-vbb-image
Adds a context menu to Chrome which allows you to generate VBB code for a linked image, to paste into your own posts.

About:
This is a custom extension for Chrome that is used to create VBB code for an image. I wrote this because I get sent press releases via email that get put onto a website running VBB and it saves hand-editing the VBB code to include any images. This is made more complicated as gmail uses a script to parse image urls (for security) so this needs to be stripped to get the true url of the image. The extension gets the url of the image, strips any gmail script from it, adds the necessary VBB code for both [IMG] and a [URL] if the image is also linked, and then copies this to the clipboard. You can then simply paste the code into your VBB post.

Installation:
1. Download the files to a suitable directory on your machine
2. Goto Extensions -> Manage Extensions in Chrome
3. Click on Load Unpacked button
4. Select the directory where you downloaded the files in (1)
5. Chrome should install the extension without issues

Useage:
When you have an image that you want to create VBB code for, simply right-click and select the VBBulletin Image Code Creator context menu.
This copies the parsed VBB code into the clipboard, so you can paste it into your VBB post.


