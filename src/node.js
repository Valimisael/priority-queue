class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left != null && this.right != null) return;
		if (this.left != null) {
			this.right = node;
		} else {
			this.left = node;
		}
		node.parent=this;
		
	}

	removeChild(node) {
		if (this.left != node && this.right != node) throw "Passed node is not a child of this node!";
		if (this.left == node) {
			this.left =null;
		} else {
			this.right=null;
		}
		node.parent=null;
	}

	remove() {
		if (this.parent == null) return;
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent == null) return;
		let PP = this.parent.parent;
		let PR = this.parent.right;
		let PL = this.parent.left;

		let P = this.parent;
		let L = this.left;
		let R = this.right;
		
		if (this.parent.parent != null){
			if (this.parent.parent.left != null && this.parent.parent.left == P){
				this.parent.parent.left = this;
			}
			if (this.parent.parent.right != null && this.parent.parent.right == P){
				this.parent.parent.right = this;
			}
		}
		if (this.left != null){
			this.left.parent = P;
		}

		if (this.right != null){
			this.right.parent = P;
		}
		
		if (PL != null && PL == this){
			if (PR != null){
				PR.parent = this;
				this.right = PR;
				this.left = P;
			} else {
				this.right = null;
			}
		}
		if (PR != null && PR == this){
			if (PL != null){
				PL.parent=this;
				this.left=PL;
				this.right=P;
			} else {
				this.left = null;
			}
		}
		this.parent.parent = this;
		this.parent.right = R;
		this.parent.left = L;
		this.parent = PP;
	}
}

module.exports = Node;