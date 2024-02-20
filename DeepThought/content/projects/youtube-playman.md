+++
title="Youtube Playman"
description="Downloads and updates YouTube Playlists"
extra.featured="/images/projects/youtube-playman.png"
date=2020-04-27
path="/projects/youtube-playman"

[taxonomies]
categories = ["YouTube"]
tags = ["web", "youtube", "music"]

+++

<!-- more -->
<p align="center">
   <img src="/images/projects/youtube-playman.png" alt="youtube-playman" style="max-width:80%"/>
</p>

A simple yet powerful script to download and manage local copies of youtube music playlists. It wraps over the youtube-dl downloader and maintains an archive of downloaded songs. It also updates them automatically if a cronjob is configured. [More Info](https://animesh-chouhan.github.io/youtube-playman/)

## Setup

### Cloning the repository:

```sh
#clone the repo
git clone https://github.com/animesh-chouhan/yt-comment-scraper.git
cd youtube-playman
```

### Running the script:

```sh
#run the script directly
chmod +x ./youtube-playman.sh
./youtube-playman.sh

OR

#create a hard link to the local binary folder
#this will add the downloader to the path variable
ln ./youtube-playman.sh ~/.local/bin/youtube-playman

#directly running the script
youtube-playman

```

### Installation:

To install it right away for all UNIX users (Linux, macOS, etc.), type:

```sh
curl -L https://github.com/animesh-chouhan/youtube-playman/releases/latest/download/youtube-playman -o ~/.local/bin/youtube-playman
chmod a+rx ~/.local/bin/youtube-playman
```

If you do not have curl, you can alternatively use a recent wget:

```sh
wget https://github.com/animesh-chouhan/youtube-playman/releases/latest/download/youtube-playman -O ~/.local/bin/youtube-playman
chmod a+rx ~/.local/bin/youtube-playman
```

### Add Jobs To cron:

```sh
#creating a cron job that will update the playlists automatically
crontab -e
```

```sh
#this will open a editor and add this entry to the file
#don't forget the newline after the last entry

PATH="/usr/local/bin:/usr/bin:/bin:/home/<your-username>/.local/bin"
@daily printf "update-all" | youtube-playman

#OR

PATH="/usr/local/bin:/usr/bin:/bin:/home/<your-username>/.local/bin"
@daily printf "update-all" | download > $HOME/Music/cron.log 2>&1;echo `date` >> $HOME/Music/cron.log

```

For more details refer to [ubuntu cron wiki](https://help.ubuntu.com/community/CronHowto).

## Usage example

Click on the play button to see an example download.
<a href="https://asciinema.org/a/bQgrwQfcFLtcuJpKMGEuq0Til?speed=2&preload=1&autoplay=1">
<img src="https://asciinema.org/a/bQgrwQfcFLtcuJpKMGEuq0Til.png" max-width="1000px"/>
</a>

_For more examples and usage, please refer to the [Wiki][wiki]._

## Built With

- [youtube-dl](https://github.com/ytdl-org/youtube-dl) - Command-line program to download videos from YouTube

## Contributing

1. Fork the repo (<https://github.com/animesh-chouhan/youtube-playman/>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->

[license]: https://img.shields.io/github/license/animesh-chouhan/youtube-playman
[wiki]: https://github.com/animesh-chouhan/youtube-playman/wiki

## License

MIT License
copyright (c) 2020 [Animesh Singh Chouhan](https://github.com/animesh-chouhan). Please have a look at the [license](LICENSE) for more details.
