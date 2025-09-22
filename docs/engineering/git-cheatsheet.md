# Git

## Setup and Configuration

```bash
# Initialize a new Git repository
git init
# Clone and create a local copy of a remote repository
git clone <url>
# Configure global Git settings
git config --global <setting_name> <value>
# Configure local Git settings for a specific repo
git config --local <setting_name> <value>

# --------------- Advanced ------------------

# Show a summary of your Git configuration settings
git config --list
# Set a custom text editor for Git messages
git config --global core.editor "<editor_command>"
# Create a Git command alias
git config --global alias.<shortcut> <command>
# Enable automatic colorization of Git output
git config --global color.ui auto
# Cache Git credentials for a certain amount of time
git config --global credential.helper 'cache --timeout=<seconds>'
# Configure git to detect specific types of whitespace errors
git config --global core.whitespace <options>
# Automatically prune remote-tracking branches when fetching updates
git config --global fetch.prune true
# Set a custom diff tool for Git
git config --global diff.tool <tool>
# Set a custom merge tool for Git
git config --global merge.tool <tool>
# Compare changes using a custom diff tool
git difftool
# Resolve merge conflicts with a custom merge tool
git mergetool
```

## File Operations
```bash
# Show working tree status
git status
# Add files to the staging area
git add <file(s)>
# Remove files from working tree and staging area
git rm <file(s)>
# Move or rename a file
git mv <old_file> <new_file>
# Commit changes with a message
git commit -m "commit message"
# Show differences between working tree and last commit
git diff

# --------------- Advanced ------------------

# Assume a tracked file is unchanged
git update-index --assume-unchanged <file>
# Restore normal behavior of tracking changes
git update-index --no-assume-unchanged <file>
# Show differences between two commits
git diff <commit_id1>..<commit_id2>
# Unstage a file, but keep in the working directory
git rm --cached <file_name>
```

## Branching and Merging
```bash
# List all branches
git branch
# Create a new branch
git branch <branch_name>
# Switch to a specific branch
git checkout <branch_name>
# Merge a branch into the current branch
git merge <branch_name>
# Delete a specific branch
git branch -d <branch_name>
# List all remote branches
git branch -r

# --------------- Advanced ------------------

# List branches with additional information
git branch -vv
# Create a new branch based on a remote branch
git checkout -b <branch_name> <remote_name>/<remote_branch>
# Cancel merge in case of conflicts
git merge --abort
# Rebase the current branch onto another branch
git rebase <branch_name>
# Cancel an ongoing rebase operation
git rebase --abort
# Interactive rebase for edit, squash, re-order or drop commits
git rebase -i
# Rebase commits in the current branch onto a remote branch interactively
git rebase -i <remote_name>/<remote_branch>
```