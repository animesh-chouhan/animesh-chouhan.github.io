#!/bin/sh

# If a command fails then the deploy stops
set -e

printf "\033[0;32mBuilding website...\033[0m\n"
cd DeepThought
zola build
yes | cp -rf ./public/* ../

printf "\033[0;32mDeploying updates to GitHub website...\033[0m\n"

cd ../

# Add changes to git
git add .

# Commit changes
msg="rebuilding site $(date)"
if [ -n "$*" ]; then
	msg="$*"
fi
git commit -m "$msg"

# Push source and build repos
git push origin master

printf "\033[0;32mDone\033[0m\n"
printf "https://github.com/animesh-chouhan/animesh-chouhan.github.io/actions\n"