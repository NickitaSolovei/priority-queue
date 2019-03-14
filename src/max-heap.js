const Node = require('./node');

class MaxHeap {
	// done
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {

		// создать объект node
		const node = {};
		node.data = data;
		node.priority = priority;

		// вызов метода insertNode
		this.insertNode(node);
		
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		
	}

	// done
	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
		}

		this.parentNodes.push(node);

		/*for ( let i = 0; ; i++) {}
		let nodeLastIndex = this.parentNodes.length - 1;
		let nodeLast = this.parentNodes[nodeLastIndex];
		let nodeParentIndex = Math.floor((this.parentNodes.length - 2) / 2);
		let nodeParent = this.parentNodes[nodeParentIndex];
		if (nodeLast.priority > nodeParent.priority) {
			this.parentNodes[nodeParentIndex] = nodeLast;
			this.parentNodes[nodeLastIndex] = nodeParent;

			
		}*/
		//(this.parentNodes.length - 2) / 2;
		
	}

	// видимо - поднять этот элемент вверх на одно
	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
