# How to Contribute

We appreciate your interest to contribute to this project! Please read and follow the steps below to see how you could contribute to this project.

### 1. Create an Issue

The first thing to do is to create a new issue. Feel free to create new issues from [here](https://github.com/jcam1/sdks/issues/new/choose) to propose/request new features or report bugs.

### 2. Fork & Clone Repo

Next, fork this repository to your GitHub account, and clone it to your local environment.

> [!IMPORTANT]
> Clone `develop` branch for development, while our default branch is `main`.

```sh
$ git clone -b develop https://github.com/{YOUR_USER_NAME}/sdks.git
```

### 3. Checkout to a New Branch

You then need to checkout to a new branch (name whatever you would like) from the cloned `develop` branch.

```sh
$ git checkout -b ${YOUR_BRANCH_NAME}
```

### 4. Write Code

Now, write code to implement the proposed features and/or to fix bugs. Please refer to [`Development`](#-development) section for more details.

### 5. Open a Pull Request

Finally, open a new PR from your branch to `develop` branch on our (original) repo, and describe what you'll have done.

## 🔨 Development

### Yarn Workspaces

This repo uses [Yarn Workspaces](https://yarnpkg.com/features/workspaces) primarily as a monorepo management tool. Please refer to the inserted link for details.

> [!NOTE]
> Please use Node `v20.12.0` for this repo.

To install dependencies for all the workspaces, run the following.

```sh
# cd into this repo
$ cd sdks
# Install dependencies
$ yarn
```

### Yarn Scripts

To run yarn scripts defined in workspaces, run the following.

```sh
$ yarn workspace ${workspace_name} run ${command_name}
```

### Dependencies

To add dependencies, run one of the following.

```sh
# Add dependencies to the specified workspace
$ yarn workspace ${workspace_name} add ${dependencies}

# Add dev dependencies to the specified workspace
$ yarn workspace ${workspace_name} add -D ${dependencies}

# Add dependencies to the workspaces root
$ yarn add -W ${dependencies}

# Add dev dependencies to the workspaces root
$ yarn add -W -D ${dependencies}
```

To remove dependencies, run one of the following.

```sh
# Remove dependencies from the specified workspace
$ yarn workspace ${workspace_name} remove ${dependencies}

# Remove dependencies from the workspaces root
$ yarn remove -W ${dependencies}
```

### Documentation

To generate Markdown documentation from source code, run the following.

```sh
$ yarn run docs
```
