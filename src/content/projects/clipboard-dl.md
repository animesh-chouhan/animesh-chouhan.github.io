---
title: "Clipboard Downloader"
description: "Download files just by copying the link"
date: 2024-01-09
categories: ["Python"]
tags: ["python", "automation"]
---

Github: [clipboard-dl](https://github.com/animesh-chouhan/clipboard-dl)

Leave it running and copy links. Every link that lands on the clipboard gets downloaded to the current folder. Handy for grabbing a bunch of images or videos while browsing.

```sh
pip3 install pyperclip wget
python3 clipboard-dl.py
```

Set `ignore_errors` in the script to log bad links instead of stopping.
