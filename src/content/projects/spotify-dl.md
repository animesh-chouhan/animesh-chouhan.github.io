---
title: "Spotify Downloader"
description: "Download your Spotify playlists and songs"
date: 2021-08-25
categories: ["Python"]
tags: ["python", "music"]
---

Github: [spotify-dl](https://github.com/animesh-chouhan/spotify-dl)

A Python script that saves the songs in a Spotify playlist. It plays each track in the desktop app and records the audio to a tagged file. It needs Spotify Premium, the desktop client and developer credentials. Linux only.

```sh
pip3 install requests pyaudio spotipy pydub xdotool
python3 spotify-dl/main.py
```

Set `playlist_id` and `output_dir` in `main.py` first and pick the stream to record in `pavucontrol`.
