class Commit {
	constructor(id, parent, message) {
		this.id = id;
		this.parent = parent;
		this.message = message;
	}
}

class Branch {
	constructor(name, commit) {
		this.name = name;
		this.commit = commit;
	}
}

class Git {
	constructor(name) {
		this.id = -1;
		this.name = name; //repo name
		this.commitLogs = [];
		const parent = new Branch("Master", null);
		this.HEAD = parent;
		this.branchs = [parent];
	}
	commit(message) {
		const commit = new Commit(++this.id, this.HEAD, message);
		this.HEAD.commit = commit;
		this.commitLogs.push(commit);
		console.log("changes were commited!");
	}

	log() {
		console.log("Log of all your changes!");
		this.commitLogs.forEach((commit) => {
			if (this.HEAD.name === commit.parent.name) {
				console.log(
					`id:${commit.id} Branch: ${commit.parent.name} Commit: ${commit.message}`
				);
			}
		});
	}

	checkout(branchName) {
		let foundBranch = false;
		this.branchs.find((branch) => {
			if (branch.name === branchName) {
				this.HEAD = branch;
				foundBranch = true;
				console.log(`Switched to existing branch: ${branch.name}`);
			}
			return false;
		});
		if (!foundBranch) {
			const newBranch = new Branch(branchName, null);
			this.branchs.push(newBranch);
			this.HEAD = newBranch;
			console.log(`create branch: ${branchName}`);
		}
		return this;
	}
	merge(branchName) {
		if (branchName === this.HEAD.name) {
			console.log(`Cannot merge the same branch: ${branchName}`);
			return this;
		}
		console.log("merging commence!");
		this.commitLogs.forEach((commit) => {
			if (commit.parent.name === branchName) {
				this.commit(commit.message);
				console.log(`merging changes commit: ${commit.message}`);
			}
		});
		return this;
	}
}

const git = new Git("my-repo"); // git init
git.commit("first commit");
git.commit("add express npm");
git.checkout("auth");
git.commit("add auth middleware");
git.commit("create test for auth");
git.merge("auth");
git.checkout("Master");
git.merge("auth");
console.log(git);
