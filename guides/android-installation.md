# Android Installation
This guide assumes you have already followed the guide on how to install [ForgeScript on Android](https://docs.botforge.org/p/ForgeDB/#docs-22-host-your-bot-on-android) and are using ACode & Termux. <br>

1. First in your termux `Home` directory run:
```bash
mkdir .gyp
```

2. Then in Acode open up the termux `Home` directory and make a file in the new `.gyp` folder called `include.gypi`

3. In this file add this code:
```gypi
{'variables':{'android_ndk_path': ''}}
```

4. Save and then go back to termux.

5. Then in your project run
```bash
npm i @tryforge/forge.db
```

> [!IMPORTANT]
> Its not recommended to store data on your android device and if you do not have a computer you should use a VPS instead.
