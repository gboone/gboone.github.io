---
title: "GitHub for Mac: A Usability Review"
tags:
- git
- os x
- usability
- reviews
loc: dc
---
**Update:** This post is out of date. The new GitHub Desktop App has major improvements to many of the usability problems addressed here. The GitHub For Mac app described below is no longer distributed.

Since first learning how to use Git a couple years ago I've been pretty convinced that using the command line is the _only_ way to go. Partly it's simplifying my workflow: On a given day I have Terminal open for running tests, working with Jekyll, and quick editing in `vim`; a browser open to work with GitHub, inspect my work, and debug things; plus a text editor for All the Things. A Git client is one more application running that I have to integrate into a three screen, multiple tab workflow.

I tried GitHub for Mac a few years ago when I was first learning Git. I thought I'd be able to focus on the code without worrying about the version control part of my job. I don't remember why I went command line only, but I think it had something to do with my first pull request at CFPB: one that had _every file in the repo_ committed as "changed" because at some point I had changed permissions on the whole repo but forgot to tell Git to ignore that crap. OOPS!

Being a full-time developer working with primarily with other developers for a year-and-a-half is a good way to forget what you didn't know before you started. So I dusted off the ol' GitHub for Mac app, and decided to evaluate it again. I work with a few people who are where I was two years ago and I am trying to make a conscious effort to check assumptions about what is "obvious" or "easier."

## GitHub for Mac

The flagship desktop app made by GitHub for folks who use the company's web service, this app has the huge advantage of being free and integrated with your GitHub account. One of the first things you have to do with GH for Mac is sign in to your GitHub account and it automatically creates and pairs an SSH key with your Mac (or uses an existing one). This Git Client changes around some terminology that might be familiar to Git power users. The biggest change is the "Sync" feature that both pulls down local changes and pushes your changes.

![The GitHub for Mac interface with the Sync button highlighted](/assets/images/git-clients/sync.png)

The main view on the application is essentially a visual representation of `git status`. Each changed file fills in as they are modified with a checkbox. Checking the box (done by default) presumably runs `git add` on the file, and at the botton of the center column is the "Commit and Sync" button. When pressed, this button makes a commit locally and immediately pushes the branch to the remote whence it was cloned. If you don't enter a commit message, the button triggers an alert asking you to include one.

To the right of this center column is a live `diff`. Your local changes against what was already there.

![A git diff view of GitHub for Mac](/assets/images/git-clients/diff.png)

You can unstage a file (`git reset HEAD <file>`) by simply unchecking the box. This will keep it from being committed when you "Commit and Sync."

Once you commit there's an undo button to roll back your changes.

![An undo button! We've all wanted one of those at one point or another.](/assets/images/git-clients/undo.png)

You can even make a pull request right from the app. And it will even tell you if there aren't any commits to merge.

Immediately there are a few things to love about this interface. Issuing pull requests without going to GitHub.com is a dream. It's like click, clack-clack-clack, click and :boom: pull request.

The visual diff is also handy and maybe a new feature from when I first used the app a couple years ago. It certainly makes you wonder what has changed if the diff looks empty.

GitHub for Mac, like any GUI, is a graphical overlay applied on top of an otherwise complex system. To that end, [Nielsen's Heuristics](http://en.wikipedia.org/wiki/Heuristic_evaluation#Nielsen.27s_heuristics) can be a good way of evaluating the design. Those heuristics are:

1. Visibility of system status
1. Match between system and the real world
1. User control and freedom
1. Consistency and standards
1. Error prevention
1. Recognition rather than recall
1. Flexibility and efficiency of use
1. Aesthetic and minimalist design
1. Help users recognize, diagnose, and recover from errors
1. Help and documentation

Git is already pretty terrible at a few of these, particularly numbers 2, 4, 5, 6, and 9. But it nails a few, including 1, 3, 7, and 10. The question at hand, though, is how does GitHub for Mac do?

### Visibility of System Status

GitHub for Mac comes out pretty well here, though it could do better. Many complicated workflows are compressed into a single button press and when this works well it _really_ works. The main view, for example shows `git status` and `git diff` live. It also lets you toggle to other views like "History" and "Branches." That makes the non-exclusive list of Git commands you can accomplish within one click of opening the app:

1. `git add`
1. `git commit`
1. `git push`
1. `git pull`
1. `git branch`
1. `git status`
1. `git reset HEAD <file>`
1. `git log`
1. `git branch`
1. `git checkout <branch>`
1. `git checkout -b <new-branch>`

These commands are packaged up into buttons like "commit and sync" that encompasses a multi-step workflow. At its simplest it looks like this:

```
git pull origin master
git commit
git push origin master
```

Masking those parts of the system comes at the expense of the user knowing what all is happening when that button is clicked. This was most painfully obvious when pre-commit hooks were introduced to my workflow.

Hooks, in Git, are small programs that run at different stages in the workflow. If you're curious I recommend reading up on them in [the Git Book](http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). One common place for a commit hook to run is "pre-commit" to stop developers from committing things like passwords, or easily detectable security problems. I wrote one to optimize images in a specific folder. GitHub for Mac still runs the hooks at the appropriate times, it just does so invisibly. Instead of showing the action, it looks like the application is hanging.

By abstracting `git add` actions into checkboxes, the app conceals a lot of the work that Git does to track and record changes. But maybe that's a good thing. It took me a while before I realized you had to run `git add` again if I changed a file after I did it the first time but before I committed. As a beginner, I thought I should only have to do it once. With GitHub for Mac that expectation is true. The box is already checked, and the app re-adds the file to the commit for you, this leads well into the second heuristic.

### Match Between System and the Real World

Git has a lot of bad idioms. The command `git commit` feels a lot like the "save" command in any other application but what most beginners don't learn is that `git add` is closer to save. Running `commit` is more like finishing a draft while `git add` is like every `command-s` you issue while you're writing.

It is also quite difficult to explain the three "states" a file can be in when working in a git project to those who have no experience with it. What do the terms 'tracked' and 'untracked' mean to somebody who has only worked with Microsoft Word? What if something is Staged for Commit? How is being "tracked" different from being "staged?" GitHub for Mac answers these questions by saying it doesn't _really_ matter and then mapping the _concepts_ of Git onto the metaphors we already have for working with computers. Persistently re-adding the file for you? That's autosave. "Commit and sync," that's finishing a draft and backing it up to Dropbox.

There are a few times this falls down. For example, what does this mean?

![WTF does the partially checked box mean? My autosaves!](/assets/images/git-clients/wtf-is-this.png)

Command line Git would have an answer with `git status`. It's a little harder to tell at a glance what is happening in GitHub for Mac.

In addition, you're rarely working on a Git project and not using another application. It would be great if GitHub for Mac were better integrated with a text editor or the file system. The app shows you which files were changed, but it's not clear from just looking at the app what you're supposed to do with that information other than "sync and commit." It's hard to even figure out where the repo is, what other files are in it, and how to go about making _more_ changes without the assist of another app. It turns out that right (or control, or two-finger, or [_force_](http://37.media.tumblr.com/d34c23099b5e49cc03108e5327e76749/tumblr_n52gy5DUbR1rvnnvyo4_250.gif)) clicking on the name of the repo will give you options including "Open in Finder" and "Open in Atom." It's unclear what happens if you don't have [Atom](https://atom.io) installed.

I'm not sure how many people would intuitively right click on the name of the repo in order to edit one of the files and would expect, instead, someone unfamiliar with GitHub would probably ask "what do I do now?" when they see the empty "Changes" tab. Since GitHub makes Atom, I suppose we can hope that future versions of GitHub for Mac will integrate some basic file editing features from Atom. In the meantime, I expect people unfamiliar with GitHub will remain confused about what they're supposed to do with this app other than "Commit and Sync." More cues about how to find and edit files in the repo would help.

### User Control and Freedom

Command line Git has this down and GitHub for Mac takes a lot of freedoms away by abstracting them into buttons (as discussed above). There are so many different workflows available to Git users, and for each one there is a camp of people who firmly, militantly believe they are doing it the right way. Rebasing vs. merging, forks vs. branches, when to branch vs. pushing to `master`, how frequently you should commit: these are all examples of different basic workflows that power users can expend a lot of hot air arguing about. (Guilty.)

GitHub for Mac resolves a lot of those issues by setting some smart defaults and removing some options. You can't squash commits in the app (at least not easily). You can't `fetch` from your remote without also merging in the latest changes. You can't rebase, instead of merging, one branch into another. You can't commit without also pushing your branch.

For those of us weaned on CLI Git this is an inexcusable restriction on our freedom and control over our projects. For others it is the enforcement of standards in an otherwise anarchical world.

### Consistency and Standards

GitHub for Mac nails it. Where there might be multiple ways to accomplish a task from the command line, there is either one way to do it, or it is impossible from the app. This, I imagine, is a huge win for people new to Git. Unless, of course, the standards the app tries to enforce are different from the ones your team is using. There are a lot of ways to encourage patterns on top of Git, (aliases, hooks, good training) few of them are available in GitHub for Mac.

Some of the standards it enforces are _huge improvements_ over conventional wisdom given to newcomers. Committing in the app, for example, requires and nudges users toward more informative commit messages. Let's be honest and admit that someone who is new to Git and the command line _probably_ isn't very familiar with command line editors and crazy looking commands. To solve that, or maybe to simplify the process, many Git tutorials recommend the shorthand `git commit -m 'message'`. This would be fine if that shorthand didn't often lead to unhelpful messages like "fixed stuff". (Again, guilty.)

A message like that is fine if the "stuff" is one change to one line of code but GitHub is collaborative, and commit messages should help your collaborators understand what changes you made. GitHub for Mac helps newcomers get past `-m` by providing "Summary" and "description" sections in the commit view. It'd be interesting to see data around whether GitHub app users provide [more useful commit messages because of this nudge.](https://gist.github.com/matthewhudson/1475276)

![GitHub for Mac will not let you commit without a commit message and encourages a summary and description in each message](/assets/images/git-clients/commit-message.png)

### Flexibility and Efficiency of Use

This, again, is a mixed bag for the app. CLI Git is full of flexibility, as mentioned in [the user control and freedom section](#user-control-and-freedom), there are many different ways of accomplishing the same task in Git. To get the latest changes on GitHub.com, for example, your workflow might be as simple as:

```
git pull
```

Unless you're working in a branch then it might be:

```
git checkout master
git pull
git checkout <your-branch>
git merge master
```

And if you're on a fork it might be

```
git checkout master
git pull origin master
git push fork master
git checkout <your-branch>
git merge master
git push fork <your-branch> # (arguably optional)
```

And if you're into rebasing instead of merging it's a whole other can of worms.

Getting that kind of flexibility is maybe possible in GitHub for Mac, but obviated by default behaviors.

Finally, it's worth mentioning here the ease of integration with GitHub's web service. Issuing pull requests with the click of a button is a dream.

![Issuing a pull request without going to GitHub.com](/assets/images/git-clients/pull-request.png)

But the efficiency of issuing that pull request is halted by not being able to comment on or further interact with pull requests and issues without going to GitHub.com in your browser.

### Aesthetic and minimalist design

This criterion has been touched on by others above, but the look and simplicity of the app cannot be ignored. I mentioned in the [visibility of system status](#visibility-of-system-status) section that there are at least 11 git commands executable within one click of launching the app. In addition, the app abstracts away many of the more complicated commands into their most useful presentation. The "History" button takes you to a view that represents `git log --date=relative` with a `git diff` of that commit next in the opposite frame. You can even expand each commit and jump through the `diff` file by file.

The branch view defaults to `git branch -v` alongside a "Published" button, which, when disabled means you have pushed all possible changes.

All of this happens in relatively few clicks compared to how many commands and defaults you would need to have this kind of view in even the most sophisticated of command line set ups. These design choices give you the most valuable information about each commit formatted and displayed accessibly.

A couple things are confusing in this setup.

Moving the mouse to the left side of a branch turns the cursor into a hand and you can click and drag the branch. What exactly happens when you drag one on top of another is not intuitive. Are you switching branches? Merging one into the other? The answer is unclear without either giving it a shot and hoping you don't make a mistake (see below) or looking it up.

There's also a star button on the right side of a branch's container. What this does is completely unclear. Clicking a star of an inactive branch appears to `checkout` or, "switch to," in the language of the app, that branch. In fact, clicking on _anything_ on an inactive branch appears to activate it, not just the "Switch to this Branch" item in the list that drops down from the "arrow down" button.

Finally, you can "unpublish" a branch. As an experienced `git` user this doesn't mean much to me. Does it mean somehow reverting the remote branch back to the last previous push? Or, more likely, does it mean completely deleting the branch from the remote? It turns out it's the latter, and any collaborators working on that branch will need to find another way of getting any updates since their last "sync." To be fair, the app warns you about this when you attempt to unpublish.

![The unpublish button warns you that your branch will be deleted from the remote repository.](/assets/images/git-clients/unpublish.png)

### Help users recognize, diagnose, and recover from errors

The "unpublish" feature is a good example of how GitHub for Mac fails to help users prevent and troubleshoot errors. If you're a collaborator on a project and need to "revert" some changes you pushed to a branch, you might think "unpublishing" is your tool: and you would be wrong and the app gives you no indication of how to accomplish this. (To be fair, [Git makes this intentionally difficult.](http://git-scm.com/book/en/v2/Git-Basics-Undoing-Things))

Additionally, the warning message is inaccurate. An "unpublished" branch can be "republished" by pushing it back again. Maybe GitHub for Mac doesn't let you do this, but in theory it _is_ possible, just not by hitting Undo.

It is good that the warning is there, though. If multiple individuals are working off the same branch, revoking that branch is potentially confusing if not dangerous. And if you are new to `Git`, you might not know that "the remote repository" means GitHub.com and that by "unpublishing" you've just prevented your collaborators from accessing your work.

On another topic of branching and merging, GitHub for Mac might have made switching branches _too_ easy. An accidental click on the Branches view might inadvertently cause you to commit to the wrong branch before switching back. Depending on the project, this could result in wild instability. At 18f, for example, accidental commits to `staging` will result in republication of our staging site – a complete obfuscation of our publishing process and contribution guidelines.

This is not to say that accidental commits to a branch _can't_ happen in command line git, but the GitHub for Mac app doesn't make it easy to see errors as they occur and understand how to recover from them. The command line forces you to be more explicit by requiring you tell it exactly what branch you want, and what you want to do with it.

As far as diagnosing and recovering from errors, the app doesn't help much with that either. In the above example, you would at no point get any indication you were making a mistake, how you got there in the first place, or what to do to fix it. If you committed and synced a load of changes to `branch-a` and another collaborator asked you to submit them to `branch-b` instead, you might know what that means, but you might not know how to solve it other than checking out a new branch and copying and pasting your final changes over manually. If you're working with several files this could take a long time.

### Help and documentation

In that last example, the easiest way to get out of that jam would be to merge or, better, rebase your `branch-a` onto `branch-b` like `git rebase branch-a branch-b` and then pushing up `branch-b`. If you only need some of the commits from `branch-a` you can do an interactive merge or, what I do, use `git cherry-pick` to extract the specific commits or range of commits from `branch-a` that are needed in `branch-b`.

Git is an incredibly well documented piece of software through guides like [ProGit](http://git-scm.com/book/en/v2/), tutorials from GitHub and Atlassian, and, shameless plug, [18F's tutorial](https://18f.gsa.gov/2015/03/03/how-to-use-github-and-the-terminal-a-guide/). There are separate `man` pages for Git and each subcommand (from the CLI, run `man git-commit`). And there are millions of Git users around the world answering questions on StackExchange ready for you to find by [Googling your problem](https://www.google.com/search?q=how+to+move+some+commits+to+another+branch&ie=utf-8&oe=utf-8). If you're at a software company, there's a good chance someone on your team can help, too.

Little of that will be helpful on GitHub for Mac. The top search result for [our merging problem above](http://stackoverflow.com/questions/2369426/how-to-move-certain-commits-to-another-branch-in-git) is to `rebase --onto` and the other top-voted answers recommend `cherry-picking`. If you're using GitHub for Mac without knowing how to `Git` from the command line, what are you supposed to do?

## Conclusion

GitHub for Mac is definitely a well-designed step in the right direction. For those new to Git or only working with repositories occasionally, it may be very useful and certainly an easier learning curve than learning how to use the command line and all of Git's complexities.

It has a lot of room to grow, though. An app like GitHub for Mac could be a stand in for a user interface for static sites if it had  built-in text editor and visualization of the repository's tree. Or it could compete with a program like [Tower](http://www.git-tower.com/) if it offered more flexibility of use and workflow that a power Git user would want and a more exhaustive GitHub integration. At the moment, it feels like the app is struggling to figure out what it should be.

I work with a few people who had never used Git, the command line, or a static site generator before. Right now we're [trying to start people off at the command line](https://18f.gsa.gov/2015/03/03/how-to-use-github-and-the-terminal-a-guide/) and offer help as needed. We do this, in part, to standardize the way we work, but also because we think eventually all of us will encounter some kind of [error GitHub for Mac won't be able to solve](#help-users-recognize-diagnose-and-recover-from-errors) and a more experienced Git user will have to intervene anyway.

Our hypothesis is that learning the command line from the start will help people feel more comfortable making mistakes and recovering from them. That means introducing people to a pretty steep learning curve. A lot of people believe the promise of a GUI is that it will reduce the learning curve. In this case, I'm not sure that's true, at least not yet.

[Comment on this post at GitHub.com](https://github.com/gboone/gboone.github.io/pull/14)
