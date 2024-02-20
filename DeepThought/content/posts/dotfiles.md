+++
title="Manage your dotfiles on Github"
extra.featured="/images/posts/dotfiles.png"
date=2021-08-03
path="/posts/dotfiles"

[taxonomies]
categories = ["Dotfiles"]
tags = ["post", "dotfiles", "linux"]
+++

<!-- Add summary here -->

<!-- more -->

<!-- ![alt text](/images/posts/dotfiles.png) -->
<p align="center">
   <img src="/images/posts/dotfiles.png" alt="dotfiles" style="width:80%"/>
</p>

## Why would I want my dotfiles on GitHub?

- Backup, restore, and sync the prefs and settings for your toolbox. Your dotfiles might be the most important files on your machine.

- Learn from the community. Discover new tools for your toolbox and new tricks for the ones you already use.

- Share what you’ve learned with the rest of us.

## Which dotfiles should I really manage on Github?

You can put .profile, .bashrc, .nvimrc, .vimrc and others on Github.

## How do you manage your dotfiles?

Here are the steps:

1. Make a repository named dotfiles on your Github.

2. Clone it in your home directory.

   ```bash
   git clone https://github.com/<user-name>/dotfiles.git
   ```

3. Create hard links of the dotfiles you want to manage. Eg:

   ```bash
   ln ~/.bashrc ~/dotfiles/.bashrc
   ```

4. Commit and push to your repo.

   ```bash
   git add .
   git commit -m "add dotfiles"
   git push
   ```

## Use my dotfiles

{{% alert note %}}
Warning: If you want to give these dotfiles a try, you should first fork this repository, review the code, and remove things you don’t want or need. Don’t blindly use my settings unless you know what that entails. Use at your own risk!
{{% /alert %}}

Link to the repository: [dotfiles](https://github.com/animesh-chouhan/dotfiles)

Here are the steps:

1. Clone and cd in my dotfiles repo in your home directory.

   ```bash
   cd ~
   git clone https://github.com/animesh-chouhan/dotfiles.git
   cd dotfiles
   ```

2. Run install.sh

   ```bash
   chmod a+x install.sh
   ./install.sh
   ```

This will create hard links of my dotfiles to your home directory.

## Sources

1. [dotfiles](https://dotfiles.github.io/tutorials/)
2. [smalleycreative's blog](http://blog.smalleycreative.com/tutorials/using-git-and-github-to-manage-your-dotfiles/)
3. [satorusasozaki's blog](https://medium.com/@satorusasozaki/manage-your-dotfiles-on-github-8f8a2a57c85)
4. [mathiasbynens dotfiles](https://github.com/mathiasbynens/dotfiles)

### Did you find this page helpful? Consider sharing it 🙌
